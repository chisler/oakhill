var shopDialog = new StateMachine({
    init: 'greeting',
    transitions: [
      { name: 'askAboutFather',from: 'greeting',  to: 'father' },
      { name: 'askAboutGoods',from: 'father',  to: 'trade' },
      { name: 'askAboutGoods', from: 'greeting', to: 'trade'  },
      { name: 'buyLighter', from: 'trade', to: 'lighter' },
      { name: 'buyToy', from: 'trade',    to: 'toy' },
      { name: 'goodbuy', from: '*',    to: 'greeting' }
    ],
    methods: {
      onAskAboutFather:     function() { console.log('NEVER SEEN HIM. Want to see the trades?')    },
      onAskAboutGoods:   function() { console.log('OH, THESE ARE MY TRADES')     },
      onBuyLighter: function() { console.log('CHECK FOR lighter money') },
      onBuyToy: function() { console.log('CHECK for money') }
    }
  });

text = ""

switch text {
  case "торговать"
}