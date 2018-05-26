function textMatches(textInput, validTriggers) {
  return values(validTriggers).every(grams =>
    grams.some(gram => textInput.includes(gram))
  );
}

function findAction(textInput) {
  console.log("current state", state);
  return state.location.possibleActions.filter(action =>
    textMatches(textInput, action.triggers)
  );
}

function getCurrentLocation(id) {
  let location = locations[id];
  if (!location) {
    return;
  }
  return locations[id][state.locations[id]];
}

function takeAction(action) {
  const { destination_id, type, newItems } = action;
  console.log("Action taken", action);
  state = {
    ...state,
    inventory: [...action.newItems, ...state.inventory].unique(),
    locations: { ...state.locations, ...action.mutateLocation }
  };
  (state.location =
    getCurrentLocation(destination_id) || state.location), console.log(
    "new state",
    state
  );
  if (action.reaction & (action.reaction.length != 0)) {
    print(reaction);
  }
}

function renderState() {
  document.getElementById("image_id").src = state.location.img;
}

var state = {
  output: [],
  inventory: [],
  locations: { 1: "init", 2: "hotel_view" }
};
state.location = getCurrentLocation(1);
