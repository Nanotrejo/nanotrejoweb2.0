import { Component, OnInit } from "@angular/core";
import { MetaService } from "@core/service/meta.service";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.css"],
    standalone: false,
})
export class AboutComponent implements OnInit {
    constructor(private metaService: MetaService) {
        this.metaService.updateMetaTags({
            title: "Sobre Mí",
            description:
                "Conoce más sobre mi trayectoria profesional, habilidades técnicas y experiencia en desarrollo web.",
            image: "/assets/images/nano-img-400.webp",
        });
    }

    ngOnInit(): void {}
}
