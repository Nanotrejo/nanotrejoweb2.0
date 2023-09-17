export interface iSection {
  id: string;
  name: string;
  action: iAction[];
}

export enum TYPE_ACTION {
  URL = "URL",
  ACTION = "ACTION",
  DIALOG = "DIALOG",
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
    perform: () => {},
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
    perform: () => {},
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
    perform: () => {},
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
    perform: () => {},
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
      console.log("Hello world!");
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
    perform: () => {},
    icon: "restaurant",
    key: "G",
    typeAction: TYPE_ACTION.URL,
    url: "/gastronomia",
    fragment: "",
  },
];

export const sectionData: iSection[] = [
  {
    id: "pages",
    name: "Páginas",
    action: actionData,
  },
];
