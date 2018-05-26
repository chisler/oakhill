function values(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
}

Array.prototype.unique = function() {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

function no(boo) {
  return boo ? "no_" : "";
}
