import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent],
  exports: [HeaderComponent, FooterComponent, LoadingComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
  ],
})
export class SharedModule {}
