export interface iCheatsheet {
  id: string;
  title: string;
  description: string;
  url: string;
  img: string;
  img_sanitized?: string;
  markdown: string;
  author: string;
  date: Date;
  bento?: number;
  span?: number;
}
