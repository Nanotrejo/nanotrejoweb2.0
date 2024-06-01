export interface iMenu {
  name: string;
  url?: string;
  fragment?: string;
  icon?: string;
  description?: string;
  more?: iMenu[];
}

export const menuData: iMenu[] = [
  {
    name: "Experiencia",
    url: "/",
    fragment: "experiencia",
  },
  {
    name: "Proyectos",
    url: "/",
    fragment: "proyectos",
  },
  {
    name: "Sobre mi",
    url: "/",
    fragment: "sobre_mi",
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
        name: "Gastronomía (proximamente)",
        url: "/gastronomia",
        description: "Blog donde comparto mis impresiones sobre restaurantes",
        icon: "restaurant",
      },
    ],
  },
];
