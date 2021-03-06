function createSmartMartDialog() {
  var shopDialog = new StateMachine({
    init: "init",
    transitions: [
      { name: "askAboutFather", from: "init", to: "father" },
      { name: "askAboutGoods", from: "father", to: "trade" },
      { name: "askAboutGoods", from: "init", to: "trade" },
      { name: "buyLighter", from: "trade", to: "lighter" },
      { name: "buyToy", from: "trade", to: "toy" },

      { name: "goodbuy", from: "init", to: "end" },
      { name: "goodbuy", from: "father", to: "end" },
      { name: "goodbuy", from: "trade", to: "end" },
    ],
    methods: {
      onAskAboutFather: function() {
        addToOutput(
          "Мужчина заходил час назад, кудрявый и в очках. \n Искал какого-то мальчика..."
        );
      },
      onAskAboutGoods: function() {
        addToOutput(
          "У меня есть сигареты и пиво, но тебе нельзя."
        );
      },
      onBuyLighter: function() {
        addToOutput("НОВЫЙ ПРЕДМЕТ — зажигалка.");
        useItem("доллар");
        giveItem("зажигалка");
      },
      onBuyToy: function() {
        console.log("don't lie you don't have money");
      },
      onGoodbuy: function() {
        addToOutput("Пора выйти из мазазина.");
      }
    }
  });

  const optionNames = {
    askAboutFather: "Видели моего папу?",
    askAboutGoods: "Что можно купить?",
    buyLighter: "«Зажигалка» — $1.",
    buyToy: "Игрушка «Капитан Динозавр» — $5.",
    goodbuy: "До свидания."
  };

  const always = () => {
    return true;
  };

  const requirements = {
    askAboutFather: always,
    askAboutGoods: always,
    buyLighter: () => {
      return inventoryHas("доллар");
    },
    buyToy: () => {
      return false;
    },
    goodbuy: always
  };

  return {
    dialog: shopDialog,
    requirements: requirements,
    currentOptions: {},
    optionNames
  };
}