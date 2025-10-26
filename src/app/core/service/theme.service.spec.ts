import { TestBed } from "@angular/core/testing";
import { ThemeService } from "./theme.service";
import { Themes } from "@core/interface/theme";
import { Storage } from "@core/interface/storage";

describe("ThemeService", () => {
    let service: ThemeService;

    beforeEach(() => {
        localStorage.clear();
        service = TestBed.inject(ThemeService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should set and get theme", () => {
        service.setTheme(Themes.WHITE);
        expect(service.getTheme()).toBe(Themes.WHITE);
        expect(document.documentElement.className).toBe(Themes.WHITE);
        expect(localStorage.getItem(Storage.THEME)).toBe(JSON.stringify(Themes.WHITE));
    });

    it("should toggle theme with changeTheme", () => {
        service.setTheme(Themes.DEFAULT);
        service.changeTheme();
        expect(service.getTheme()).toBe(Themes.WHITE);
        service.changeTheme();
        expect(service.getTheme()).toBe(Themes.DEFAULT);
    });

    it("should update observableTheme signal", () => {
        service.setTheme(Themes.WHITE);
        expect(service.observableTheme()).toBe(Themes.WHITE);
        service.setTheme(Themes.DEFAULT);
        expect(service.observableTheme()).toBe(Themes.DEFAULT);
    });
});
