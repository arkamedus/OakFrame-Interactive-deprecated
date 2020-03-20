import {Vec3} from "./Vec3";

export class FormField {
    private element: HTMLElement;

    constructor(props, cb) {

        this.element = document.createElement('div');

        switch (props.type) {
            case "text":
                let input_name = document.createElement('input');
                for (let prop in props) {
                    input_name[prop] = props[prop];
                }
                input_name.onkeyup = function () {
                    cb(input_name.value);
                };
                this.element.appendChild(input_name);
                break;

            case "position":
                let input_position = document.createElement('div');

                let x = document.createElement('input');
                x.type = 'range';
                x.min = props.min || '-8';
                x.max = props.max || '8';
                x.step = props.step || '0.25';
                x.value = props.value.x;
                let y = document.createElement('input');
                y.type = 'range';
                y.min = props.min || '-8';
                y.max = props.max || '8';
                y.step = props.step || '0.25';
                y.value = props.value.y;

                let label = document.createElement('h5');
                label.innerText = props.placeholder;

                input_position.appendChild(label);
                input_position.appendChild(x);
                input_position.appendChild(y);

                x.onchange = x.onmousemove = function () {
                    cb((new Vec3()).set(parseFloat(x.value), parseFloat(y.value), 0));
                };
                y.onchange = y.onmousemove = function () {
                    cb((new Vec3()).set(parseFloat(x.value), parseFloat(y.value), 0));
                };

                this.element.appendChild(input_position);
                break;

            case "object":
                let input_object = document.createElement('select');
                for (let prop in props) {
                    //  input_name[prop] = props[prop];
                }

                console.log('PROPS STATE',props["state"]);

                if (props["state"]) {

                    if (props["state"].room) {
                        props["state"].room.getObjects().forEach(function (form_option) {

                            let fo = document.createElement('option');
                            fo.value = form_option.id || form_option._tmp;
                            fo.innerText = form_option.getName();
                            console.log(props, form_option);

                            if ((form_option.id && props.value === form_option.id) || props.value === form_option._tmp) {
                                fo.selected = true;
                                console.log('hit', props.value, form_option);
                            }
                            input_object.appendChild(fo);
                        });
                    }

                }
                input_object.onchange = function () {
                    cb(parseInt(input_object.options[input_object.selectedIndex].value));
                    console.log('ob selected');
                };

                this.element.appendChild(input_object);
                break;

            case "select":
                this.element.className = 'select-wrapper';
                let input_select = document.createElement('select');
                if (props["options"]) {

                    props["options"].forEach(function (form_option) {
                        let fo = document.createElement('option');
                        fo.value = form_option.value;
                        fo.innerText = form_option.text;
                        if ((form_option.value && props.value === form_option.value) || props.value === form_option.value) {
                            fo.selected = true;
                        }
                        input_select.appendChild(fo);
                    });

                }

                input_select.onchange = function () {
                    cb(parseInt(input_select.options[input_select.selectedIndex].value));
                };

                this.element.appendChild(input_select);
                break;


        }


    }

    getElement() {
        return this.element;
    }
}