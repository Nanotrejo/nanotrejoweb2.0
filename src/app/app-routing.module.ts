import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@screens/home/home.component";
import { MainComponent } from "@screens/main/main.component";
import { MusicComponent } from "@screens/music/music.component";
import { ExperienceComponent } from "@screens/experience/experience.component";
import { CheatsheetComponent } from "@screens/cheatsheet/cheatsheet.component";
import { TricksComponent } from "@screens/cheatsheet/tricks/tricks.component";

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: "enabled",
  scrollOffset: [0, 64],
};

const routes: Routes = [
  { path: "musica", component: MusicComponent, data: { title: "Música" } },
  { path: "trucos", component: CheatsheetComponent, data: { title: "Trucos" } },
  { path: "trucos/:id", component: TricksComponent, data: { title: "Trucos" } },
  {
    path: "gastronomia",
    component: MainComponent,
    data: { title: "Gastronomía" },
  },
  {
    path: "",
    component: MainComponent,
    data: { title: "" },
    children: [
      { path: "", component: HomeComponent, data: { title: "" } },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "**", component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
