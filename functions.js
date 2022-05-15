Mnr.init();
Mnr.onLoad(null,function(){
      console.log('run main');
      this.e('#pageLoader')
      .child('.glare')
      .wait(200)
      .class('expand',false)
      .class('contract')
      .initial()
      .wait(400)
      .child('.moon')
      .class('load3')
      .wait(300)
      .initial()
      .class('load')
      .run(()=>{
        if(typeof WOW === "function"){
          new WOW().init();
        }
      })
      .wait(300)
      .class('mnrHide')
      .html(' ')
});


