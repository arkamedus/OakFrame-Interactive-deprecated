import { Surface } from "../oakframe/Surface";
import { Vec3 } from "../oakframe/Vec3";
import { Vec2 } from "../oakframe/Vec2";
import { Sprite } from "../oakframe/Sprite";
import { Face3, Mesh } from "../oakframe/Mesh";
import { Project } from "../oakframe/Project";
import { RoomObject } from "../oakframe/RoomObject";
import { Camera } from "../oakframe/Camera";
import { SHIPP } from "../oakframe/SHIPP";
function OakFrame() {
    return {
        getContext: function () {
            if (!window['OakContext']) {
                window['OakContext'] = {};
            }
            return window['OakContext'];
        },
        getContainer: function () {
            return window['Oak'].container || document.body;
        },
        Math: {
            Vec3: Vec3,
            Vec2: Vec2,
            Mesh: Mesh,
            Face3: Face3,
            SHIPP: SHIPP
        },
        Surface: Surface,
        Sprite: Sprite,
        Project: Project,
        RoomObject: RoomObject,
        Camera: Camera,
        Utils: {
            Object: {
                rollup: function (object) {
                    for (var i in object) {
                        if (typeof object[i] == "object") {
                            for (var x in object[i]) {
                                object[x] = object[i][x];
                            }
                            delete object[i];
                        }
                    }
                    return object;
                }
            },
            Array: {
                max: function (array) {
                    let m;
                    array.forEach(function (v) {
                        if (!m || v > m) {
                            m = v;
                        }
                    });
                    return m;
                },
                normalizeProperties(array, precision = 2) {
                    let maxes = [];
                    let output = [];
                    array.forEach(function (item) {
                        for (var p in item) {
                            if (!maxes[p]) {
                                maxes[p] = [];
                            }
                            maxes[p].push(item[p]);
                        }
                    });
                    array.forEach(function (item) {
                        let i = {};
                        for (var p in item) {
                            if (isNaN(item[p])) {
                                i[p] = item[p];
                            }
                            else {
                                i[p] = (item[p] / window['Oak'].Utils.Array.max(maxes[p])).toFixed(precision);
                            }
                        }
                        output.push(i);
                    });
                    return output;
                }
            },
            HTML: {
                arrayToTable(array, options) {
                    options = options || {};
                    function getProps(obj) {
                        let props = [];
                        for (var propt in obj) {
                            props.push(propt);
                        }
                        return props;
                    }
                    let output = [];
                    let headers = options.headers !== undefined ? options.headers : [];
                    if (!!headers) {
                        array.forEach(function (obj) {
                            let props = getProps(obj);
                            props.forEach(function (prop) {
                                if (headers.indexOf(prop) == -1) {
                                    headers.push(prop);
                                }
                            });
                        });
                    }
                    output.push(`<table class='${options.class || ""}'>`);
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
                                output.push(typeof item[header] === 'number' ? item[header].toFixed(2) : item[header]);
                                output.push("</td>");
                            });
                            output.push("</tr>");
                        });
                    }
                    else {
                        array.forEach(function (item) {
                            output.push("<tr>");
                            output.push("<td>");
                            output.push(typeof item === 'number' ? item.toFixed(options.toFixed !== undefined ? options.toFixed : 2) : item);
                            output.push("</td>");
                            output.push("</tr>");
                        });
                    }
                    output.push("</table>");
                    return output.join('');
                }
            }
        }
    };
}
let Oak = OakFrame();
window['Oak'] = Oak;
var lastTime = 0, vendors = ['ms', 'moz', 'webkit', 'o'], x;
for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
        || window[vendors[x] + 'CancelRequestAnimationFrame'];
}
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        window.clearTimeout(id);
    };
}
//# sourceMappingURL=Bootstrap.js.map