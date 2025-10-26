import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { ThemeService } from "@core/service/theme.service";
import { MatDialog } from "@angular/material/dialog";
import { ActionService } from "@core/service/action.service";
import { NotionService } from "@core/service/notion.service";
import { StorageService } from "@core/service/storage.service";
import { YoutubeService } from "@core/service/youtube.service";

class MockThemeService {
    setTheme() {}
    getTheme() {
        return "default";
    }
}
class MockMatDialog {
    openDialogs: unknown[] = [];
    private afterClosedCallback: (() => void) | null = null;
    open(): { afterClosed: () => { subscribe: (fn: () => void) => void } } {
        return {
            afterClosed: () => ({
                subscribe: (fn: () => void) => {
                    this.afterClosedCallback = fn;
                },
            }),
        };
    }
    triggerClose() {
        if (this.afterClosedCallback) {
            this.afterClosedCallback();
        }
    }
}
class MockActionService {}
class MockNotionService {}
class MockStorageService {}
class MockYoutubeService {}
describe("AppComponent", () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [AppComponent],
            providers: [
                { provide: ThemeService, useClass: MockThemeService },
                { provide: MatDialog, useClass: MockMatDialog },
                { provide: ActionService, useClass: MockActionService },
                { provide: NotionService, useClass: MockNotionService },
                { provide: StorageService, useClass: MockStorageService },
                { provide: YoutubeService, useClass: MockYoutubeService },
            ],
        }).compileComponents();
    });

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'nanotrejoweb'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual("nanotrejoweb");
    });

    it("should call openDialog and set body overflow to hidden, and restore to auto after close", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        const dialog = TestBed.inject(MatDialog) as unknown as MockMatDialog;
        dialog.openDialogs = [];
        document.body.style.overflow = "auto";
        const openSpy = spyOn(dialog, "open").and.callThrough();
        app.openDialog();
        expect(document.body.style.overflow).toBe("hidden");
        expect(openSpy).toHaveBeenCalled();
        // Simula el cierre del modal
        dialog.triggerClose();
        expect(document.body.style.overflow).toBe("auto");
    });

    it("should call openDialog and preventDefault on Cmd/Ctrl+K", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        const openDialogSpy = spyOn(app, "openDialog");
        const preventDefaultSpy = jasmine.createSpy("preventDefault");
        // Simula Cmd+K
        app.handleKeyPress({
            key: "k",
            metaKey: true,
            ctrlKey: false,
            preventDefault: preventDefaultSpy,
        } as unknown as KeyboardEvent);
        expect(openDialogSpy).toHaveBeenCalled();
        expect(preventDefaultSpy).toHaveBeenCalled();
        // Simula Ctrl+K
        openDialogSpy.calls.reset();
        app.handleKeyPress({
            key: "K",
            metaKey: false,
            ctrlKey: true,
            preventDefault: preventDefaultSpy,
        } as unknown as KeyboardEvent);
        expect(openDialogSpy).toHaveBeenCalled();
        expect(preventDefaultSpy).toHaveBeenCalled();
    });
});
