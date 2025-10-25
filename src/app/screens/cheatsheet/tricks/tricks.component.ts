import { Component, OnInit, Renderer2 } from "@angular/core";
import { MarkdownService } from "ngx-markdown";
import { ActivatedRoute } from "@angular/router";
import { NotionService } from "@core/service/notion.service";
import { iCheatsheet } from "@core/interface/cheatsheet";
import {
  fadeInFast,
  translateLeftIn,
  translateRightIn,
} from "@assets/css/animation";
import { DomSanitizer } from "@angular/platform-browser";
import { TransitionService } from "@core/service/transition.service";

@Component({
  selector: "app-tricks",
  animations: [fadeInFast, translateRightIn, translateLeftIn],
  templateUrl: "./tricks.component.html",
  styleUrls: ["./tricks.component.css"],
  standalone: false,
})
export class TricksComponent implements OnInit {
  loading: boolean = false;
  loadingGoTo: boolean = false;
  markdown: string = "";
  linkToCopy: string = "";
  linkCopied: boolean = false;
  data: iCheatsheet = {} as iCheatsheet;
  goTo = {
    prev: "",
    next: "",
  };

  constructor(
    private mdService: MarkdownService,
    private notionService: NotionService,
    private renderer: Renderer2,
    private activatedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private transitionService: TransitionService,
  ) {}

  ngOnInit(): void {
    this.getMarkdown();
    this.getGoTo();
  }

  getMarkdown(): void {
    this.activatedRouter.params.subscribe((params) => {
      const id = params.id;
      this.data =
        this.notionService.cheatsheet.find(
          (cheatsheet: iCheatsheet) => cheatsheet.id === id,
        ) || ({} as iCheatsheet);
      this.data.img_sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.data.img,
      ) as string;
      this.markdownUpdated();
      this.getCheatsheetById(id);
      this.loading = true;
    });
  }

  async getCheatsheetById(id: string): Promise<void> {
    this.data = await this.notionService.getCheatsheetById(id);
    if (this.data) {
      this.data.img_sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.data.img,
      ) as string;
      this.markdownUpdated();
    }
  }

  async markdownUpdated() {
    this.markdown = await this.mdService.parse(this.data?.markdown);
    this.markdown = this.addTargetBlank(this.markdown);
    this.markdown = this.addUrlSecurity(this.markdown);
    setTimeout(() => this.onMarkdownReady(), 500);
  }

  addTargetBlank(html: string): string {
    return html.replace(
      new RegExp("<a", "g"),
      '<a class="link-trick" target="_blank" rel="nofollow" ',
    );
  }

  addUrlSecurity(html: string): string {
    return html;
  }

  copyCurrentUrlToClipboard() {
    const currentUrl = window.location.href;
    const input = this.renderer.createElement("input");
    input.value = currentUrl;
    this.renderer.appendChild(document.body, input);
    input.select();
    document.execCommand("copy");
    this.renderer.removeChild(document.body, input);
    this.linkCopied = true;
    setTimeout(() => {
      this.linkCopied = false;
    }, 3000);
  }

  onMarkdownReady() {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks?.forEach((block: Element) => {
      // Evita duplicar el botón si ya existe
      if (
        block.parentElement?.parentElement?.classList.contains("code-container")
      ) {
        return;
      }

      const copyButton = document.createElement("button");
      copyButton.classList.add("copy-button");
      copyButton.innerHTML = '<span class="material-icons">content_copy</span>';
      copyButton.addEventListener("click", () => {
        const codeContent = block.textContent;
        if (codeContent) {
          navigator.clipboard
            .writeText(codeContent)
            .then(() => {
              copyButton.innerHTML =
                '<div class="center-content"><span class="material-icons">check</span> Código copiado </div>';
              setTimeout(() => {
                copyButton.innerHTML =
                  '<span class="material-icons">content_copy</span>';
              }, 2000);
            })
            .catch((error) => console.error("Error al copiar", error));
        }
      });

      const container = document.createElement("div");
      container.classList.add("code-container");
      block.parentElement?.replaceWith(container);
      container.appendChild(copyButton);
      container.appendChild(block.parentElement as HTMLElement);
    });
  }

  getGoTo() {
    const ids = this.notionService.cheatsheet.map((c) => c.id);
    const idx = ids.indexOf(this.data?.id || "");
    this.goTo.prev = idx > 0 ? ids[idx - 1] : "";
    this.goTo.next = idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : "";
    this.loadingGoTo = true;
  }

  goToArrow(direction: 'prev' | 'next') {
    if (!this.loadingGoTo || !this.goTo[direction]) return;
    this.loadingGoTo = false;
    this.transitionService.navigate(["/trucos", this.goTo[direction]]);
    setTimeout(() => {
      this.getGoTo();
    }, 250);
  }
}
