import {Surface} from "./oakframe/Surface";

function OakFrame() {

    let Oak = this;

    return {
        getContext:function(){
            if (!window['OakContext']){
                window['OakContext'] = {};
            }
            return window['OakContext'];
        },
        getContainer: function () {
            return window['Oak'].container;
        },
        Surface: Surface,
        Utils: {
            Array: {
                max: function(array) {
                    let m;
                    array.forEach(function (v) {
                        if (!m || v>m) {
                            m = v;
                        }
                    });
                    return m;
                },
                normalizeProperties(array, precision = 2){
                    let maxes = [];
                    let output = [];
                    array.forEach(function(item){
                        for (var p in item){
                            if (!maxes[p]){
                                maxes[p] = [];
                            }
                            maxes[p].push(item[p]);
                        }
                    });

                    array.forEach(function(item){
                        let i = {};
                        for (var p in item){
                            if (isNaN(item[p])){
                                i[p] = item[p];
                            }else{
                                i[p] = (item[p]/window['Oak'].Utils.Array.max(maxes[p])).toFixed(precision);
                            }
                        }
                        output.push(i);
                    });

                    return output;
                }
            },
            HTML: {
                arrayToTable(array) {

                    function getProps(obj) {
                        let props = [];
                        for (var propt in obj) {
                            props.push(propt);
                        }
                        return props;
                    }

                    let output = [];
                    let headers = [];
                    array.forEach(function (obj) {
                        let props = getProps(obj);
                        props.forEach(function (prop) {
                            if (headers.indexOf(prop) == -1) {
                                headers.push(prop);
                            }
                        });
                    });

                    output.push("<table>");

                    if (headers.length) {

                        output.push("<tr>");
                        headers.forEach(function (header) {
                            output.push("<td><strong><em>");
                            output.push(header);
                            output.push("</em></strong></td>");
                        });
                        output.push("</tr>");

                        array.forEach(function (item) {
                            output.push("<tr>");
                            headers.forEach(function (header) {
                                output.push("<td>");
                                output.push(item[header]);
                                output.push("</td>");
                            });
                            output.push("</tr>");
                        });
                    } else {

                        array.forEach(function (item) {
                            output.push("<tr>");
                            output.push("<td>");
                            output.push(item);
                            output.push("</td>");
                            output.push("</tr>");
                        });
                    }

                    output.push("</table>");


                    return output.join('');
                }
            }
        }
    }

}

let Oak = OakFrame();
window['Oak'] = Oak;