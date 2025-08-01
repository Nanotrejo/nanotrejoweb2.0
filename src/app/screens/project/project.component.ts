import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iProject } from "@core/interface/project";
import { fadeInFast } from "@assets/css/animation";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { ThemeService } from "@core/service/theme.service";
import { Themes } from "@core/interface/theme";
import { MetaService } from "@core/service/meta.service";

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
    private metaService: MetaService
  ) {
    this.metaService.updateMetaTags({
      title: 'Proyectos',
      description: 'Explora mi portafolio de proyectos de desarrollo web, incluyendo aplicaciones Angular, APIs y más.',
      image: '/assets/images/projects-preview.webp'
    });
  }

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
      
      // Actualizar meta tags con información dinámica
      if (this.projectData.length > 0) {
        const projectNames = this.projectData.map(p => p.name).join(', ');
        this.metaService.updateMetaTags({
          title: 'Proyectos',
          description: `Explora mis proyectos destacados: ${projectNames}. Desarrollo web con Angular, APIs y más tecnologías modernas.`,
          image: this.projectData[0].img || '/assets/images/projects-preview.webp'
        });
      }
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
