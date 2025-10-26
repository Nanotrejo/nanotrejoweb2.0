import { Component, HostListener } from "@angular/core";
import { ThemeService } from "@core/service/theme.service";
import { KbarComponent } from "./shared/kbar/kbar.component";
import { MatDialog } from "@angular/material/dialog";
import { ActionService } from "@core/service/action.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    standalone: false,
})
export class AppComponent {
    title = "nanotrejoweb";

    constructor(
        private themeService: ThemeService,
        private dialog: MatDialog,
        private actionService: ActionService
    ) {
        this.themeService.setTheme(this.themeService.getTheme());
    }

    /**
     * Listen for "Cmd+K" or "Ctrl+K" keypress to open KBar dialog
     * @param event KeyboardEvent
     */
    @HostListener("window:keydown", ["$event"])
    handleKeyPress(event: KeyboardEvent): void {
        // Verifica si se presionó la tecla "K" y la tecla "Cmd" (en Mac) o "Ctrl" (en Windows/Linux)
        if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
            // Evita que se realice la acción por defecto del navegador
            event.preventDefault();
            this.openDialog();
        }
    }

    /**
     * Open KBar dialog
     */
    openDialog() {
        document.body.style.overflow = "hidden";
        if (this.dialog.openDialogs.length > 0) return;
        const dialog = this.dialog.open(KbarComponent);

        dialog.afterClosed().subscribe(() => {
            document.body.style.overflow = "auto";
        });
    }
}
