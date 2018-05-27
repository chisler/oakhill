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

function capitalize(str) {
  return str.replace(/((?:^|[.?!])\s*)([a-zа-яё])/g, function(m, tail, ch) {
    return tail + ch.toUpperCase();
  });
}

const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s]);
}

var backendURI = "https://shielded-chamber-22105.herokuapp.com/";

function reportInput(text) {
  $.post(backendURI + "save/", {
    state: JSON.stringify(state),
    textInput: text,
    gameId: state.gameId
  });
}
