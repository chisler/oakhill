var state = {};
resetState();

function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}

function resetState() {
  // localStorage.clear();
  state = {
    output: [],
    inventory: [],
    location_id: 0
  };
  state.locations = values(locations).map(l => l.initialState);
  state.location = getCurrentLocation(state.location_id);
}

function loadState() {
  let savedState = localStorage.getItem("state");
  if (savedState) {
    state = JSON.parse(savedState);
    renderState();
  }
}

function textMatches(textInput, validTriggers) {
  return values(validTriggers).every(grams =>
    grams.some(gram => textInput.includes(gram))
  );
}

function findAction(textInput) {
  let staticActions = locations[state.location_id].staticActions;
  var possibleActions = state.location.possibleActions;

  let matches = possibleActions.filter(action =>
    textMatches(textInput, action.triggers)
  );
  if (matches.length != 0) {
    return matches;
  }
  return staticActions.filter(action =>
    textMatches(textInput, action.triggers)
  );
}

function getCurrentLocation(id) {
  let location = locations[id];
  if (!location) {
    return;
  }
  const locationStateName = location.mapper(state.locations[id]);
  return locations[id].variations[locationStateName];
}

function takeAction(action) {
  const { destination_id, type, newItems, mutateLocationState, requiredItems } = action;
  console.log("Action taken", action);
  // debugger

  state.inventory = [...action.newItems, ...state.inventory].unique();
  Object.keys(mutateLocationState).forEach(key => {
    state.locations[key] = {
      ...state.locations[key],
      ...mutateLocationState[key]
    };
  });
  state.location = getCurrentLocation(destination_id) || state.location;
  state.location_id = destination_id || state.location_id;
  console.log("new state", state);
  saveState();
}

function renderState() {
  print(state.location.initText);
  document.getElementById("image_id").src = 'img/' + state.location.img;
}
