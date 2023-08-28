import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@env/environment";
import { Youtube } from "@core/interface/youtube";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  nextPageToken = "";

  constructor(private http: HttpClient) {}

  getVideos() {
    return this.http.get<Youtube>(`${environment.notion_api}/get-videos`).pipe(
      map((response) => {
        this.nextPageToken = response.nextPageToken;
        return response.items;
      }),
      map((items) => items.map((video) => video.snippet)),
    );
  }
}
