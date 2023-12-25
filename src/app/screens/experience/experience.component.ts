import { Component, OnDestroy, OnInit } from "@angular/core";
import { NotionService } from "@core/service/notion.service";
import { StorageService } from "@core/service/storage.service";
import { iExperience, Type_Experience } from "@core/interface/experience";
import { Storage } from "@core/interface/storage";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.css"],
})
export class ExperienceComponent implements OnInit, OnDestroy {
  experienceData: iExperience[] = [];
  Type_Experience = Type_Experience;
  private scrollListener!: EventListener;

  constructor(
    private notionService: NotionService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.experienceData = this.storageService.getItem(Storage.EXPERIENCE);
    this.scrollListener = this.animationCard.bind(this);
    this.getExperience();
    setTimeout(() => {
      window.addEventListener("scroll", this.scrollListener);
    }, 1000);
  }

  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.scrollListener);
  }

  async getExperience() {
    this.experienceData = await this.notionService.getExperience();
    this.experienceData
      .sort((a: iExperience, b: iExperience) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .reverse();
    this.storageService.setItem(Storage.EXPERIENCE, this.experienceData);
  }

  redirectToExternalPage(url: string) {
    if (!url) return;
    window.open(url, "_blank");
  }

  animationCard(event: Event) {
    const cards = document.querySelectorAll(".cd-timeline-content");
    cards?.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const cardBottom = card.getBoundingClientRect().bottom;
      if (cardTop < window.innerHeight && cardBottom > 0) {
        card.classList.add("show");
      } else {
        // card.classList.remove('show')
      }
    });
  }
}
