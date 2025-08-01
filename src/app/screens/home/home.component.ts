import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iStack } from "@core/interface/stack";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { fadeInFast, translateLeftIn } from "@assets/css/animation";
import { Themes } from "@core/interface/theme";
import { ThemeService } from "@core/service/theme.service";
import { MetaService } from "@core/service/meta.service";

@Component({
    selector: "app-home",
    animations: [fadeInFast, translateLeftIn],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  stackData: iStack[] = [];
  timeExperience: number = new Date().getFullYear() - 2021;
  isThemeDefault: boolean = false;

  constructor(
    private notionService: NotionService,
    private storageService: StorageService,
    private themeService: ThemeService,
    private metaService: MetaService
  ) {
    this.metaService.updateMetaTags({
      title: 'Inicio',
      description: 'Desarrollador web Full Stack especializado en Angular y tecnologías modernas. Explora mi portafolio de proyectos y experiencias.',
    });
  }

  ngOnInit(): void {
    this.stackData = this.storageService.getItem(Storage.STACK);
    this.checkTheme();
    this.getStackData();
  }

  ngOnDestroy(): void {}

  async getStackData() {
    const newData = await this.notionService.getStacks();
    newData?.sort((a: iStack, b: iStack) => a.name.localeCompare(b.name));
    if (
      !this.storageService.checkObjectsAreEqual(this.stackData, newData, [
        "img",
      ])
    ) {
      this.stackData = [...newData];
    }

    this.stackData.forEach((stack: iStack, index: number) => {
      stack.img = newData[index].img;
    });
    this.storageService.setItem(Storage.STACK, this.stackData);
  }

  checkTheme() {
    this.isThemeDefault = this.themeService.getTheme() === Themes.DEFAULT;
  }
}
