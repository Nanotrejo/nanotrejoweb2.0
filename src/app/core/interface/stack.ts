export interface iStack {
  readonly id: string;
  name: string;
  img: string;
}

export class Stack implements iStack {
  readonly id: string;
  name: string;
  img: string;

  constructor(stack: iStack) {
    this.id = stack.id;
    this.name = stack.name;
    this.img = stack.img;
  }
}
