export interface iSection {
    id: string;
    name: string;
    action: iAction[];
}

export enum TYPE_ACTION {
    URL = "URL",
    ACTION = "ACTION",
    BLOG = "BLOG",
    MUSIC = "MUSIC",
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
    {
        id: "spotify",
        name: "Spotify",
        keywords: ["spotify"],
        perform: () => {
            console.log("spotify");
        },
        icon: "assets/images/spotify.svg",
        key: "S",
        typeAction: TYPE_ACTION.URL,
        url: "https://open.spotify.com/intl-es/album/4iVXz4Iojxhl6SRdB7tNfU?si=ZipmAaT3TmyjNHbl8MwcmA",
    },
    {
        id: "youtube-music",
        name: "Youtube Music",
        keywords: ["youtube", "music", "youtube-music"],
        perform: () => {
            console.log("youtube-music");
        },
        icon: "assets/images/youtube-music.svg",
        key: "Y",
        typeAction: TYPE_ACTION.URL,
        url: "https://music.youtube.com/playlist?list=OLAK5uy_k1pHVGElYlpAlunq68rPk5B8fr6v0adj0&si=PfAqdTwsNlktBqsP",
    },
    {
        id: "apple-music",
        name: "Apple Music",
        keywords: ["apple", "music", "apple music"],
        perform: () => {
            console.log("Apple Music");
        },
        icon: "assets/images/apple-music.svg",
        key: "A",
        typeAction: TYPE_ACTION.URL,
        url: "https://music.apple.com/es/album/nanotrejo-piano-instrumental-versions/1720856839",
    },
    {
        id: "code_front",
        name: "Código Frontend",
        keywords: ["código", "code", "frontend"],
        perform: () => {
            console.log("CODE");
        },
        icon: "code",
        key: "CF",
        typeAction: TYPE_ACTION.URL,
        url: "https://github.com/Nanotrejo/nanotrejoweb2.0",
    },
    {
        id: "code_back",
        name: "Código Backend",
        keywords: ["código", "code", "backend"],
        perform: () => {
            console.log("CODE");
        },
        icon: "data_object",
        key: "CB",
        typeAction: TYPE_ACTION.URL,
        url: "https://github.com/Nanotrejo/notion-api",
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
