import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { iAction, iSection, TYPE_ACTION } from "@core/interface/action";
import { ActionService } from "@core/service/action.service";

@Component({
  selector: "app-kbar",
  templateUrl: "./kbar.component.html",
  styleUrls: ["./kbar.component.css"],
})
export class KbarComponent implements OnInit {
  section: iSection[] = this.actionService.seccionData;
  TYPE_ACTION = TYPE_ACTION;

  constructor(
    public dialogRef: MatDialogRef<KbarComponent>,
    private actionService: ActionService,
  ) {}

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  search(event: any) {
    const val = event.target.value.toLowerCase();
    this.section = JSON.parse(
      JSON.stringify(this.actionService.seccionData),
    ).map((sec: iSection) => {
      sec.action = sec.action.filter((action: iAction) => {
        return action.keywords.some((a) => a.toLowerCase().includes(val));
      });
      return sec;
    });
    this.section = this.section.filter((sec: iSection) => {
      return sec.action.length > 0;
    });
  }
}
