import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iProject } from "@core/interface/project";
import { fadeInFast } from "@assets/css/animation";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { iStack } from "@core/interface/stack";
import { ThemeService } from "@core/service/theme.service";
import { Themes } from "@core/interface/theme";

@Component({
    selector: "app-project",
    animations: [fadeInFast],
    templateUrl: "./project.component.html",
    styleUrls: ["./project.component.css"],
    standalone: false
})
export class ProjectComponent implements OnInit, OnDestroy {
  projectData: iProject[] = [];
  observableTheme: any;
  isThemeDefault: boolean = false;

  constructor(
    private notionService: NotionService,
    private storeService: StorageService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.projectData = this.storeService.getItem(Storage.PROJECT);
    this.getProject();
    this.isThemeDefault = this.themeService.getTheme() === Themes.DEFAULT;
    this.getObservableTheme();
  }

  ngOnDestroy(): void {
    this.observableTheme?.unsubscribe();
  }

  async getProject() {
    const newData = await this.notionService.getProject();
    // newData.sort((a: iStack, b: iStack) => a.name.localeCompare(b.name));
    if (
      !this.storeService.checkObjectsAreEqual(this.projectData, newData, [
        "img",
      ])
    ) {
      this.projectData = [...newData];
    }
    this.projectData.forEach((project: iProject, index: number) => {
      project.img =
        project?.img === newData[index].img ? project.img : newData[index].img;
    });

    this.storeService.setItem(Storage.PROJECT, this.projectData);
  }

  getObservableTheme() {
    this.observableTheme?.unsubscribe();
    this.observableTheme = this.themeService
      .getObservableTheme()
      .subscribe(() => {
        this.isThemeDefault = this.themeService.getTheme() === Themes.DEFAULT;
      });
  }
}
