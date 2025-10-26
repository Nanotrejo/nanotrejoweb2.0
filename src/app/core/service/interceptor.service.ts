import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders = req.headers;
        newHeaders = newHeaders.set("Access-Control-Allow-Origin", "*");
        const xhr = req.clone({
            headers: newHeaders,
        });
        return next.handle(xhr);
    }
}
