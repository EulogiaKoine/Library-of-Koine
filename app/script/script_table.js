'use strict';
module.exports = (function(){
const schema = Meta.read('script/script_schema');
const db = DB.getContent('script/text');

const discordings = [];
function float(schema, dir, result, prefix){
    let i;
    for(let key in schema){
        if(dir.has(key)){
            i = schema[key];

            if(typeof i === 'object'){
                let content = dir.getContent(key);

                if(content.isDirectory){
                    float(i, content, result, prefix + key + '/');
                } else {
                    discordings.push(prefix + key);
                }
            } else {
                const script = {
                    id: prefix + key,
                    def: i,
                    text: dir.read(key)
                };

                result[script.id] = script;
            }
        } else {
            discordings.push(prefix + key);
        }
    }
    return result;
}

const table = float(schema, db, {}, '');
if(discordings.length > 0){
    throw new Error('Script - table loading_ there are scripts those are not according to the schema;'
    + discordings.join('\n').map(v => '   ' + v));
}

const Script = {
    table: table,

    get: (function(path){
        return this[path];
    }).bind(table),

    read: (function(path){
        if(path in this){
            return this[path].text;
        }

        throw new ReferenceError("Script.read_ cannot read the script '" + path + "', it doesn't exists");
    }).bind(table),

    list: (function(path){
        const result = {};
        Object.defineProperty(result, 'toArray', {
            value: (function(){
                const arr = [];

                for(let i in this){
                    arr.push(Object.assign(
                        {name: i},
                        this[i]
                        ));
                }

                return arr;
            }).bind(result),
            enumerable: true
        });
    
        for(let i in this){
            if(i.startsWith(path)){
                result[i.replace(path + '/', '')] = this[i];
            }
        }

        return result;
    }).bind(table)
};

return Script;
})();