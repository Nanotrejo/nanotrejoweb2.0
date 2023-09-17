import { Injectable } from "@angular/core";
import {
  actionData,
  iAction,
  iSection,
  sectionData,
} from "@core/interface/action";

@Injectable({
  providedIn: "root",
})
export class ActionService {
  actionData: iAction[] = actionData;
  seccionData: iSection[] = sectionData;
  constructor() {}
}
