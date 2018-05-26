const actions = {
  start: {
    id: 0,
    type: "move",
    newItems: [],
    destination_id: 1,
    name: "start",
    reaction: "",
    mutateLocation: {},
    triggers: { agree: ["ок", "да"] }
  },
  leaveHotel: {
    id: 1,
    type: "move",
    newItems: [],
    destination_id: 2,
    name: "leaveHotel",
    reaction: "",
    mutateLocation: {},
    triggers: { door: ["двер", "улиц"], open: ["выйт", "откр"] }
  },
  takeBackpack: {
    id: 2,
    type: "move",
    newItems: [],
    destination_id: 1,
    name: "takeBackpack",
    reaction: "О, теперь будет куда положить вещи",
    mutateLocation: { 1: "no_back_pack" },
    triggers: {
      take: ["взят", "возь", "подн"],
      backpack: ["рюкз", "портф", "ранец"]
    }
  },
  watchTV: {
    id: 5,
    type: "use",
    newItems: [],
    destination_id: 1,
    name: "watchTV",
    reaction: "Телек не работает",
    mutateLocation: {},
    triggers: {
      turnOn: ["смотр", "вкл", "вруб"],
      tv: ["теле", "тиви", "тв"]
    }
  },
  takeTwenty: {
    id: 3,
    type: "move",
    newItems: ["двадцатка"],
    destination_id: 2,
    name: "takeTwenty",
    reaction: "Вау, можно столько всего купить",
    mutateLocation: { 2: "hotel_view_no_money" },
    triggers: { take: ["вз", "подн"], twenty: ["ден", "двадц"] }
  },
  backToHotel: {
    id: 4,
    type: "move",
    newItems: [],
    destination_id: 1,
    reaction: "",
    name: "backToHotel",
    mutateLocation: {},
    triggers: { go: ["назад", "откр", "вой", "зай"], hotel: ["отел", "двер"] }
  }
};

const locations = {
  0: {
    intro: {
      img: "0_intro.jpg",
      initText: "Ок?",
      possibleActions: [actions.start]
    }
  },
  1: {
    init: {
      img: "1_with_backpack.jpg",
      initText: "Папы нет уже очень долго.",
      possibleActions: [
        actions.leaveHotel,
        actions.watchTV,
        actions.takeBackpack
      ]
    },
    no_back_pack: {
      img: "1.jpg",
      initText: "Ммм...теперь у меня есть рюкзак. <i>Можно проверить его командой «р» или «рюкзак»</i>",
      possibleActions: [actions.leaveHotel, actions.watchTV]
    }
  },
  2: {
    hotel_view: {
      img: "2.jpg",
      initText: "Впереди город, на дороге лежит двадцатка.",
      possibleActions: [actions.takeTwenty, actions.backToHotel]
    },
    hotel_view_no_money: {
      img: "2_no_money.jpg",
      initText: "Оак Хилл — прямо по дороге...",
      possibleActions: [actions.backToHotel]
    }
  }
};
