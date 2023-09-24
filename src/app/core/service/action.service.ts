import { Injectable } from "@angular/core";
import {
  actionData,
  iAction,
  iSection,
  sectionData,
  TYPE_ACTION,
} from "@core/interface/action";
import { Router } from "@angular/router";
import { ThemeService } from "@core/service/theme.service";
import { Themes } from "@core/interface/theme";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  actionData: iAction[] = actionData;
  sectionData: iSection[] = sectionData;

  constructor(
    private router: Router,
    private themeService: ThemeService,
  ) {
    this.setActionData();
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
            this.themeService.getTheme() === Themes.DEFAULT
              ? this.themeService.setTheme(Themes.WHITE)
              : this.themeService.setTheme(Themes.DEFAULT);
          };
      });
    });
  }
}
