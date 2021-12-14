
Mnr.init({
  binds:{
    
  },
  loadEnter: function(){
    Mnr.e('#pageLoader').class('load',false);
  },
  loadEnd: function(){
    Mnr.e('#pageLoader .glare').class('expand',false).class('contract');
    Mnr.e('#pageLoader .glare').class('expand',false).class('contract');

    Mnr.e('#pageLoader .moon').wait(400).class('load3');

    Mnr.e('#pageLoader').wait(700).class('load');

    Mnr.e('#pageLoader').wait(1000).class('hide');


    if(typeof WOW === "function"){
      new WOW().init();
    }
  },
  loadEndTime: 500,
});

