const maxLines = 4;

const scrollback = document.querySelector(".scrollback");
const input = document.querySelector("input");

function print(text, raw = false) {
  state.output.push(raw ? text : escapeHtml(text));
  while (state.output.length > maxLines) {
    state.output.shift();
  }
  scrollback.innerHTML = state.output.join("\n");
  scrollback.scrollTop = Math.pow(2, 30); // Firefox doesn't like Number.MAX_SAFE_INTEGER for this
}

function action(text) {
  print("\n<kbd>" + escapeHtml(text) + "</kbd>", true);
  // see inventory
  if ((text === "р" || text === "рюкзак") && state.locations[1] != "init") {
    if (state.inventory.length != 0) {
      print(state.inventory.join(", ") + ".");
    } else {
      print("Рюкзак пока пуст.");
    }
    return;
  }
  
  let validActions = findAction(text);
  //   handle mistakee
  if (!validActions | (validActions.length != 1)) {
    print("Не факт, что это выйдет.");
    return;
  }

  console.log("found valid actions", validActions);
  const validAction = validActions[0];
  if (!validAction.requiredItems.every(item => state.inventory.includes(item))) {
    print('Чего-то не хватает!')
    return;
  }

  takeAction(validAction);
  if (validAction.reaction && validAction.reaction.length != 0) {
    print(validAction.reaction);
  }

  renderState();

  return;
}

function init() {
  input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13 /* return */ && input.value.trim()) {
      action(input.value.trim());
      input.value = "";
    }
  });

  var alwaysFocusedInput = document.getElementById("input_command");

  alwaysFocusedInput.addEventListener("blur", function() {
    setTimeout(() => {
      alwaysFocusedInput.focus();
    }, 0);
  });

  renderState(state);
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

init();
