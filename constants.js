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
    triggers: { go: ["назад", "верн", "отель"] }
  },
  useKlaxon: {
    type: "use",
    newItems: ["двадцатка"],
    requiredItems: ["клаксон"],
    destination_id: 3,
    name: "useKlaxon",
    reaction: "",
    mutateLocationState: { 3: { deer: true } },
    triggers: {
      rang: ["дуд", "польз", "дут"],
      klaxon: ["клакс", "дудк", "горн"]
    }
  }
};

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
        initText: "Ок?",
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
    staticActions: [actions.backToHotelView],
    variations: {
      deer_block: {
        img: "town_entrance_deer.png",
        initText: "Кажется, олень не даст пройти просто так. \n Я боюсь.",
        possibleActions: [actions.useKlaxon]
      },
      deer_no_block: {
        img: "town_entrance_no_deer.png",
        initText: "Фуууух, ушел. Можно идти",
        possibleActions: []
      }
    }
  }
};
