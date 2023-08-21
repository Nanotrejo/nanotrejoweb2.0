import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "@env/environment";
import { iStack } from "@core/interface/stack";

@Injectable({
  providedIn: "root",
})
export class NotionService {
  private readonly url = "http://" + environment.notion_api || "";
  constructor(private http: HttpClient) {}

  async getStacks(): Promise<iStack[]> {
    return await this.http.get<iStack[]>(`${this.url}/stack`).toPromise();
  }
  async getProject(): Promise<any> {
    return await this.http.get(`${this.url}/project`).toPromise();
  }
  async getExperience(): Promise<any> {
    return await this.http.get(`${this.url}/experience`).toPromise();
  }
}
