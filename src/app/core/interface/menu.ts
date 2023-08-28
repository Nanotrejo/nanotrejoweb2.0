export interface iMenu {
  name: string;
  url?: string;
  fragment?: string;
  icon?: string;
  description?: string;
  more?: iMenu[];
}
