'use strict';
module.exports = (function(){
const script_table = require('./script_table.js');

function Page(id){
    const script = script_table.get(id);

    if(script === undefined){
        throw new ReferenceError("Page_ there is no script id '" + id + "'");
    }

    this.script = script;
};

Page.script_table = script_table;

Page.prototype.getScript = function(){
    return this.script;
};

Page.prototype.getId = function(){
    return this.script.id;
}

Page.prototype.read = function(){
    return this.script.text;
};

return Page;
})();