const actions = {
  start: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    reaction: "",
    mutateLocationState: {},
    triggers: { agree: ["ок", "да"] }
  },
  leaveHotel: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 2,
    reaction: "",
    mutateLocationState: {},
    triggers: { door: ["двер", "улиц"], open: ["выйт", "откр"] }
  },
  takeBackpack: {
    type: "take",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    reaction:
      "Ммм...теперь у меня есть рюкзак. \n Можно проверить его командой «р» или «рюкзак»",
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
    mutateLocationState: {},
    triggers: { go: ["откр", "вой", "зай"], hotel: ["отел", "двер"] }
  },
  goToDeer: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 3,
    reaction: "",
    mutateLocationState: {},
    triggers: { go: ["ид"], further: ["дорог", "впер"] }
  },
  backToHotelView: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 2,
    reaction: "",
    mutateLocationState: {},
    triggers: { go: ["верн", "отель"] }
  },
  backToOutsideSmartMart: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 4,
    reaction: "",
    mutateLocationState: {},
    triggers: { go: ["верн", "перекрест"] }
  },
  toOutsideSmartMartFromDeer: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 4,
    reaction: "",
    mutateLocationState: {},
    triggers: { shop: ["впер", "ид"] }
  },
  toSmartMartFromRoad: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 5,
    reaction: "",
    mutateLocationState: {},
    triggers: { shop: ["смарт", "магаз"] }
  },
  toBank: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 6,
    reaction: "",
    mutateLocationState: {},
    triggers: { bank: ["банк"] }
  },
  useTwenty: {
    type: "use",
    newItems: [],
    requiredItems: ["двадцатка"],
    destination_id: 3,
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
    mutateLocationState: {},
    triggers: {
      return: ["назад"]
    }
  },
  searchTrash: {
    type: "talk",
    newItems: [],
    requiredItems: [],
    destination_id: 4,
    reaction: "",
    mutateLocationState: { 4: { trash: true } },
    triggers: {
      open: ["откр", "обыск", "смотр"],
      trash: ["бач", "бак", "мусор", "корз"]
    }
  },
  askForCigarette: {
    type: "take",
    newItems: ["сигарета"],
    requiredItems: [],
    destination_id: 6,
    reaction: "НОВЫЙ ПРЕДМЕТ — сигарета.",
    mutateLocationState: {},
    triggers: {
      ask: ["спрос", "стрель", "попро"],
      trash: ["таба", "сиж", "дым", "сиг"]
    }
  },
  goToAtm: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 7,
    reaction: "",
    mutateLocationState: {},
    triggers: {
      come: ["подой", "идт", "иди", "сня"],
      atm: ["ден", "кэш", "налич", "банком", "атм", "atm"]
    }
  },
  breakATM: {
    type: "take",
    newItems: ["доллар"],
    requiredItems: [],
    destination_id: 7,
    reaction: "НОВЫЙ ПРЕДМЕТ — доллар.",
    mutateLocationState: { 7: { atm: true } },
    triggers: {
      code: ["1111"]
    }
  },
  killAlien: {
    type: "use",
    newItems: [],
    requiredItems: ["бластер"],
    destination_id: 8,
    reaction: "Ура, пришелец повержен!",
    mutateLocationState: { 8: { alien: true } },
    triggers: {
      shoot: ["стрел", "убит", "замоч", "пуль", "испол"],
      blaster: ["бласт", "пистолет", "оруж"]
    }
  },
  goToArcade: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 8,
    reaction: "",
    mutateLocationState: {},
    triggers: {
      arcade: ["аркад", "игров", "автом"]
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
    ],
    variations: {
      deer_block: {
        img: "town_entrance_deer.png",
        initText:
          "Слушай, приятель, может, видел мою купюру? Хотел купить рубашку. \n Отдай монету, а не то я рассержусь.",
        possibleActions: [actions.useTwenty]
      },
      deer_no_block: {
        img: "town_entrance_no_deer.png",
        initText: "Фуууух, ушел. Можно идти",
        possibleActions: [actions.toOutsideSmartMartFromDeer]
      }
    }
  },
  4: {
    initialState: { trash: false },
    mapper: state => {
      return "outside_smart_mart_" + no(state.trash) + "trash";
    },
    staticActions: [
      actions.backToHotelView,
      actions.toSmartMartFromRoad,
      actions.toBank,
      actions.goToArcade
    ],
    variations: {
      outside_smart_mart_trash: {
        img: "outside_smart_mart.png",
        initText: "Перекресток: банк, развлечения, магазин...",
        possibleActions: [actions.searchTrash]
      },
      outside_smart_mart_no_trash: {
        dialog: "imp",
        img: "outside_smart_mart_imp.png",
        initText: "Привет! Есть сигарета? За сигарету скажу, где взять деньги. \n За зажигалку..кое-что покруче.",
        possibleActions: []
      }
    }
  },
  5: {
    initialState: {},
    mapper: state => {
      return "smart_mart";
    },
    staticActions: [actions.backToOutsideSmartMart],
    variations: {
      smart_mart: {
        dialog: "smart_mart",
        img: "smart_mart.png",
        initText: "Привет! Как помочь?",
        possibleActions: []
      }
    }
  },
  6: {
    initialState: {},
    mapper: state => {
      return "bank";
    },
    staticActions: [
      actions.backToOutsideSmartMart,
      actions.askForCigarette,
      actions.goToAtm
    ],
    variations: {
      bank: {
        // dialog: "smart_mart",
        img: "bank.png",
        initText: "Довольно тоскливое место.",
        possibleActions: []
      }
    }
  },
  7: {
    initialState: { atm: false },
    mapper: state => {
      return "atm_" + no(state.atm) + "working";
    },
    staticActions: [actions.backToOutsideSmartMart],
    variations: {
      atm_working: {
        img: "atm.png",
        initText: "Пожалуйста, вставьте карту или введите секретный код.",
        possibleActions: [actions.breakATM]
      },
      atm_no_working: {
        img: "atm_broken.png",
        initText: "Кэш машина сломалась...",
        possibleActions: []
      }
    }
  },
  8: {
    initialState: { alien: false },
    mapper: state => {
      return "arcade_" + no(state.alien) + "alien";
    },
    staticActions: [actions.backToOutsideSmartMart],
    variations: {
      arcade_alien: {
        img: "arcade_alien.JPG",
        initText: "Похоже, вход охраняет пришелец",
        possibleActions: [actions.killAlien]
      },
      arcade_no_alien: {
        img: "arcade_no_alien.JPG",
        initText: "Ура, можно играть!",
        possibleActions: []
      }
    }
  }
};
