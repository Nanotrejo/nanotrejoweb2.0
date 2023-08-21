export interface iMenu {
  name: string;
  url?: string;
  icon?: string;
  description?: string;
  more?: iMenu[];
}
