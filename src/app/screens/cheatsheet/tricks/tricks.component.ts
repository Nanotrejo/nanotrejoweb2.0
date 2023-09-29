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

@Component({
  selector: "app-tricks",
  animations: [fadeInFast, translateRightIn, translateLeftIn],
  templateUrl: "./tricks.component.html",
  styleUrls: ["./tricks.component.css"],
})
export class TricksComponent implements OnInit {
  loading: boolean = false;
  markdown: string = "";
  linkToCopy: string = "";
  linkCopied: boolean = false;
  data: iCheatsheet = {} as iCheatsheet;

  constructor(
    private mdService: MarkdownService,
    private notionService: NotionService,
    private renderer: Renderer2,
    private activatedRouter: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getMarkdown();
  }

  getMarkdown(): void {
    this.activatedRouter.params.subscribe((params) => {
      const id = params.id;
      this.data =
        this.notionService.cheatsheet.find(
          (cheatsheet: iCheatsheet) => cheatsheet.id === id,
        ) || ({} as iCheatsheet);
      this.data.img = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.img) as string;
      this.markdownUpdated();
      this.getCheatsheetById(id);
      this.loading = true;
    });
  }

  async getCheatsheetById(id: string): Promise<void> {
    this.data = await this.notionService.getCheatsheetById(id);
    if(this.data) this.markdownUpdated();
  }

  markdownUpdated() {
    this.markdown = this.mdService.compile(this.data?.markdown);
    this.markdown = this.addTargetBlank(this.markdown);
this.markdown = this.addUrlSecurity(this.markdown);
  }

  addTargetBlank(html: string): string {
    return html.replace(
      new RegExp("<a", "g"),
      '<a class="link-trick" target="_blank" rel="nofollow" ',
    );
  }

  addUrlSecurity(html: string): string{
    return html
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
}
