import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "@core/service/youtube.service";
import { Video } from "@core/interface/youtube";
import {
  fadeInFast,
  translateLeftIn,
  translateRightIn,
} from "@assets/css/animation";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-music",
    animations: [fadeInFast, translateRightIn, translateLeftIn],
    templateUrl: "./music.component.html",
    styleUrls: ["./music.component.css"],
    standalone: false
})
export class MusicComponent implements OnInit {
  videos: Video[] = [];
  videoSelected!: Video;
  loading = false;
  urlSelected: SafeResourceUrl = "";
  YOUTUBE_URL = "https://www.youtube.com/embed/";
  autoplay: boolean = true;

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer,
    private storageService: StorageService,
    private activatedRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.videos = this.storageService.getItem(Storage.VIDEOS) || [];
    this.activatedRouter.params.subscribe((params) => {
      const id = params.id;
      if (!id) return this.getVideos();
      try {
        this.videoSelected =
          this.videos.find((video: Video) => video.resourceId.videoId === id) ||
          ({} as Video);
        this.selectVideo(this.videoSelected);
      } catch (e) {
        this.getVideos();
      }
      this.storageService.setItem(Storage.VIDEOS, this.videos);
      this.storageService.setItem(Storage.VIDEO_SELECTED, this.videoSelected);
      this.storageService.setItem(Storage.URL_SELECTED, this.urlSelected);
      this.loading = true;
    });
  }

  getVideos() {
    this.youtubeService.getVideos().subscribe((res: Video[]) => {
      this.videos = [];
      this.videos.push(...res);
      this.videoSelected = this.videos[0];
      this.urlSelected = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.YOUTUBE_URL +
          this.videoSelected?.resourceId?.videoId +
          "?autoplay=" +
          (this.autoplay ? "1" : "0"),
      );
      this.storageService.setItem(Storage.VIDEOS, this.videos);
      this.storageService.setItem(Storage.VIDEO_SELECTED, this.videoSelected);
      this.storageService.setItem(Storage.URL_SELECTED, this.urlSelected);
      this.loading = true;
    });
  }

  selectVideo(video: Video) {
    this.videoSelected = video;
    this.urlSelected = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.YOUTUBE_URL +
        this.videoSelected?.resourceId?.videoId +
        "?autoplay=" +
        (this.autoplay ? "1" : "0"),
    );
    window.scrollTo(0, 0);
  }
}
