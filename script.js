const scrollback = document.querySelector(".scrollback");
const input = document.querySelector("input");

function renderText() {
  scrollback.innerHTML = state.output.join("\n");
  scrollback.scrollTop = Math.pow(2, 30); // Firefox doesn't like Number.MAX_SAFE_INTEGER for this
}

function showInventory() {
  if (state.inventory.length != 0) {
    addToOutput(capitalize(state.inventory.join(", ") + "."));
  } else {
    addToOutput("Рюкзак пока пуст.");
  }
}

function action(text) {
  addToOutput("<kbd>" + escapeHtml(text) + "</kbd>", true);
  let skip = false;
  // see inventory
  if ((text === "р" || text === "рюкзак") && state.locations[1].backpack !== false) {
    showInventory();
    skip = true;
  }

  let validActions = findAction(text);
  console.log("found valid actions", validActions);
  const validAction = validActions[0];

  if (!skip && !validActions | (validActions.length != 1)) {
    addToOutput("Не факт, что это выйдет.");
    skip = true;
  }

  if (
    !skip &&
    !validAction.requiredItems.every(item => state.inventory.includes(item))
  ) {
    addToOutput("Чего-то не хватает!");
    skip = true;
  }

  if (!skip) {
    takeAction(validAction);
    if (validAction.reaction && validAction.reaction.length != 0) {
      addToOutput(validAction.reaction);
    }

    addToOutput("\n");
    if (validAction.type == "move") {
      addToOutput(state.location.initText);
    }
  }

  renderState();
  saveState();
  return;
}

function init() {
  input.addEventListener("keydown", function(e) {
    const text = input.value.trim();

    if (e.keyCode === 13 && text) {
      action(text);
      reportInput(text);
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
