import { Component, OnInit } from "@angular/core";
import { fadeInSlow } from "@assets/css/animation";

@Component({
    selector: "app-main",
    animations: [fadeInSlow],
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"],
    standalone: false
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
