import { Injectable } from "@angular/core";
import { iMenu, menuData } from "@core/interface/menu";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  menu: iMenu[] = menuData;

  constructor() {}

  /**
   * @description Get menu items
   * @return {iMenu[]}
   */
  getMenu(): iMenu[] {
    return this.menu;
  }
}
