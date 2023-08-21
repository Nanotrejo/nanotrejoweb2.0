import { Injectable } from "@angular/core";
import { iMenu } from "@core/interface/menu";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  menu: iMenu[] = [
    {
      name: "Proyectos",
      url: "#proyectos",
    },
    {
      name: "Experiencia",
      url: "#experiencia",
    },
    {
      name: "Contacto",
      url: "#contacto",
    },
    {
      name: "Más",
      more: [
        {
          name: "Trucos",
          url: "/trucos",
          description: "Recopilación de trucos de programación",
          icon: "laptop_mac",
        },
        {
          name: "Música",
          url: "/musica",
          description: "Canal de Youtube de mis interpretaciones a piano",
          icon: "piano",
        },
        {
          name: "Gastronomía",
          url: "/gastronomía",
          description: "Blog donde comparto mis impresiones sobre restaurantes",
          icon: "restaurant",
        },
      ],
    },
  ];

  constructor() {}

  /**
   * @description Get menu items
   * @return {iMenu[]}
   */
  getMenu() {
    return this.menu;
  }
}
