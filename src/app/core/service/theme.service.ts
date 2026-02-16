import { Injectable, signal } from "@angular/core";
import { Themes } from "@core/interface/theme";
import { Storage } from "@core/interface/storage";
import { StorageService } from "./storage.service";

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
     * Signal to emit theme changes
     */
    observableTheme = signal<Themes>(Themes.DEFAULT);

    /**
     * Constructor de ThemeService.
     */
    constructor(private storageService: StorageService) {
        this.observableTheme.set(this.getTheme());
    }

    /**
     * Set the theme of the application
     * @param theme
     */
    setTheme(theme: Themes) {
        document.documentElement.className = theme;
        this.storageService.setItem(Storage.THEME, theme);
        this.observableTheme.set(theme);
    }

    /**
     * Get the theme of the application
     * @returns theme of the application (default, white)
     */
    getTheme() {
        try {
            const theme = this.storageService.getItem(Storage.THEME);
            if (!(theme in Themes)) return Themes.DEFAULT;
            return theme ? theme : Themes.DEFAULT;
        } catch {
            return Themes.DEFAULT;
        }
    }
    /**
     * Change the theme of the application
     */
    changeTheme() {
        this.getTheme() === Themes.DEFAULT ? this.setTheme(Themes.WHITE) : this.setTheme(Themes.DEFAULT);
    }
}
