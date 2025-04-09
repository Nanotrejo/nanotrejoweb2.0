import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { LoadingComponent } from "./loading/loading.component";
import { KbarComponent } from "./kbar/kbar.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    KbarComponent,
  ],
  exports: [HeaderComponent, FooterComponent, LoadingComponent, KbarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
