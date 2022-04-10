const script_table = {
    get: function(){
        return {
            id: 1,
            text: 'test'
        };
    }
};

function Page(script){
    script = script_table.get(script);

    if(script === undefined){
        throw new ReferenceError("Page_ there is no script '" + script + "'");
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


page = new Page('test');
console.log(page.script_table);
console.log(page.getScript());
console.log(page.getId());
console.log(page.read());