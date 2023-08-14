export interface iProject {
  readonly id: string;
  name: string;
  img: string;
  description: string;
  subtitle: string;
  drive: string;
  github: string;
  web: string;
  stack: string[];
}

export class Project implements iProject {
  readonly id: string;
  name: string;
  img: string;
  description: string;
  drive: string;
  github: string;
  stack: string[];
  subtitle: string;
  web: string;

  constructor(project: iProject) {
    this.id = project.id;
    this.name = project.name;
    this.img = project.img;
    this.description = project.description;
    this.subtitle = project.subtitle;
    this.drive = project.drive;
    this.github = project.github;
    this.web = project.web;
    this.stack = project.stack;
  }
}
