var ut = function(array){
  this.array = array;
}
ut.prototype.max = function(){  
  var a = this.array.sort();
  return a[a.length-1];
};
ut.prototype.min = function(){  
  var a = this.array.sort();
  return a[0];
};
ut.prototype.unique = function(){  
  return this.array.filter(function(v, i, a) { 
                      return a.lastIndexOf(v) === i; })
                    .sort();
};
 
module.exports = exports = ut;
