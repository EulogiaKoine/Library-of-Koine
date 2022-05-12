'use strict';

module.exports = (function(){

/**
 * @abstract
 */
function HashMap(){
    this.map = {};
}

HashMap.prototype.hash = function(k){
    return k;
};

HashMap.prototype.setHash = function(hash){
    this.hash = hash;
};

HashMap.prototype.set = function(key, value){
    this.map[this.hash(key)] = value;
};

HashMap.prototype.add = function(key, value){
    key = this.hash(key);

    if(key in this.map){
        this.map.push(key);
    } else {
        this.map[key] = [value];
    }
};

MashMap.prototype.get = function(key){
    return this.map[this.hash(key)];
}
})();