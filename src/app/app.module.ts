import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import localeES from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScreenModule } from "@screens/screen.module";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { InterceptorService } from "@core/service/interceptor.service";
import { SharedModule } from "./shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { MarkdownModule } from "ngx-markdown";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "@env/environment";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";

registerLocaleData(localeES, "es");

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        ScreenModule,
        SharedModule,
        MarkdownModule.forRoot(),
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000",
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
        { provide: LOCALE_ID, useValue: "es" },
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule {}
