loadState();

function cleanState() {
  return { ...state, dialog: null };
}

function saveState() {
  // don't log dialogs
  localStorage.setItem("state", JSON.stringify(cleanState()));
}

function updateGameId() {
  $.ajax({
    type: "GET",
    url: backendURI + "game/",
    async: true,
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", "Negotiate");
    },
    success: function(r) {
      state.gameId = r.id;
      saveState();
    }
  });
}

function resetState() {
  // localStorage.clear();
  state = {
    output: [],
    inventory: [],
    location_id: 0,
    dialog: null,
    previous_location: 0
  };
  state.locations = values(locations).map(l => l.initialState);
  state.location = getCurrentLocation(state.location_id);
  addToOutput(state.location.initText);
  updateGameId();
}

function loadState() {
  console.log("load state");
  let savedState = localStorage.getItem("state");
  if (savedState) {
    state = JSON.parse(savedState);
    initDialog();
  } else {
    resetState();
  }
}

function addToOutput(text, raw = false, maxLines = 5) {
  state.output.push(raw ? text : escapeHtml(text));
  while (state.output.length > maxLines || state.output[0] == "\n") {
    state.output.shift();
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
  const {
    destination_id,
    type,
    newItems,
    mutateLocationState,
    requiredItems
  } = action;
  console.log("Action taken", action);

  requiredItems.forEach(i => useItem(i));
  state.inventory = [...action.newItems, ...state.inventory].unique();
  
  Object.keys(mutateLocationState).forEach(key => {
    state.locations[key] = {
      ...state.locations[key],
      ...mutateLocationState[key]
    };
  });
  state.location = getCurrentLocation(destination_id) || state.location;
  // dont update if hasn't changed
  if (destination_id != state.location_id) {
    state.previous_location = state.location_id;
  }
  state.location_id = destination_id || state.location_id;

  state.dialog = null;
  if (type == "move" || type == "talk") {
    state.output = [];
    // debugger
    // recreate dialog if we moved to a new location
    initDialog();
  }
  console.log("new state", state);
}

function initDialog() {
  if (state.location.dialog) {
    const dialog = dialogs[state.location.dialog]();
    state.dialog = dialog;
  }
}

function renderState() {
  console.log("IMAGE RENDERED");
  renderText();
  document.getElementById("image_id").src = "img/" + state.location.img;
}
