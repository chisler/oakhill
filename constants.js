const actions = {
  start: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    name: "start",
    reaction: "",
    mutateLocationState: {},
    triggers: { agree: ["ок", "да"] }
  },
  leaveHotel: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 2,
    name: "leaveHotel",
    reaction: "",
    mutateLocationState: {},
    triggers: { door: ["двер", "улиц"], open: ["выйт", "откр"] }
  },
  takeBackpack: {
    type: "take",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    name: "takeBackpack",
    reaction: "Ммм...теперь у меня есть рюкзак. \n Можно проверить его командой «р» или «рюкзак»",
    mutateLocationState: { 1: { backpack: true } },
    triggers: {
      take: ["взят", "возь", "подн"],
      backpack: ["рюкз", "портф", "ранец"]
    }
  },
  takeKlaxon: {
    type: "take",
    newItems: ["клаксон"],
    requiredItems: [],
    destination_id: 1,
    name: "takeKlaxon",
    reaction: "НОВЫЙ ПРЕДМЕТ — клаксон.",
    mutateLocationState: { 1: { klaxon: true } },
    triggers: {
      search: ["откр", "обыск", "посм", "смотр", "загл"],
      cupboard: ["тумб", "комод", "шкаф", "ящик", "под теле"]
    }
  },
  watchTV: {
    type: "use",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    name: "watchTV",
    reaction: "Телек не работает",
    mutateLocationState: {},
    triggers: {
      turnOn: ["смотр", "вкл", "вруб"],
      tv: ["теле", "тиви", "тв"]
    }
  },
  takeTwenty: {
    type: "take",
    newItems: ["двадцатка"],
    requiredItems: [],
    destination_id: 2,
    name: "takeTwenty",
    reaction: "НОВЫЙ ПРЕДМЕТ — двадцатка.",
    mutateLocationState: { 2: { money: true } },
    triggers: {
      take: ["вз", "подн", "возьми"],
      twenty: ["ден", "двадц", "купюр", "банкнот"]
    }
  },
  backToHotel: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    reaction: "",
    name: "backToHotel",
    mutateLocationState: {},
    triggers: { go: ["откр", "вой", "зай"], hotel: ["отел", "двер"] }
  },
  goToDeer: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 3,
    reaction: "",
    name: "goToDeer",
    mutateLocationState: {},
    triggers: { go: ["ид"], further: ["дорог", "впер"] }
  },
  backToHotelView: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 2,
    reaction: "",
    name: "backToHotelView",
    mutateLocationState: {},
    triggers: { go: ["верн", "отель"] }
  },
  toOutsideSmartMartFromDeer: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 4,
    reaction: "",
    name: "toOutsideSmartMartFromDeer",
    mutateLocationState: {},
    triggers: { shop: ["впер", "ид"] }
  },
  toSmartMartFromRoad: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 5,
    reaction: "",
    name: "toSmartMartFromRoad",
    mutateLocationState: {},
    triggers: { shop: ["смарт", "магаз"] }
  },
  useTwenty: {
    type: "use",
    newItems: [],
    requiredItems: ["двадцатка"],
    destination_id: 3,
    name: "useTwenty",
    reaction: "Ура, теперь можно пройти.",
    mutateLocationState: { 3: { deer: true } },
    triggers: {
      return: ["отд", "верн", "держ", "дат"],
      money: ["ден", "двадц", "купюр", "банкнот"]
    }
  },
  goBack: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: null,
    name: "goBack",
    mutateLocationState: {},
    triggers: {
      return: ["назад"]
    }
  },
  searchTrash: {
    type: "use",
    newItems: [],
    requiredItems: [],
    destination_id: 4,
    name: "searchTrash",
    reaction: "Там кто-то есть.",
    mutateLocationState: { 4: { trash: true } },
    triggers: {
      open: ["откр", "обыск", "смотр"],
      trash: ["бач", "бак", "мусор", "корз"]
    }
  }
};

function goBack() {
  return { ...actions.goBack, destination_id: state.previous_location };
}

const locations = {
  0: {
    initialState: {},
    mapper: state => {
      return "intro";
    },
    staticActions: [actions.start],
    variations: {
      intro: {
        img: "0_intro.jpg",
        initText: "Чтобы начать, наберите «ок».",
        possibleActions: []
      }
    }
  },
  1: {
    initialState: { klaxon: false, backpack: false },
    mapper: state => {
      return no(state.backpack) + "backpack_" + no(state.klaxon) + "klaxon";
    },
    staticActions: [actions.leaveHotel, actions.watchTV],
    variations: {
      backpack_klaxon: {
        img: "motel_room_backpack.png",
        initText: "Папы нет уже очень долго.",
        possibleActions: [actions.takeBackpack, actions.takeKlaxon]
      },
      no_backpack_klaxon: {
        img: "motel_room_no_backpack.png",
        initText: "",
        possibleActions: [actions.takeKlaxon]
      },
      backpack_no_klaxon: {
        img: "motel_room_backpack_open_stand.png",
        initText: "Ура, мне точно пригодится клаксон.",
        possibleActions: [actions.takeBackpack]
      },
      no_backpack_no_klaxon: {
        img: "motel_room_no_backpack_open_stand.png",
        initText: "Что-то классное ждет меня",
        possibleActions: []
      }
    }
  },
  2: {
    initialState: { money: false },
    mapper: state => {
      return "hotel_view_" + no(state.money) + "money";
    },
    staticActions: [actions.backToHotel, actions.goToDeer],
    variations: {
      hotel_view_money: {
        img: "motel_money.png",
        initText: "Впереди город, на дороге лежит двадцатка.",
        possibleActions: [actions.takeTwenty]
      },
      hotel_view_no_money: {
        img: "motel_no_money.png",
        initText: "Оак Хилл — прямо по дороге...",
        possibleActions: []
      }
    }
  },
  3: {
    initialState: { deer: false },
    mapper: state => {
      return "deer_" + no(state.deer) + "block";
    },
    staticActions: [
      actions.backToHotelView,
      actions.toOutsideSmartMartFromDeer
    ],
    variations: {
      deer_block: {
        img: "town_entrance_deer.png",
        initText: "Слушай, приятель, может, видел мою купюру? Хотел купить рубашку.",
        possibleActions: [actions.useTwenty]
      },
      deer_no_block: {
        img: "town_entrance_no_deer.png",
        initText: "Фуууух, ушел. Можно идти",
        possibleActions: []
      }
    }
  },
  4: {
    initialState: { trash: false },
    mapper: state => {
      return "outside_smart_mart_" + no(state.trash) + "trash";
    },
    staticActions: [actions.backToHotelView, actions.toSmartMartFromRoad],
    variations: {
      outside_smart_mart_trash: {
        img: "outside_smart_mart.png",
        initText: "Перекресток: банк, развлечения, магазин...",
        possibleActions: [actions.searchTrash]
      },
      outside_smart_mart_no_trash: {
        img: "outside_smart_mart_imp.png",
        initText: "АААА, это же черт!",
        possibleActions: []
      }
    }
  },
  5: {
    initialState: {},
    mapper: state => {
      return "smart_mart";
    },
    staticActions: [actions.backToHotelView],
    variations: {
      smart_mart: {
        dialog: "smart_mart",
        img: "smart_mart.png",
        initText: "Привет! Как помочь?",
        possibleActions: []
      }
    }
  }
};
