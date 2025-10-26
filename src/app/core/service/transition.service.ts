import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class TransitionService {
    constructor(private router: Router) {
        this.setupNavigationTransition();
    }

    private setupNavigationTransition() {
        this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
            if (document.startViewTransition) {
                document.startViewTransition();
            }
        });
    }

    async navigate(commands: any[]) {
        if (!document.startViewTransition) {
            return this.router.navigate(commands);
        }

        return new Promise<boolean>(resolve => {
            document.startViewTransition(async () => {
                resolve(await this.router.navigate(commands));
            });
        });
    }
}
