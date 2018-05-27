const maxLines = 4;

const scrollback = document.querySelector(".scrollback");
const input = document.querySelector("input");



function renderText() {
  scrollback.innerHTML = state.output.join("\n");
  scrollback.scrollTop = Math.pow(2, 30); // Firefox doesn't like Number.MAX_SAFE_INTEGER for this
}

function print(text, raw = false) {
  state.output.push(raw ? text : escapeHtml(text));
  while (state.output.length > maxLines || state.output[0] == "\n") {
    state.output.shift();
  }
  renderText();
}

function showInventory() {
  if (state.inventory.length != 0) {
    print(capitalize(state.inventory.join(", ") + "."));
  } else {
    print("Рюкзак пока пуст.");
  }
}

function action(text) {
  print("<kbd>" + escapeHtml(text) + "</kbd>", true);
  // see inventory
  if ((text === "р" || text === "рюкзак") && state.locations[1] != "init") {
    showInventory();
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
  if (
    !validAction.requiredItems.every(item => state.inventory.includes(item))
  ) {
    print("Чего-то не хватает!");
    return;
  }

  takeAction(validAction);
  if (validAction.reaction && validAction.reaction.length != 0) {
    print(validAction.reaction);
  }

  print("\n");
  if (validAction.type == "move") {
    print(state.location.initText);
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

init();
