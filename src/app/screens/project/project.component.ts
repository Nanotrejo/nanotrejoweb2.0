import { Component, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iProject } from "@core/interface/project";
import { fadeInFast } from "@assets/css/animation";

@Component({
  selector: "app-project",
  animations: [fadeInFast],
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.css"],
})
export class ProjectComponent implements OnInit {
  projectData: iProject[] = [];

  constructor(private notionService: NotionService) {}

  ngOnInit(): void {
    this.getProject();
  }

  async getProject() {
    this.projectData = await this.notionService.getProject();
  }
}
