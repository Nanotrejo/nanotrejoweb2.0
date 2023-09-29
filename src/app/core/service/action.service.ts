import { Injectable } from "@angular/core";
import {
  iAction,
  iSection,
  sectionData,
  TYPE_ACTION,
} from "@core/interface/action";
import { Router } from "@angular/router";
import { ThemeService } from "@core/service/theme.service";
import { StorageService } from "@core/service/storage.service";
import { NotionService } from "@core/service/notion.service";
import { Storage } from "@core/interface/storage";
import { iCheatsheet } from "@core/interface/cheatsheet";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  blogData: iAction[] = [];
  sectionData: iSection[] = sectionData;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private storageService: StorageService,
    private notionService: NotionService,
  ) {
    this.setActionData();
    this.setBlogData();
  }

  setActionData(): void {
    this.sectionData = JSON.parse(JSON.stringify(sectionData));
    this.sectionData.forEach((section: iSection) => {
      section.action.forEach((action: iAction) => {
        if (action.typeAction === TYPE_ACTION.URL)
          action.perform = () => {
            if (action.url?.includes("http")) window.open(action.url, "_blank");
            else
              this.router.navigate([action.url], { fragment: action.fragment });
          };
        if (action.keywords.includes("theme"))
          action.perform = () => {
            this.themeService.changeTheme();
          };
      });
    });
  }

  async setBlogData(): Promise<void> {
    this.blogData = [];
    let cheatsheetData: Array<iCheatsheet> =
      this.storageService.getItem(Storage.CHEATSHEET) || [];
    if (cheatsheetData.length === 0)
      cheatsheetData = await this.notionService.getCheatsheet();
    cheatsheetData?.forEach((cheatsheet: iCheatsheet, index: number) => {
      this.blogData.push({
        id: cheatsheet.id,
        name: cheatsheet.title,
        keywords: cheatsheet.title.split(" "),
        key: "",
        perform: () => {
          this.router.navigate(["../trucos", cheatsheet.id]);
        },
        icon: "article",
        typeAction: TYPE_ACTION.BLOG,
      });
    });
  }
}
