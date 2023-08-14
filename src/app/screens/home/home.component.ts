import { Component, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iStack } from "@core/interface/stack";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  stackData: iStack[] = [];

  constructor(private notionService: NotionService) {}

  ngOnInit(): void {
    this.getStackData();
  }

  async getStackData() {
    // this.stackData = await this.notionService.getStacks();
  }
}
