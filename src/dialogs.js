function fillOptions({ dialog, requirements, currentOptions, optionNames }) {
  const alphabet = ["а", "б", "в", "г", "д"];

  dialog.transitions().forEach((t, i) => {
    currentOptions[t] = alphabet[i];
    addToOutput(`${currentOptions[t]}) — ${optionNames[t]}`);
  });
}

function processDialog(dialogWrapper, text) {
  const { dialog, requirements, currentOptions, optionNames } = dialogWrapper;

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
  fillOptions(dialogWrapper);
  return true;
}

const dialogs = {
  smart_mart: createSmartMartDialog,
  imp: createImpDialog
};
