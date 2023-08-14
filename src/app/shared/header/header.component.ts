import { AfterViewInit, Component, OnInit } from "@angular/core";
import {
  fadeInFast,
  fadeOutFast,
  translateIn,
  translateOut,
} from "@assets/css/animation";

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
  isMenu = false;

  constructor() {}

  ngOnInit(): void {}

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
}
