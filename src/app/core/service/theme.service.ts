import { EventEmitter, Injectable } from "@angular/core";
import { Themes } from "@core/interface/theme";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  observableTheme: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  /**
   * Set the theme of the application
   * @param theme
   */
  setTheme(theme: string) {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
    this.observableTheme.emit();
  }

  /**
   * Get the theme of the application
   * @returns theme of the application (default, white)
   */
  getTheme() {
    return (
      JSON.parse(JSON.stringify(localStorage.getItem("theme"))) ??
      Themes.DEFAULT
    );
  }

  /**
   * Observable theme
   */
  getObservableTheme() {
    return this.observableTheme;
  }
}
