const commonTriggers = {
  talk: ["привет", "говор", "здрав", "хей", "поговор"]
};

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
    triggers: { door: ["двер", "улиц", "номер"], open: ["выйт", "откр", "ид"] }
  },
  takeBackpack: {
    type: "use",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    reaction: "Твой рюкзак может пригодиться. \n Чтобы посмотреть, что в нём лежит, набери «р».",
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
    reaction: "Телек не работает.",
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
      twenty: ["ден", "двадц", "купюр", "банкнот", "моне"]
    }
  },
  backToHotel: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 1,
    reaction: "",
    mutateLocationState: {},
    triggers: { go: ["откр", "вой", "зай", "ид"], hotel: ["мотел", "отел", "двер", "номер"] }
  },
  goToDeer: {
    type: "move",
    newItems: [],
    requiredItems: [],
    destination_id: 3,
    reaction: "",
    mutateLocationState: {},
    triggers: { go: ["ид", "пойт"], further: ["дорог", "впер", "город", "оак хилл"] }
  },
  talkToDeer: {
    type: "talk",
    newItems: [],
    requiredItems: [],
    destination_id: 3,
    reaction: "",
    mutateLocationState: { 3: { deer_talking: true } },
    triggers: { hey: commonTriggers.talk }
  },
  useTwenty: {
    type: "use",
    newItems: [],
    requiredItems: ["двадцатка"],
    destination_id: 3,
    reaction: "Спасибо!",
    mutateLocationState: { 3: { deer: true } },
    triggers: {
      return: ["отд", "верн", "держ", "дат"],
      money: ["ден", "двадц", "купюр", "банкнот", "монет"]
    }
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
    triggers: { go: ["верн", "перекрест", "выйт", "магаз"] }
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
    triggers: { bank: ["банк", "налево"] }
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
    type: "use",
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
  talkToImp: {
    type: "talk",
    newItems: [],
    requiredItems: [],
    destination_id: 4,
    reaction: "",
    mutateLocationState: { 4: { talk: true } },
    triggers: {
      talk: commonTriggers.talk
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
    reaction: "Пришелец взорвался!",
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
      arcade: ["аркад", "игров", "автом", "направ"]
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
    initialState: { deer: false, deer_talking: false },
    mapper: state => {
      if (!state.deer && !state.deer_talking) {
        return "deer_block";
      }
      if (!state.deer && state.deer_talking) {
        return "deer_talk";
      }
      return "deer_no_block";
    },
    staticActions: [actions.backToHotelView],
    variations: {
      deer_block: {
        img: "town_entrance_deer.png",
        initText: "На дороге стоит олень.",
        possibleActions: [actions.talkToDeer]
      },
      deer_talk: {
        img: "town_entrance_deer.png",
        initText: "Привет. Не обращай внимания, я просто ищу тут свою двадцатку. \n Она была у меня в руках, а потом... \n Ты случайно не видела её?",
        possibleActions: [actions.useTwenty]
      },
      deer_no_block: {
        img: "town_entrance_no_deer.png",
        initText: "Олень ушел.",
        possibleActions: [actions.toOutsideSmartMartFromDeer]
      }
    }
  },
  4: {
    initialState: { trash: false, talk: false },
    mapper: state => {
      return (
        "outside_smart_mart_" +
        no(state.trash) +
        "trash" +
        (state.talk ? "_talk" : "")
      );
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
        initText: "Магазин работает круглосуточно. Налево – банк, направо – игровой зал. \n Из мусорного бака доносятся странные звуки...",
        possibleActions: [actions.searchTrash]
      },
      outside_smart_mart_no_trash: {
        img: "outside_smart_mart_imp.png",
        initText: "Ха!",
        possibleActions: [actions.talkToImp]
      },
      outside_smart_mart_no_trash_talk: {
        dialog: "imp",
        img: "outside_smart_mart_imp.png",
        initText: "Привет! Есть сигарета? За сигарету скажу, где взять деньги. За зажигалку..кое-что покруче.",
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
