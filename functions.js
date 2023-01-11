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
      let loader = this.e('#pageLoader');
      let moon = this.e('.moonHolder .moon');

      let setMoon = ()=>{
        this.u.wait(()=>{
           moon.addClass('ready')
        },0)
        .wait(()=>{
           moon.child('.glare')
               .addClass('ready')
               .initial()
        },900)
        .wait(()=>{
          moon.child('.textHolder')
              .addClass('ready')
        },500)
        .wait(()=>{
          moon.removeClass('trans16')
              .addClass('trans5')
          this.b.ready = true;
        },500)
      }
      
      

      this.u.wait(()=>{
        loader.child('.glare')
              .removeClass('expand')
              .addClass('contract')
              .initial()
      },200)
      .wait(()=>{
        loader.child('.moon')
              .addClass('load3')
              .initial();  
      },400)
      .wait(()=>{
        loader.addClass('load')  
      },300)
      .wait(()=>{
        loader.css('{display:none}')  
        setMoon();
      },100)

      
});



  
Mnr.onScroll(function(){
   let scroll = window.pageYOffset;
   if(scroll > 0 && this.b.scrolled == false){
     this.b.scrolled = true;
     this.e('html').addClass('scrolled');
   }
   else if(scroll <= 30){
     this.b.scrolled = false;

     this.e('html').removeClass('scrolled');
   }
   
   if(Mnr.b.ready || Mnr.b.scrolled){
    if(scroll <= 70){
      this.e('.moonHolder .moon').css({translate:'0 0',opacity:1});
      this.e('.moonHolder .circle').css({opacity:1,translate:'0 0'});
      this.e('.moonHolder .textHolder').css({opacity:1,translate:'0 0'});
      
      this.e('.moonHolder .glare').css({opacity:1});
      this.e('.moonHolder .circle').css({opacity:1});
    }
    else if(scroll > 70){
      let opacVal = this.u.mapValue(scroll,0,500,0,0.9,true);
      opacVal = 1.0 - ((opacVal > 1) ? 1 : opacVal);
      opacVal = (opacVal > 0.90) ? 1 : opacVal;
      
      
      let top = `0 ${scroll*0.20}px`;
      let bottom = `0 -${scroll*0.50}px`;

      if(scroll*0.20 < Mnr.b.windowHeight){
        this.e('.moonHolder .moon').css({translate:top});
      }
      this.e('.moonHolder .textHolder').css({translate:bottom});
     
      this.e('.moonHolder .textHolder').css({opacity:0});
      
      if(scroll > 200){
        this.e('.moonHolder .glare').css({opacity:opacVal});
        this.e('.moonHolder .circle').css({opacity:opacVal});
      }
      
    }
  }

});


const waitTest = function(el){
   let parent = Mnr.e(el).parent().size();
   let box = Mnr.e(el).size();
   let moveX = `${parent.width - box.width}px`;
   let moveY = `${parent.height - box.height}px`;
   
   let elem = Mnr.e(el);

   Mnr.u.wait(()=>{
     elem.css({
       translate: `${moveX} 0`,
       'background-color': 'var(--mnr-colorError)',
     })
   },0)
   .wait(()=>{
     elem.css({translate: `${moveX} ${moveY}`})
   },500)
   .wait(()=>{
     elem.css({translate: `0 ${moveY}`})
   },500)
   .wait(()=>{
     elem.css({translate: `0 0`,'background-color': 'var(--mnr-colorOk)'});
   },500)
};