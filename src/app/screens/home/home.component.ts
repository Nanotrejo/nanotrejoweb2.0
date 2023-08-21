import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iStack } from "@core/interface/stack";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { fadeInFast } from "@assets/css/animation";
import { Themes } from "@core/interface/theme";
import { ThemeService } from "@core/service/theme.service";

@Component({
  selector: "app-home",
  animations: [fadeInFast],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  stackData: iStack[] = [];
  timeExperience: number = new Date().getFullYear() - 2021;
  yearPresent: number = new Date().getFullYear();
  isThemeDefault: boolean = false;
  observableTheme: any;

  constructor(
    private notionService: NotionService,
    private storageService: StorageService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.stackData = this.storageService.getItem(Storage.STACK);
    this.checkTheme();
    this.getStackData();
    this.getObservableTheme();
  }

  ngOnDestroy(): void {
    this.observableTheme?.unsubscribe();
  }

  async getStackData() {
    this.stackData = await this.notionService.getStacks();
    this.stackData.sort((a: iStack, b: iStack) => a.name.localeCompare(b.name));
    this.storageService.setItem(Storage.STACK, this.stackData);
  }

  checkTheme() {
    this.isThemeDefault = this.themeService.getTheme() === Themes.DEFAULT;
  }

  getObservableTheme() {
    this.observableTheme?.unsubscribe();
    this.observableTheme = this.themeService
      .getObservableTheme()
      .subscribe(() => {
        this.checkTheme();
      });
  }
}
