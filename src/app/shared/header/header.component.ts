import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import {
  fadeInFast,
  fadeOutFast,
  translateIn,
  translateOut,
} from "@assets/css/animation";
import { ThemeService } from "@core/service/theme.service";
import { Themes } from "@core/interface/theme";
import { MenuService } from "@core/service/menu.service";
import { iMenu } from "@core/interface/menu";

@Component({
  selector: "app-header",
  animations: [fadeInFast, fadeOutFast, translateIn, translateOut],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isFlyoutMenu = false;
  isMenuOpen = false;
  isSlideOver = false;
  isMenu = true;
  isThemeDefault: boolean = false;
  menuItems: iMenu[] = [];
  @Output() kbarEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private themeService: ThemeService,
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenu();
    this.isThemeDefault = this.themeService.getTheme() === Themes.DEFAULT;
  }

  ngAfterViewInit(): void {
    this.eventMouseBackdrop();
  }

  eventMouseBackdrop() {
    const listItem = document.querySelectorAll("#loading-header a");
    const menuBackDrop = document.querySelector(
      "#menu-backdrop",
    ) as HTMLElement;

    listItem.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const { left, top, width, height } = item.getBoundingClientRect();

        menuBackDrop.style.setProperty("--left", `${left - 10}px`);
        menuBackDrop.style.setProperty("--top", `${top - 10}px`);
        menuBackDrop.style.setProperty("--width", `${width + 20}px`);
        menuBackDrop.style.setProperty("--height", `${height + 20}px`);

        menuBackDrop.style.opacity = "1";
        menuBackDrop.style.visibility = "visible";
      });

      item.addEventListener("mouseleave", () => {
        menuBackDrop.style.opacity = "0";
        menuBackDrop.style.visibility = "hidden";
      });
    });
  }

  changeTheme() {
    this.isThemeDefault = !this.isThemeDefault;
    this.themeService.setTheme(
      this.isThemeDefault ? Themes.DEFAULT : Themes.WHITE,
    );
  }

  openKbarDialog() {
    this.kbarEmitter.emit();
  }
}
