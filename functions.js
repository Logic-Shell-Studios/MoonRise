
Mnr.init({
  binds:{
    
  },
  run: {
    loadEnd: function(){
      Mnr.e('#pageLoader .glare').class('expand',false).class('contract');
      Mnr.e('#pageLoader .glare').class('expand',false).class('contract');

      Mnr.e('#pageLoader .moon').class('load3');

      Mnr.e('#pageLoader').class('load');

      Mnr.e('#pageLoader').class('hide');

      setTimeout(()=>{
        if(typeof WOW === "function"){
          new WOW().init();
        }
      },500);
      
    },
  }
});

