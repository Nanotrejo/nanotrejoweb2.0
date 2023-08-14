import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@screens/home/home.component";
import { MainComponent } from "@screens/main/main.component";

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: "enabled",
  scrollOffset: [0, 64],
};

const routes: Routes = [
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
