'use strict'
module.exports = function(root){
    importClass(java.nio.file.Paths);
    root = Paths.get(root);

    const manager = {
        root: root,

        getRoot: (function(){
            return root;
        }).bind(manager),

        get: (function(path){
            return root.resolve(path);
        }).bind(manager),

        getString: (function(path){
            return root.resolve(path).toString();
        }).bind(manager),

        require: (function(path){
            if(path.endsWith('.js')){
                return require(root.resolve(path).toString());
            } else {
                return require(root.resolve(path).toString() + '.js');
            }
        }).bind(manager),

        read: (function(path){
            return FileStream.read(root.resolve(path));
        }),

        readJson: (function(path){
            if(path.endsWith('.json')){
                return JSON.parse(FileStream.read(root.resolve(path)));
            } else {
                return JSON.parse(FileStream.read(root.resolve(path + '.json')));
            }
        }).bind(manager),

        writeJson: (function(path, content, indent){
            if(path.endsWith('.json')){
                return FileStream.write(root.resolve(path), JSON.stringify(content, null, indent));
            } else {
                return FileStream.write(root.resolve(path + '.json'), JSON.stringify(content, null, indent));
            }
        })
    };

    return manager;
};