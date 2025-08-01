import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "@screens/home/home.component";
import { ProjectComponent } from "@screens/project/project.component";
import { MainComponent } from "./main/main.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ExperienceComponent } from "./experience/experience.component";
import { ContactComponent } from "./contact/contact.component";
import { MusicComponent } from "./music/music.component";
import { CheatsheetComponent } from "./cheatsheet/cheatsheet.component";
import { TricksComponent } from "./cheatsheet/tricks/tricks.component";
import { MarkdownModule } from "ngx-markdown";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AboutComponent } from "./about/about.component";

@NgModule({
  declarations: [
    ProjectComponent,
    MainComponent,
    ExperienceComponent,
    ContactComponent,
    MusicComponent,
    CheatsheetComponent,
    TricksComponent,
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    MarkdownModule.forRoot()  ],
})
export class ScreenModule {}
