import {RoomObject} from "./RoomObject";

export class Component {
    public update(entity: RoomObject): void {
    };
}

export class HasComponent {
    public components;

    constructor() {
        this.components = [];
    }

    addComponent(component: Component) {
        console.log('ADDED COMPONENT');
        this.components.push(component);
    }

    getComponents(): Component[] {
        return this.components;
    }

    runComponents(): void {
        let self = this;

        this.components.forEach(function (component) {
            component.update(self);
        });
    }
}