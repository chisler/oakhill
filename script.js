const scrollback = document.querySelector(".scrollback");
const input = document.querySelector("input");

function renderText() {
  scrollback.innerHTML = state.output.join("\n");
  scrollback.scrollTop = Math.pow(2, 30); // Firefox doesn't like Number.MAX_SAFE_INTEGER for this
}

function clearOutput() {
  state.output = [];
  renderText();
}

function act(text) {
  const weHaveABackpack = state.locations[1].backpack !== false;

  if (
    (text === "р" || text === "рюкзак") &&
    weHaveABackpack
  ) {
    showInventory();
    return;
  }
  // check for current dialog
  if (state.dialog) {
    // transition was made, action taken;
    if (processDialog(state.dialog, text)) {
      return;
    }
  }

  if (text === "назад") {
    takeAction(goBack());
    addToOutput(state.location.initText);
  } else {
    let validActions = findAction(text);
    if (!validActions | (validActions.length != 1)) {
      addToOutput("Не факт, что это выйдет.");
      if (state.dialog) {
        fillOptions(state.dialog);
      }
      return;
    }
    const validAction = validActions[0];

    if (
      !validAction.requiredItems.every(item => state.inventory.includes(item))
    ) {
      addToOutput("Чего-то не хватает!");
      return;
    }

    if (validAction.type == "take" && !weHaveABackpack) {
      addToOutput("Новый предмет не во что убрать.");
      return;
    }

    takeAction(validAction);
    if (validAction.reaction && validAction.reaction.length != 0) {
      addToOutput(validAction.reaction);
    }

    // addToOutput("\n");
    if (validAction.type == "move" || validAction.type == "talk") {
      addToOutput(state.location.initText);
    }
  }

  if (state.location.dialog && state.dialog.dialog.is("init")) {
    // should have been added already
    fillOptions(state.dialog);
  }
}

function action(text) {
  clearOutput();
  addToOutput("<kbd>" + escapeHtml(text) + "</kbd>", true);
  act(text.toLowerCase());

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
