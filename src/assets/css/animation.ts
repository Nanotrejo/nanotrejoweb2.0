import { style, animate, transition, trigger } from "@angular/animations";

const fadeInFastAnimation = transition(":enter", [
  style({ opacity: 0 }),
  animate("250ms ease-in", style({ opacity: 1 })),
]);
export const fadeInFast = trigger("fadeInFast", [fadeInFastAnimation]);

const fadeInSlowAnimation = transition(":enter", [
  style({ opacity: 0 }),
  animate("500ms ease-in", style({ opacity: 1 })),
]);
export const fadeInSlow = trigger("fadeInSlow", [fadeInSlowAnimation]);

const fadeOutFastAnimation = transition(":leave", [
  animate("250ms ease-in", style({ opacity: 0 })),
]);
export const fadeOutFast = trigger("fadeOutFast", [fadeOutFastAnimation]);

const translateInAnimation = transition(":enter", [
  style({ opacity: 0, transform: "translateY(0.25rem)" }),
  animate("200ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
]);

export const translateIn = trigger("translateIn", [translateInAnimation]);

const translateOutAnimation = transition(":leave", [
  style({ opacity: 1, transform: "translateY(0)" }),
  animate(
    "150ms ease-in",
    style({ opacity: 0, transform: "translateY(0.25rem)" }),
  ),
]);

export const translateOut = trigger("translateOut", [translateOutAnimation]);
