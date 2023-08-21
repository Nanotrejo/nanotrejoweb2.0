import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit, OnDestroy {
  timeNow = new Date();
  intervalTime: any;
  private scrollListener!: EventListener;

  constructor() {}

  ngOnInit(): void {
    this.updateInterval();
    this.scrollListener = this.removeFooter.bind(this);
    setTimeout(() => {
      window.addEventListener("scroll", this.scrollListener);
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTime);
    window.removeEventListener("scroll", this.scrollListener);
  }

  updateInterval() {
    clearInterval(this.intervalTime);
    this.intervalTime = setInterval(() => {
      this.timeNow = new Date();
    }, 1000);
  }

  removeFooter(event: Event) {
    // obtener el tope de la pantalla y el bottom
    const footer = document.querySelector("#footer-screen");
    const scrollPosition = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    footer?.classList.add("fixed");
    // Detectar si está en el inicio de la página
    if (scrollPosition === 0) {
      footer?.classList.remove("fixed");
    }

    // Detectar si está en el final de la página
    if (scrollPosition === maxScroll) {
      footer?.classList.remove("fixed");
    }
  }
}
