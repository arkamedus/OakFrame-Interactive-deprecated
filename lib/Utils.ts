export class Utils {
    public static replaceAll(str, find, replace, ignorecase) {
        var flags = (ignorecase === true) ? 'gi' : 'g';
        var reg = new RegExp(find, flags);

        return str.replace(reg, replace);
    }

    public static getProps(obj){
        let props=[];
        for(var propt in obj){
            props.push(propt);
        }
        return props;
    }
}