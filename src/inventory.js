function showInventory() {
  if (state.inventory.length != 0) {
    addToOutput(capitalize(state.inventory.join(", ") + "."));
  } else {
    addToOutput("Рюкзак пока пуст.");
  }
}

function inventoryHas(item) {
  return state.inventory.includes(item);
}

function useItem(item) {
  var index = state.inventory.indexOf(item);
  if (index > -1) {
    state.inventory.splice(index, 1);
    return true
  }
  return false
}

function giveItem(item) {
  state.inventory.push(item);
}
