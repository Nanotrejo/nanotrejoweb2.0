import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "@screens/home/home.component";
import { ProjectComponent } from "@screens/project/project.component";
import { MainComponent } from "./main/main.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [HomeComponent, ProjectComponent, MainComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class ScreenModule {}
