import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "@env/environment";
import { iStack } from "@core/interface/stack";
import { iCheatsheet } from "@core/interface/cheatsheet";
import { iProject } from "@core/interface/project";
import { iExperience } from "@core/interface/experience";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";

@Injectable({
  providedIn: "root",
})
export class NotionService {
  private readonly url = environment.notion_api || "";
  cheatsheet: iCheatsheet[] = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    this.cheatsheet = this.storageService.getItem(Storage.CHEATSHEET) || [];
  }

  async getStacks(): Promise<iStack[]> {
    return await this.http.get<iStack[]>(`${this.url}/stack`).toPromise();
  }

  async getProject(): Promise<iProject[]> {
    return await this.http.get<iProject[]>(`${this.url}/project`).toPromise();
  }

  async getExperience(): Promise<iExperience[]> {
    return await this.http
      .get<iExperience[]>(`${this.url}/experience`)
      .toPromise();
  }

  async getCheatsheet(): Promise<iCheatsheet[]> {
    return await this.http
      .get<iCheatsheet[]>(`${this.url}/cheatsheet`)
      .toPromise();
  }

  async getCheatsheetById(id: string): Promise<iCheatsheet> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      id: id,
    });
    return await this.http
      .get<iCheatsheet>(
        `${this.url}/cheatsheet-by-id?timestamp=${new Date().getTime()}`,
        {
          headers: headers,
        },
      )
      .toPromise();
  }
}
