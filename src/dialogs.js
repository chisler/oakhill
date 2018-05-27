function processDialog(
  { dialog, requirements, currentOptions, optionNames },
  text
) {
  const chosenTransitions = dialog
    .transitions()
    .filter(tran => currentOptions[tran] === text);
  if (chosenTransitions.length != 1) {
    console.log("SHOULD BE JUST 1 possible transition");
    return false;
  }
  const transition = chosenTransitions[0];
  // make transition
  if (requirements[transition]()) {
    dialog[transition]();
  } else {
    addToOutput("Не получится...");
  }
  const alphabet = ["а", "б", "в"];
  dialog.transitions().forEach((t, i) => {
    currentOptions[t] = alphabet[i];
    addToOutput(`${currentOptions[t]}) — ${optionNames[t]}`);
  });
  return true;
}

const dialogs = {
  smart_mart: createSmartMartDialog
};
