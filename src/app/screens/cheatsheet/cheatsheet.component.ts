import { Component, HostListener, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iCheatsheet } from "@core/interface/cheatsheet";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { fadeInFast } from "@assets/css/animation";
import { DomSanitizer } from "@angular/platform-browser";
import { MetaService } from "@core/service/meta.service";
import { TransitionService } from "@core/service/transition.service";

@Component({
  selector: "app-cheatsheet",
  animations: [fadeInFast],
  templateUrl: "./cheatsheet.component.html",
  styleUrls: ["./cheatsheet.component.css"],
  standalone: false,
})
export class CheatsheetComponent implements OnInit {
  cheatsheetData: iCheatsheet[] = [];
  cheatsheetDataAux: iCheatsheet[] = [];
  loading: boolean = false;
  filter: Array<string> = [
    "Todo",
    "Angular",
    "CSS",
    "HTML",
    "JavaScript",
    "Python",
    "Linux",
  ];
  filterSelected: string = "Todo";
  searchValue: string = "";

  constructor(
    private notionService: NotionService,
    private storageService: StorageService,
    private sanitizer: DomSanitizer,
    private metaService: MetaService,
    private transitionService: TransitionService,
  ) {
    this.metaService.updateMetaTags({
      title: "Trucos y Consejos",
      description:
        "Colección de trucos, consejos y mejores prácticas de programación. Tutoriales y guías técnicas.",
      image: "/assets/images/tricks-preview.webp",
    });
  }

  ngOnInit(): void {
    this.cheatsheetData = this.storageService.getItem(Storage.CHEATSHEET) || [];
    this.cheatsheetDataAux = [...this.cheatsheetData];
    this.cheatsheetData.length !== 0 && (this.loading = true);
    this.getCheatsheetData();
  }

  async getCheatsheetData() {
    const newData = await this.notionService.getCheatsheet();
    newData.sort(
      (a: iCheatsheet, b: iCheatsheet) =>
        new Date(b?.date)?.getTime() - new Date(a?.date)?.getTime(),
    );
    if (
      !this.storageService.checkObjectsAreEqual(this.cheatsheetData, newData, [
        "bento",
        "span",
        "img",
      ])
    ) {
      this.cheatsheetData = [...newData];

      this.cheatsheetData.forEach((cheatsheet: iCheatsheet, index: number) => {
        cheatsheet.bento = Math.floor(Math.random() * 4) + 1;
        cheatsheet.span = Math.floor(Math.random() * 2) + 1;
      });
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    } else this.loading = true;

    this.cheatsheetData.forEach((cheatsheet: iCheatsheet, index: number) => {
      // cheatsheet.img = this.sanitizer.bypassSecurityTrustResourceUrl(newData[index].img) as string;
      cheatsheet.img = newData[index].img;
    });
    this.cheatsheetDataAux = [...this.cheatsheetData];

    setTimeout(() => {
      this.filterBackdrop();
    }, 2500);
    this.cheatsheetDataAux = [...this.cheatsheetData];
    this.notionService.cheatsheet = [...this.cheatsheetData];
    this.storageService.setItem(Storage.CHEATSHEET, this.cheatsheetData);
  }

  filterItems(filter: string) {
    this.filterSelected = filter;
    this.cheatsheetData =
      filter === "Todo"
        ? this.cheatsheetDataAux
        : this.cheatsheetDataAux.filter(
            (cheatsheet: iCheatsheet) =>
              cheatsheet.title.toLowerCase().includes(filter.toLowerCase()) ||
              cheatsheet.description
                .toLowerCase()
                .includes(filter.toLowerCase()),
          );
    this.filterBackdrop();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.filterBackdrop();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Recalculate backdrop position while scrolling so it stays on the selected button
    this.filterBackdrop();
  }

  filterBackdrop() {
    const listItem = document.querySelectorAll("#filter-container button");
    const filterBackdrop = document.querySelector(
      "#filter-backdrop",
    ) as HTMLElement;
    if (!filterBackdrop || !listItem || listItem.length === 0) return;

    const container = document.querySelector(
      "#filter-container",
    ) as HTMLElement;
    if (!container) return;

    window.requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      listItem.forEach((item) => {
        if (
          String(item.textContent).trim().toLowerCase() ===
          this.filterSelected.toLowerCase()
        ) {

          const { left, top, width, height } = item.getBoundingClientRect();

          // Calculate position relative to container so backdrop moves with the container when scrolling
          const relLeft = left - containerRect.left;
          const relTop = top - containerRect.top;

          const horizontalPadding = 0;
          const verticalPadding = 0;

          filterBackdrop.style.setProperty("--left", `${relLeft - horizontalPadding / 2}px`);
          filterBackdrop.style.setProperty("--top", `${relTop - verticalPadding / 2}px`);
          filterBackdrop.style.setProperty("--width", `${width + horizontalPadding}px`);
          filterBackdrop.style.setProperty("--height", `${height + verticalPadding}px`);

          filterBackdrop.style.opacity = "1";
          filterBackdrop.style.visibility = "visible";
        }
      });
    });
  }

  search(event: string | any) {
    if (event?.code?.includes("Arrow")) return;
    const val = event?.target?.value?.toLowerCase() ?? event;
    this.searchValue = val;
    this.cheatsheetData = this.cheatsheetDataAux.filter(
      (cheatsheet: iCheatsheet) =>
        cheatsheet.title.toLowerCase().includes(val.toLowerCase()) ||
        cheatsheet.description.toLowerCase().includes(val.toLowerCase()),
    );
  }

  async navigateToTrick(id: string) {
    await this.transitionService.navigate(["../trucos", id]);
  }
}
