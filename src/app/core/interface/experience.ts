export enum Type_Experience {
  CURSO = "curso",
  JOB = "job",
  STUDY = "study",
  CERTIFICATE = "certificate",
}
export interface iExperience {
  readonly id: string;
  title: string;
  subtitle: string;
  url: string;
  date: Date;
  date_end: Date;
  stack: Array<string>;
  img: string;
  type: Type_Experience;
  position: string;
}
