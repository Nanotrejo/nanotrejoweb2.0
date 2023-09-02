import { Component, HostListener, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { iCheatsheet } from "@core/interface/cheatsheet";
import { StorageService } from "@core/service/storage.service";
import { Storage } from "@core/interface/storage";
import { fadeInFast } from "@assets/css/animation";

@Component({
  selector: "app-cheatsheet",
  animations: [fadeInFast],
  templateUrl: "./cheatsheet.component.html",
  styleUrls: ["./cheatsheet.component.css"],
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

  constructor(
    private notionService: NotionService,
    private storageService: StorageService,
  ) {}

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

  filterBackdrop() {
    const listItem = document.querySelectorAll("#filter-container button");
    const filterBackdrop = document.querySelector(
      "#filter-backdrop",
    ) as HTMLElement;

    listItem.forEach((item) => {
      if (
        String(item.textContent).trim().toLowerCase() ===
        this.filterSelected.toLowerCase()
      ) {
        const { left, top, width, height } = item.getBoundingClientRect();

        filterBackdrop.style.setProperty("--left", `${left - 10}px`);
        filterBackdrop.style.setProperty("--top", `${top - 10}px`);
        filterBackdrop.style.setProperty("--width", `${width + 20}px`);
        filterBackdrop.style.setProperty("--height", `${height + 20}px`);

        filterBackdrop.style.opacity = "1";
        filterBackdrop.style.visibility = "visible";
      }
    });
  }
}
