import { Component } from "@angular/core";
import { ThemeService } from "@core/service/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "nanotrejoweb";

  constructor(private themeService: ThemeService) {
    this.themeService.setTheme(this.themeService.getTheme());
  }
}
