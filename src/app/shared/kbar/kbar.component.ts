import { Component, HostListener, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { iAction, iSection } from "@core/interface/action";
import { ActionService } from "@core/service/action.service";

@Component({
  selector: "app-kbar",
  templateUrl: "./kbar.component.html",
  styleUrls: ["./kbar.component.css"],
})
export class KbarComponent implements OnInit {
  section: iSection[] = this.actionService.sectionData;
  blog: iAction[] = this.actionService.blogData;
  isBlogActive: boolean = false;
  isMusicActive: boolean = false;
  activeElement: number = 0;
  sectionElement: number = 0;
  searchValue: string = "";

  constructor(
    public dialogRef: MatDialogRef<KbarComponent>,
    private actionService: ActionService,
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  search(event: any | string) {
    if (event?.code?.includes("Arrow")) return;
    const val = event?.target?.value?.toLowerCase() ?? event;
    this.searchValue = val;
    if (val.includes("#")) {
      this.isBlogActive = true;
      this.isMusicActive = false;
      this.section = [{ id: "blog", name: "Blog", action: this.blog }].map(
        (sec: iSection) => {
          sec.action = sec.action.filter((action: iAction) => {
            return action.keywords.some((a) =>
              a
                .toLowerCase()
                .includes(val.indexOf("#") + 1 ? val.split("#")[1] : val),
            );
          });
          return sec;
        },
      );
      this.section = this.section.filter((sec: iSection) => {
        return sec.action.length > 0;
      });
    } else if (val.includes("&")) {
      this.isMusicActive = true;
      this.isBlogActive = false;
      this.section = [
        { id: "music", name: "Music", action: this.actionService.musicData },
      ].map((sec: iSection) => {
        sec.action = sec.action.filter((action: iAction) => {
          return action.keywords.some((a) =>
            a
              .toLowerCase()
              .includes(val.indexOf("&") + 1 ? val.split("&")[1] : val),
          );
        });
        return sec;
      });
      this.section = this.section.filter((sec: iSection) => {
        return sec.action.length > 0;
      });
    } else {
      this.isBlogActive = false;
      this.isMusicActive = false;
      this.section = this.actionService.sectionData.map((sec: iSection) => {
        sec.action = sec.action.filter((action: iAction) => {
          return action.keywords.some((a) => a.toLowerCase().includes(val));
        });
        return sec;
      });
      this.section = this.section.filter((sec: iSection) => {
        return sec.action.length > 0;
      });
    }
    this.actionService.setActionData();
    this.activeElement = 0;
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const lastIndex = this.section?.[this.sectionElement]?.action?.length - 1;
    if (lastIndex === undefined) return;
    if (event.key === "ArrowDown") {
      this.navigate(1, lastIndex);
    } else if (event.key === "ArrowUp") {
      this.navigate(-1, lastIndex);
    } else if (event.key === "Enter") {
      this.section?.[this.sectionElement]?.action?.[
        this.activeElement
      ]?.perform();
      this.closeDialog();
    }
  }

  navigate(direction: number, lastIndex: number) {
    if (
      this.activeElement ===
        this.section[this.sectionElement].action.length - 1 &&
      direction === 1
    ) {
      this.sectionElement =
        this.section.length - 1 === this.sectionElement
          ? this.section.length - 1
          : this.sectionElement + 1;
      this.activeElement = 0;
      const element = document.getElementById(
        this.section[this.sectionElement].id,
      );
      if (element)
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
    } else if (
      this.sectionElement !== 0 &&
      this.activeElement === 0 &&
      direction === -1
    ) {
      this.sectionElement--;
      this.activeElement = this.section[this.sectionElement].action.length - 1;
      const element = document.getElementById(
        this.section[this.sectionElement].id,
      );
      if (element)
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
    } else {
      this.activeElement =
        (this.activeElement +
          direction +
          this.section[this.sectionElement].action.length) %
        (lastIndex + 1);
    }
  }
}
