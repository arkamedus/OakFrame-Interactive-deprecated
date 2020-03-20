var glob = require('glob');
var entryArray = glob.sync('./src/*.js');
var entryObject = entryArray.reduce((acc, item) => {
    let name = item.replace('./src/', '');
    name = name.replace('.js', '');
    acc[name] = item;
    return acc;
}, {});

module.exports = {
    entry: entryObject,
    output: {
        path: __dirname + "/dist/",
        libraryTarget: "var",
        filename: 'bin.[name].js'
    },
    target: "web"
};