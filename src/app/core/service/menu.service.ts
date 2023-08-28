import { Injectable } from "@angular/core";
import { iMenu } from "@core/interface/menu";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  menu: iMenu[] = [
    {
      name: "Proyectos",
      url: "/",
      fragment: "proyectos",
    },
    {
      name: "Experiencia",
      url: "/",
      fragment: "experiencia",
    },
    // {
    //   name: "Contacto",
    //   url: "/",
    //     fragment: "contacto",
    // },
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
          name: "Gastronomía (proximamente)",
          url: "/gastronomia",
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
