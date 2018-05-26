const actions = {
  start: {
    type: "move",
    newItems: [],
    destination_id: 1,
    name: "start",
    reaction: "",
    mutateLocationState: {},
    triggers: { agree: ["ок", "да"] }
  },
  leaveHotel: {
    type: "move",
    newItems: [],
    destination_id: 2,
    name: "leaveHotel",
    reaction: "",
    mutateLocationState: {},
    triggers: { door: ["двер", "улиц"], open: ["выйт", "откр"] }
  },
  takeBackpack: {
    type: "take",
    newItems: [],
    destination_id: 1,
    name: "takeBackpack",
    reaction: "О, теперь будет куда положить вещи",
    mutateLocationState: { 1: { backpack: true } },
    triggers: {
      take: ["взят", "возь", "подн"],
      backpack: ["рюкз", "портф", "ранец"]
    }
  },
  takeKlaxon: {
    type: "take",
    newItems: ["клаксон"],
    destination_id: 1,
    name: "takeKlaxon",
    reaction: "Теперь у меня есть клаксон.",
    mutateLocationState: { 1: { klaxon: true } },
    triggers: {
      search: ["откр", "обыск", "посм", "смотр", "загл"],
      cupboard: ["тумб", "комод", "шкаф", "ящик", "под теле"]
    }
  },
  watchTV: {
    type: "use",
    newItems: [],
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
    destination_id: 2,
    name: "takeTwenty",
    reaction: "Вау, можно столько всего купить",
<<<<<<< HEAD
    mutateLocationState: { 2: { money: true } },
    triggers: { take: ["вз", "подн"], twenty: ["ден", "двадц", "банкн"] }
=======
    mutateLocation: { 2: "hotel_view_no_money" },
    triggers: { take: ["вз", "подн","возьми"], twenty: ["ден", "двадц","купюр","банкнот"] }

>>>>>>> 5350adfc119614c30c5ed97b4575325bd4459b79
  },
  backToHotel: {
    type: "move",
    newItems: [],
    destination_id: 1,
    reaction: "",
    name: "backToHotel",
    mutateLocationState: {},
    triggers: { go: ["назад", "откр", "вой", "зай"], hotel: ["отел", "двер"] }
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
        img: "1_backpack_klaxon.jpg",
        initText: "Папы нет уже очень долго.",
        possibleActions: [actions.takeBackpack, actions.takeKlaxon]
      },
      no_backpack_klaxon: {
        img: "1_no_backpack_klaxon.jpg",
        initText: "Ммм...теперь у меня есть рюкзак. \n Можно проверить его командой «р» или «рюкзак»",
        possibleActions: [actions.takeKlaxon]
      },
      backpack_no_klaxon: {
        img: "1_backpack_no_klaxon.jpg",
        initText: "Ура, мне точно пригодится клаксон.",
        possibleActions: [actions.takeBackpack]
      },
      no_backpack_no_klaxon: {
        img: "1_no_backpack_no_klaxon.jpg",
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
    staticActions: [actions.backToHotel],
    variations: {
      hotel_view_money: {
        img: "2.jpg",
        initText: "Впереди город, на дороге лежит двадцатка.",
        possibleActions: [actions.takeTwenty]
      },
      hotel_view_no_money: {
        img: "2_no_money.jpg",
        initText: "Оак Хилл — прямо по дороге...",
        possibleActions: []
      }
    }
  }
};
