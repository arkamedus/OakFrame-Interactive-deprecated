export class Module {

    private element: HTMLElement;

    constructor() {
        this.element = null;
    }

    focus(element: HTMLElement) {
        this.element = element;
    }

}