import {FormField} from "./Form";

export class Prefab {

    private name: string;
    private _tmp: number;

    constructor(game_object?:Prefab) {
        this.name = 'Default Name';
        this._tmp = (Math.random() * 1000000000) | 0;
        if (game_object) {
            (game_object._tmp) ? (this._tmp = game_object._tmp) : 0;
            (game_object.name) ? (this.name = game_object.name) : 0;
        }
    }

    public getName() {
        return this.name;
    }

    render(state,updateCB?:any){

        let self = this;
        let elem = document.createElement('div');

        let name_controls = new FormField({type: "text", placeholder: "Object Name", value: this.name}, function (n) {
            self.name = n;
            if(updateCB){updateCB();}
        });

        elem.appendChild(name_controls.getElement());

        return elem;
    }

}