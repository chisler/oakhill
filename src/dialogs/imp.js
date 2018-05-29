function createImpDialog() {
  var dialog = new StateMachine({
    init: "init",
    transitions: [
      { name: "giveCigarette", from: "init", to: "cigarette" },
      { name: "giveLighter", from: "init", to: "lighter" },
      { name: "giveLighter", from: "cigarette", to: "lighter" },

      { name: "goodbuy", from: "init", to: "end" },
      { name: "goodbuy", from: "cigarette", to: "end" },
      { name: "goodbuy", from: "lighter", to: "end" },
    ],
    methods: {
      onGiveCigarette: function() {
        useItem("сигарета");        
        addToOutput("Тут недалеко банкомат — введи мой код 1111, получишь денег.");        
      },
      onGiveLighter: function() {
        useItem("зажигалка");        
        giveItem("бластер")
        addToOutput("Ооо, ха-ха, вот тебе бластер! \n НОВЫЙ ПРЕДМЕТ — бластер.");       
      },
      onGoodbuy: function() {
        addToOutput("Чего с тобой разговаривать...");
      }
    }
  });

  const optionNames = {
    giveCigarette: "Дать сигарету.",
    giveLighter: "Дать зажигалку.",
    goodbuy: "До свидания."
  };

  const always = () => {
    return true;
  };

  const requirements = {
    giveCigarette: () => {
      return inventoryHas("сигарета");
    },
    giveLighter: () => {
      return inventoryHas("зажигалка");;
    },
    goodbuy: always
  };

  return {
    dialog: dialog,
    requirements: requirements,
    currentOptions: {},
    optionNames
  };
}