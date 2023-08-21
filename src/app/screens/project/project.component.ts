import { Component, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iProject } from "@core/interface/project";
import { fadeInFast } from "@assets/css/animation";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";

@Component({
  selector: "app-project",
  animations: [fadeInFast],
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  projectData: iProject[] = [];

  constructor(
    private notionService: NotionService,
    private storeService: StorageService,
  ) {}

  ngOnInit(): void {
    this.projectData = this.storeService.getItem(Storage.PROJECT);
    this.getProject();
  }

  async getProject() {
    this.projectData = await this.notionService.getProject();
    this.storeService.setItem(Storage.PROJECT, this.projectData);
  }
}
