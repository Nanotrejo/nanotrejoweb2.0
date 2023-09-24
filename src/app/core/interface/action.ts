export interface iSection {
  id: string;
  name: string;
  action: iAction[];
}

export enum TYPE_ACTION {
  URL = "URL",
  ACTION = "ACTION",
  BLOG = "BLOG",
}

export interface iAction {
  id: string;
  name: string;
  keywords: string[];
  key: string;
  perform: () => void;
  icon: string;
  typeAction: string;
  url?: string;
  fragment?: string;
}

export const actionData: iAction[] = [
  {
    id: "home",
    name: "Home",
    keywords: ["home"],
    perform: () => {
      console.log("HOME");
    },
    icon: "home",
    key: "H",
    typeAction: TYPE_ACTION.URL,
    url: "/",
    fragment: "",
  },
  {
    id: "project",
    name: "Proyectos",
    keywords: ["proyectos"],
    perform: () => {
      console.log("PROYECTOS");
    },
    icon: "code",
    key: "P",
    typeAction: TYPE_ACTION.URL,
    url: "/",
    fragment: "proyectos",
  },
  {
    id: "experience",
    name: "Experiencia",
    keywords: ["experiencia"],
    perform: () => {
      console.log("EXPERIENCIA");
    },
    icon: "work",
    key: "E",
    typeAction: TYPE_ACTION.URL,
    url: "/",
    fragment: "experiencia",
  },
  {
    id: "tricks",
    name: "Trucos",
    keywords: ["trucos"],
    perform: () => {
      console.log("TRUCOS");
    },
    icon: "laptop_mac",
    key: "T",
    typeAction: TYPE_ACTION.URL,
    url: "/trucos",
    fragment: "",
  },
  {
    id: "music",
    name: "Música",
    keywords: ["musica", "música"],
    perform: () => {
      console.log("MUSICA");
    },
    icon: "piano",
    key: "M",
    typeAction: TYPE_ACTION.URL,
    url: "/musica",
    fragment: "",
  },
  {
    id: "gastronomy",
    name: "Gastronomía",
    keywords: ["gastronomia"],
    perform: () => {
      console.log("GASTRONOMIA");
    },
    icon: "restaurant",
    key: "G",
    typeAction: TYPE_ACTION.URL,
    url: "/gastronomia",
    fragment: "",
  },
];

export const utilitiesData: iAction[] = [
  {
    id: "theme",
    name: "Cambiar tema",
    keywords: ["tema", "theme"],
    perform: () => {
      console.log("THEME");
    },
    icon: "palette",
    key: "T",
    typeAction: TYPE_ACTION.ACTION,
  },
];

export const socialDialog: iAction[] = [
  {
    id: "linkedin",
    name: "Linkedin",
    keywords: ["linkedin"],
    perform: () => {
      console.log("LINKEDIN");
    },
    icon: "assets/images/social-linkedin.svg",
    key: "L",
    typeAction: TYPE_ACTION.URL,
    url: "https://www.linkedin.com/in/david-trejo-fern%C3%A1ndez-191b95182/",
  },
  {
    id: "github",
    name: "Github",
    keywords: ["github"],
    perform: () => {
      console.log("GITHUB");
    },
    icon: "assets/images/github.svg",
    key: "G",
    typeAction: TYPE_ACTION.URL,
    url: "https://github.com/Nanotrejo",
  },
  {
    id: "youtube",
    name: "Youtube",
    keywords: ["youtube"],
    perform: () => {
      console.log("YOUTUBE");
    },
    icon: "assets/images/youtube.svg",
    key: "Y",
    typeAction: TYPE_ACTION.URL,
    url: "https://www.youtube.com/channel/UC9FeUeG4QLI99Ius1gsyKQg",
  },
];

export const sectionData: iSection[] = [
  {
    id: "pages",
    name: "Páginas",
    action: actionData,
  },
  {
    id: "utilities",
    name: "Utilidades",
    action: utilitiesData,
  },
  {
    id: "social",
    name: "Social",
    action: socialDialog,
  },
];
