Mnr.init();

let binds = {
    selectTest: [],
    inputTest: "",
    selectImg:[],
    dateTest: "",
    scrolled: false,
    ready: false,
};

Mnr.onLoad(binds,function(){
      
      
      this.e('#pageLoader')
      .child('.glare')
      .wait(200)
      .class('expand',false)
      .class('contract')
      .run(()=>{this.u.screenToTop(0,'instant');})
      .initial()
      .wait(400)
      .child('.moon')
      .class('load3')
      .wait(300)
      .initial()
      .class('load')
      .wait(100)
      .class('mnrHide')
      .run(()=>{
        this.e('.moonHolder .moon')
        .class('ready')
        .child('.glare')
        .wait(900)
        .class('ready')
        .initial()
        .child('.textHolder')
        .wait(500)
        .class('ready')
        .wait(500)
        .class('anim16',false)
        .class('anim5')
        .initial()
        .run(()=>{
          this.b.ready = true;
        })
        
      })


      
});



  
Mnr.onScroll(function(){
   if(window.pageYOffset > 0 && this.b.scrolled == false){
     this.b.scrolled = true;
     this.e('html').class('scrolled');
   }
   else if(window.pageYOffset <= 30){
     this.b.scrolled = false;

     this.e('html').class('scrolled',0);
   }

   console.log(window.pageYOffset);

   if(this.b.ready === true){
    if(window.pageYOffset <= 50){
      this.e('.moonHolder .moon').css({top:0,opacity:1});
      this.e('.moonHolder .circle').css({opacity:1,top:0});

      this.e('.moonHolder .glare').css({opacity:1}).class('noShine',false);
      this.e('.moonHolder .textHolder').css({opacity:1,bottom:0});

    }
    else if(window.pageYOffset > 50){
      let scroll = window.pageYOffset;
      let opacVal = this.u.mapValue(scroll,0.0,500.0,0.0,1.0);
      opacVal = 1.0 - ((opacVal > 1) ? 1 : opacVal);
      opacVal = (opacVal > 0.90) ? 1 : opacVal;
      
      if(window.pageYOffset > 0){
        this.e('.moonHolder .moon').css({top:(window.pageYOffset*0.20)+'px'});
        this.e('.moonHolder .textHolder').css({bottom:(window.pageYOffset*0.20)+'px'});
      }
      if(window.pageYOffset > 50){
        this.e('.moonHolder .textHolder').css({opacity:0});
      }
      if(window.pageYOffset > 100){
        this.e('.moonHolder .glare').class('noShine');
      }
      if(window.pageYOffset > 200){
        this.e('.moonHolder .glare').css({opacity:opacVal});
        this.e('.moonHolder .circle').css({opacity:opacVal});
      }
      
    }
    
   }

});


const waitTest = function(el){
   Mnr.e(el)
   .css({
    left: 'calc(100% - 50px)',
    'background-color': 'var(--mnr-colorError)',
   })
   .wait(500)
   .css({top: 'calc(100% - 50px)'})
   .wait(500)
   .css({left:0})
   .wait(500)
   .css({top:0,'background-color': 'var(--mnr-colorOk)'});
};