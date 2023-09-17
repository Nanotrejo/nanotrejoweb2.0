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

@Component({
  selector: "app-music",
  animations: [fadeInFast, translateRightIn, translateLeftIn],
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.css"],
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
  ) {}

  ngOnInit(): void {
    this.videos = this.storageService.getItem(Storage.VIDEOS) || [];
    this.videoSelected =
      this.storageService.getItem(Storage.VIDEO_SELECTED) || ({} as Video);
    this.urlSelected = this.storageService.getItem(Storage.URL_SELECTED) || "";
    this.getVideos();
  }

  getVideos() {
    this.youtubeService.getVideos().subscribe((res) => {
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
