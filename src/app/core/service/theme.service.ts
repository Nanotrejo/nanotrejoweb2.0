import { EventEmitter, Injectable } from "@angular/core";
import { Themes } from "@core/interface/theme";
import { Storage } from "@core/interface/storage";

/**
 * Server to manage the theme of the application
 */
@Injectable({
    providedIn: "root",
})
/**
 * Service to manage the theme of the application.
 */
export class ThemeService {
    /**
     * Observerble to emit theme changes
     */
    observableTheme: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor de ThemeService.
     */
    constructor() {}

    /**
     * Set the theme of the application
     * @param theme
     */
    setTheme(theme: string) {
        document.documentElement.className = theme;
        localStorage.setItem(Storage.THEME, theme);
        this.observableTheme.emit();
    }

    /**
     * Get the theme of the application
     * @returns theme of the application (default, white)
     */
    getTheme() {
        return JSON.parse(JSON.stringify(localStorage.getItem(Storage.THEME))) ?? Themes.DEFAULT;
    }

    /**
     * Observable theme
     */
    getObservableTheme() {
        return this.observableTheme;
    }

    /**
     * Change the theme of the application
     */
    changeTheme() {
        this.getTheme() === Themes.DEFAULT ? this.setTheme(Themes.WHITE) : this.setTheme(Themes.DEFAULT);
    }
}
