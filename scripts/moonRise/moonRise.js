// MoonRise Engine Version 3.0

const Mnr = (function(){
  
  return {
    ////////////////////variables
    root: '.',
    running: false,
    swipers: [],
    binders: [],
    currentBody: null,
    currentTitle: null,
    imgList: {dones:0,iter:0,elems:[]},
    loadEnterTime: 100,
    loadEndTime: 100,
    elemsEvents: [],
    scrollOld: 0,
    timeAddStatus: null,
    scrollImgOffset: 500,
    componentsHTML:[],
    componentsCount:0,
    classBinds: [],
    imgBinds: [],
    tagBinds: [],
    mainStyle: [],
    stylesLoades: 4,
    b: {},
    pageLoading: true,
    initialBinds: {
      savingStatus: 0,
      pageLoading: true,
      clickedText: '',
      searchWord: '',
      scrolled: false,
      windowWidth: 0,
      windowHeight: 0,
      assetsUrl: '/assets/',
    },

    start:null,


    pageLoader: {
      start:function(){
        if(document.getElementById('pageLoader')){
          document.getElementById('pageLoader').classList.remove('load');
        }
      },
      end:function(){
        if(document.getElementById('pageLoader')){
          document.getElementById('pageLoader').classList.add('load');
        }
      },
    },

    run:{},
    loadRun:[],
    
    init: function(options = {}) {
      // this.start = performance.now();
      if(this.running){
        return;
      }
      this.running = true;
      
      try {
        this.e('html').attr('mnr-page-loading',true);
        this.e('html').class('Mnr');
      }
      catch(err) {
        console.error('<html> tag not found: '+err);
        return;
      }


      // set options
      if(options['run'] != null){
        this.run = options['run'];
      }
      if(options['binds'] != null){
        this.b = options['binds'];
      }
      let temps = Object.entries(this.initialBinds);
      for (let temp of temps) {
        this.b[temp[0]] = temp[1];    
      }
    
      if(options['loadEnter'] != null){
        this.pageLoader.start = options['loadEnter'];
      }
      if(options['loadEnd'] != null){
        this.pageLoader.end = options['loadEnd'];
      }
      if(options['loadEnterTime'] != null){
        this.loadEnterTime = options['loadEnterTime'];
      }
      if(options['loadEndTime'] != null){
        this.loadEndTime = options['loadEndTime'];
      }

      // get root if exist
      if(document.getElementById('mnr-mainRoot')){
        this.root = document.getElementById('mnr-mainRoot').value;
      }

      

      this.addEvent('scroll',window,()=>{ this.handleScroll() });
      this.addEvent('resize',window,()=>{ this.handleResize() });
      
      this.insertComponents();
      this.loadThird();
      

      window.addEventListener('load', ()=>{ 
        this.getLinks();
        this.loadReady();
      }); 
    },
    loadReady: function(){
      if(this.mainStyle.length == this.stylesLoades){
        this.loadLinks();
        this.finishLoad();
        // console.log('ready');
        return;
      }
      setTimeout(()=>{
        this.loadReady();
        // console.log('checking '+this.stylesLoades);
      },100);
    },
    finishLoad: function(){
      setTimeout(()=>{
        this.loadHrefs();
      },10);

      // manage media loading
      this.loadMedia();


      if(this.pageLoading == true){
        console.log('MOONRISE V3 running');


        this.handleScroll();
        this.handleResize();
       
        this.bindAll();
        this.setForms();
        
        this.runLoads();


        //run functions after finish load once
        Object.values(this.run).map(value => {
          if(typeof value === 'string' && this.hasOwnProperty(value)){
             this[value].init(this);
          }
          else if(typeof value === 'function') {
            value.call();
          }
        });

        // run page load functions animation
        this.pageLoader.end();
        // set page load false and run wow
        this.b.pageLoading = false;
        this.pageLoading = false;
        this.e('html').attr('mnr-page-loading',false);

        setTimeout(()=>{
          
          if(typeof WOW === "function"){
            new WOW().init();
          }
          
          // console.log(performance.now() - this.start);
        },this.loadEndTime);
      }
    },
    reload: function(){
      return;
      this.pageLoader.start();

      this.b.pageLoading = true;
      this.pageLoading = true;
      this.e('html').attr('mnr-page-loading',true);

      this.finishLoad();
    },


    load: function(binds = null, funct = null){
      if(binds != null){
        this.setBinds(binds);
      }
      if(typeof funct === 'function'){
        this.loadRun.push(funct);
        if(this.pageLoading == false){
          this.runLoads();
        }
      }
    },
    runLoads: function(){
      for(let funct of this.loadRun){
        funct();
      }
      this.loadRun = {};
    },
    
    loadThird: function(){
      let script = document.createElement('script');
      script.src = this.root+"/scripts/swiper/swiper.js";
      document.head.insertBefore(script, Mnr.e("head meta").e[0]);

      script = document.createElement('script');
      script.src = this.root+"/scripts/wow/dist/wow.min.js";
      document.head.insertBefore(script, Mnr.e("head meta").e[0]);

      script = document.createElement('script');
      script.src = this.root+"/scripts/svg-inject/svg-inject.min.js";
      document.head.insertBefore(script, Mnr.e("head meta").e[0]);
      
      
      let link = document.createElement('link');
      this.e(link).attr('mnr-href', this.root+"/scripts/animate.css/animate.min.css");
      link.rel = "stylesheet";
      document.head.insertBefore(link, Mnr.e("head meta").e[0]);

      link = document.createElement('link');
      this.e(link).attr('mnr-href', this.root+"/scripts/swiper/swiper.css");
      link.rel = "stylesheet";
      document.head.insertBefore(link, Mnr.e("head meta").e[0]);
    },
    getLinks: function(){
      Mnr.fetchGetText(this.root+'/scripts/moonRise/moonRiseClassesMain.js', (response)=>{
        this.mainStyle.push(response);
      });

      Mnr.fetchGetText(this.root+'/scripts/moonRise/moonRiseClassesContainers.js', (response)=>{
        this.mainStyle.push(response);
      });

      Mnr.fetchGetText(this.root+'/scripts/moonRise/moonRiseClassesSpaces.js', (response)=>{
        this.mainStyle.push(response);
      });

      Mnr.fetchGetText(this.root+'/scripts/moonRise/moonRiseClassesAnims.js', (response)=>{
        this.mainStyle.push(response);
      });
    },
    loadLinks: function(){
       let style = document.createElement('style');
       this.e(style).attr('mnr-main-css',true);
       document.head.insertBefore(style, Mnr.e("head meta").e[0]);
       
       for(let style of this.mainStyle){
         this.e('[mnr-main-css]').e[0].innerHTML += eval(style);
       }
       this.mainStyle = [];
    },
    
    
    ///////////////////////////////////////////////binders
    bindAll: function(){

      for (let bind of Object.keys(this.b) ) {
        for(let el of document.querySelectorAll('[mnr-bind="'+bind+'"]') ){
          if(el.getAttribute('mnr-bind') != 'set'){  
            //binds property to events
            let attr = 'innerText';
            let event = null;
            let value = this.b[bind];
            let type = 'text';
            switch(el.nodeName){
               case "INPUT":
                 attr = 'value';
                 event = 'keyup';
               break;
               case "TEXTAREA":
                 attr = 'value';
                 event = 'keyup';
               break;
               case "SELECT":
                 attr = 'value';
                 event = 'change';
               break;
            }
            if(el.nodeName == 'INPUT' || 
              el.nodeName == 'SELECT' || 
              el.nodeName == 'TEXTAREA'){
              if(this.parseBool(el.getAttribute('mnr-bind-set')) == true){
                if(el.nodeName == 'SELECT' && el.hasAttribute('multiple')){
                  let options = el.querySelectorAll("option[selected]");
                  let selected = Array.from(options).map(elm => elm.value);
                  this.b[bind] = selected;
                }
                else{
                  this.b[bind] = el.value;
                }
              }
            }

            
            if(el.hasAttribute('mnr-bind-attr')){
              attr = el.getAttribute('mnr-bind-attr');
            }
            if(el.hasAttribute('mnr-bind-event')){
              event = el.getAttribute('mnr-bind-event');
            }

            if(el.nodeName == 'SELECT' && el.hasAttribute('multiple')){
               type = 'multiple';
            }
            else if(el.nodeName == 'INPUT'){
              if(el.type == 'date'){
               type = 'date';
               event = 'change';
              }
            }


            if(el.nodeName == 'INPUT' || 
              el.nodeName == 'SELECT' || 
              el.nodeName == 'TEXTAREA'){
               el.value = this.b[bind];
            }
            else{
               el.innerText = this.b[bind];
            }

            if(el.nodeName == 'SELECT' && el.hasAttribute('multiple')){
              this.addEvent(event,el, e => {
                  let options = el.querySelectorAll("option:checked");
                  let selected = Array.from(options).map(elm => elm.value);
                  this.b[bind] = selected;
              });
            }
            else{
              this.addEvent(event,el, e => {
                  this.b[bind] = el.value;
              });
            }

            
              
            // generate binder
            let elData = {
              el: el,
              attr: attr,
              event: event,
              type: type,
            };
            if(this.hasKey(this.binders, bind)){
              el.setAttribute('mnr-bind','set');

              if(this.findPosByProp('el',el,this.binders[bind].elems) === false){
                this.binders[bind].elems.push(elData);
              }
            }
            else{
              this.binders[bind] = {elems:[elData],bind:bind};
            }
          }    
        }
        this.Bind(bind);
        
      }
      
      this.setBindClasses();
      this.setBindImgs();
      this.setBindTags();
      
      
      
      this.runAllBinds();
      // console.log(this.b);
      // console.log(this.binders);
    },
    Bind: function(prop){
        let value = this.b[prop];
        Object.defineProperty(this.b, prop, {
            set: (newValue) => {
                value = newValue;
                // console.log("set: "+prop+ " "+ newValue);
                // Set elements to new value
                if(this.hasKey(this.binders, prop)){
                  for (let elem of this.binders[prop].elems) {
                    if(elem.type == 'multiple'){
                      for(let opt of elem.el.querySelectorAll("option")){
                        opt.removeAttribute('selected');
                      }
                      for(let val of newValue){
                        let opt = elem.el.querySelector("option[value='"+val+"']");
                        if(opt){
                         opt.setAttribute('selected',true);
                         opt.checked = true;
                        }
                      }
                    }
                    else{
                      elem.el[elem.attr] = newValue;
                    }
                  }
                }
                
                if(this.parseBool(this.pageLoading) == false){
                  this.runAllBindsSingle(prop);
                }
            },
            get: () => {
                return value;
            },
        });
        this.b[prop] = value;
    },
    runAllBinds(){
      this.runBindMaxText(true);
      this.runBindImgs(true);
      this.runBindPrints(true);
      this.runBindClasses(true);
      this.runBindTags(true);
    },
    runAllBindsSingle(bind){
      this.runBindMaxText();
      this.runSingleBindImgs(bind);
      this.runBindPrints();
      this.runBindClasses();
      this.runBindTags();
    },

    setBindClasses: function(){
     // classes binds
      for (let elem of document.querySelectorAll('[mnr-class]')) {
        if(!elem.hasAttribute('mnr-class-set')){
          let attr = elem.getAttribute('mnr-class');
          // let allConds = Object.entries(JSON.parse(attr));
          let binds = Object.keys(this.b);
          binds = binds.sort((a,b) => b.length - a.length);
          for(let bind of binds){
            if(attr.indexOf(bind) !== -1 && attr.indexOf('Mnr.b.'+bind) === -1){
               attr = attr.replaceAll(bind,'Mnr.b.'+bind);
            }
          }


          elem.setAttribute('mnr-class', attr);
          elem.setAttribute('mnr-class-set', true);
        }
      }
    },
    runBindClasses: function(force = false){
      if(this.parseBool(this.pageLoading) == false || force == true){
        
        for (let elem of document.querySelectorAll('[mnr-class]')){
          let allConds = Object.entries(JSON.parse(elem.getAttribute('mnr-class')));
          for (var j = allConds.length - 1; j >= 0; j--) {
          
             let temp = allConds[j];
             if(temp[1].indexOf('mnr-') !== -1){
                 let attrs = elem.getAttributeNames();
                 attrs = attrs.sort((a,b) => b.length - a.length);
                 for(let attr of attrs){
                   if(temp[1].indexOf(attr) !== -1){
                      // console.log(attr+' '+elem.getAttribute(attr));
                      temp[1] = temp[1].replaceAll(attr,elem.getAttribute(attr));
                   }
                 }
             }

             // console.log(temp);
             // console.log(eval(temp[1]));
             try{
               if(eval(temp[1]) == true){
                 elem.classList.add(temp[0]);
               }
               else{
                 elem.classList.remove(temp[0]);
               }
             }
             catch{
               console.warn('The evaluation '+temp[1]+' of '+elem.outerHTML+' failed');
             }
          }
        }

        // console.log(document.querySelectorAll('[mnr-class][mnr-for-clone]'));
      }
    },
    
    runBindPrints: function(force = true){
      //print binds
      if(this.parseBool(this.pageLoading) == false || force == true){
        for (let elem of document.querySelectorAll('[mnr-print]')) {
          if(elem.nodeName == 'INPUT' || 
            elem.nodeName == 'SELECT' || 
            elem.nodeName == 'TEXTAREA'){
            elem.value = elem.getAttribute(elem.getAttribute('mnr-print'));
          }
          else{
            elem.innerText = elem.getAttribute(elem.getAttribute('mnr-print'));
          }
        }
      }
    },
    runBindMaxText: function(force = true){
      if(this.parseBool(this.pageLoading) == false || force == true){
        for (let elem of document.querySelectorAll('[mnr-max-text]')) {
          let max = elem.getAttribute('mnr-max-text');
          if(elem.nodeName == 'INPUT' ||  
            elem.nodeName == 'TEXTAREA'){
            let val = elem.value;
            let size = (val != null) ? val.length : 0;
            elem.value = this.cutText(val,max);
          }
          else{
            let val = elem.innerText;
            let size = (val != null) ? val.length : 0;
            elem.innerText = this.cutText(val,max);
          }
        }
      }
    },
    
    setBindImgs: function(){
      //image binds
      for (let elem of document.querySelectorAll('[mnr-bind-src]')) {
        let bind = elem.getAttribute('mnr-bind-src');
        if(bind != 'set'){
          elem.setAttribute('mnr-bind-src','set');
          if(this.hasKey(this.imgBinds, bind)){
            if(this.imgBinds[bind].elems.includes(elem) == false){
              this.imgBinds[bind].elems.push(elem);
            }
          }
          else{
              this.imgBinds[bind] = {elems:[elem]};
          }
        }
      }
    },
    runBindImgs: function(force = false){
      if(this.parseBool(this.pageLoading) == false || force == true){
        for (let bind of Object.keys(this.imgBinds) ) {
          this.iterateImgBinds(bind);
        }
      }   
    },
    runSingleBindImgs: function(bind){
      if(this.parseBool(this.pageLoading) == false && this.hasKey(this.imgBinds,bind)){
        this.iterateImgBinds(bind);
      }   
    },
    iterateImgBinds:function(bind){
       for (let i = this.imgBinds[bind].elems.length - 1; i >= 0; i--) {
        let elem = this.imgBinds[bind].elems[i];

        elem.src = null;
        if(this.b[bind] != null){
            elem.src = this.b[bind];
        }
       }
    },

    bindPush: function(prop,val){
      if(this.hasKey(this.b,prop)){
        let temp = this.b[prop];
        temp.push(val);
        this.b[prop] = temp;
      }
    },
    setBinds: function(bind){
      if(typeof bind == 'object'){
        let temps = Object.entries(bind);
        for (let temp of temps) {
          this.b[temp[0]] = temp[1];
        }
      }
      if(this.pageLoading == false){
        this.bindAll();
      }
    },
    
    setBindTags: function(){
         for(let el of document.querySelectorAll("mnr")){
           for(let elem of this.tagBinds){
             if(elem.el === el){
               continue;
             }
           }

           let innerText = el.innerText;
           let type = "";
           if(el.hasAttribute("mnr-type")){
             if(el.getAttribute("mnr-type") == "number"){
                type = "+";
             }
             el.removeAttribute("mnr-type");
           }

           innerText = innerText.replaceAll(";","");
           innerText = innerText.replaceAll("script","");
           innerText = innerText.replaceAll("alert(","");
           innerText = innerText.replaceAll(".log(","");
           innerText = innerText.replaceAll(".then","");
           innerText = innerText.replaceAll("try","");

           innerText = innerText.replaceAll("e()","e(el.parentNode)");
           innerText = innerText.replaceAll("e(",type+"Mnr.e(");


           let binds = Object.keys(this.b);
           binds = binds.sort((a,b) => b.length - a.length);
           for(let bind of binds){
             if(innerText.indexOf(bind) !== -1 && innerText.indexOf('Mnr.b.'+bind) === -1){
                innerText = innerText.replaceAll(bind,type+'Mnr.b.'+bind);
             }
           }

           // console.log(innerText);
           // console.log(eval(innerText));
           this.tagBinds.push({ev:innerText,el:el});
           el.innerText = "";
        }
        // console.log(this.tagBinds);
    },
    runBindTags: function(force = false){
       if(this.parseBool(this.pageLoading) == false || force == true){
          
          for(let tag of this.tagBinds){
            let el = tag.el; //delcare for eval;
            try{
              tag.el.innerText = eval(tag.ev);
            }
            catch(error){
              tag.el.innerText = "";
              console.warn("failed to parse <mnr> command "+error);
            }
          }
       }
    },
    
    
    ///////////////////////////////////////////////window handlers
    handleScroll: function(force = false){
      if(window.pageYOffset > 10){
        if(this.b.scrolled == false){
         this.b.scrolled = true;
        }
        this.e('html').class('scrolled');
        
      }
      else if(window.pageYOffset <= 10){
        if(this.b.scrolled){
         this.b.scrolled = false;
        }
        this.e('html').class('scrolled',0);
      }
      
      let change = false;
      if(this.scrollOld > window.pageYOffset+10){
        change = true;
      }
      else if(this.scrollOld < window.pageYOffset-10){
        change = true;
      }
      if(change == true){
        this.scrollOld = window.pageYOffset;
        this.imgLoadScroll();
      }   
    },
    handleResize: function(){
      // console.log('resize');
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
      // if(this.b.windowWidth != width && this.pageLoading == false){
      //   this.loadLayout();
      // }
      this.b.windowWidth = width;
      this.b.windowHeight = height;
    },

    
    ////////////////////////////////////////////media handlers
    loadMedia: function(){
      this.setSliders();

      this.imgIterator();

      this.imgLoadScroll();
      this.loadSvgs();

      this.runTimesMedia();
    },
    imgIterator:  function(){
      let temp = this.e('[mnr-src]').e;
      let type = 'back';
      let tempSrc = '';
      for(let elem of temp){
         tempSrc = this.e(elem).attr('mnr-src');
         type = 'back';
         if(tempSrc != 'set'){
            
            if(elem.nodeName == 'IMG'){
              type = 'img';
              if(this.e(elem).hasAttr('width') == false){
                elem.width = '0';
              }
              if(this.e(elem).hasAttr('height') == false){
                elem.height = '0';
              }
              if(this.e(elem).hasAttr('alt') == false){
                let alt = tempSrc.split('/');
                alt = alt[alt.length-1];
                alt = alt.split('.');
                alt = alt.splice(0,alt.length-2);
                elem.alt = alt;
              }
            }
            this.imgList.elems.push({
              el:elem,
              src:tempSrc,
              set:false,
              type:type,
            });
            this.e(elem).removeAttr("mnr-src");
         }
      }
    },
    runTimesMedia: function(){
      if(this.pageLoading == false){
        if(this.imgList.elems.length <= 0){
          return;
        }
        let checks = [];
        let elem = this.imgList.elems[0];
        if(elem.set == false){
           if(elem.type == 'img'){
             this.addEvent('error',elem.el,()=>{
               this.e(elem.el).class('mnrHide');
               console.warn('image skipped: '+elem.src);
             });
             elem.el.src = this.root+this.b.assetsUrl+elem.src;
           }
           else{
             try{
               this.e(elem.el).css('background-image', 'url('+this.root+this.b.assetsUrl+elem.src+')');
             }
             catch{
               console.warn('background image skipped: '+elem.src);
             }
           }
           elem.set = true;
           this.imgList.elems.splice(0,1);
        }
      }
      setTimeout(()=>{this.runTimesMedia()},300);
    },
    imgLoadScroll: function(){
      if(this.imgList.elems.length <= 0){
        return;  
      }
      let checks = [];
      let i = 0;
      for(elem of this.imgList.elems){
         if(this.isAboveViewport(elem.el,this.scrollImgOffset) && elem.set == false){
            if(elem.type == 'img'){
              this.addEvent('error',elem.el,()=>{
                this.e(elem.el).class('mnrHide');
                console.warn('image skipped: '+elem.src);
              });
              elem.el.src = this.root+this.b.assetsUrl+elem.src;
              checks.push(i);
            }
            else{
              try{
                this.e(elem.el).css('background-image', 'url('+this.root+this.b.assetsUrl+elem.src+')');
              }
              catch{
                console.warn('background image skipped: '+elem.src);
              }
              checks.push(i);
            }
            elem.set = true;
         }
         i++;
      }
      for ( let j = checks.length - 1; j >= 0; j--) {
        this.imgList.elems.splice(checks[j],1);
      }
    },
    setSliders: function(){
      if(typeof Swiper !== 'function'){
        console.warn("Swiper not found");
        return;
      }
      if(this.swipers.length > 0){
        for (let swiper of this.swipers.length) {
          swiper.destroy();
        }
        this.swipers = [];
      }
    
      let temp = document.querySelectorAll('[mnr-slider]');
    
      if(temp.length > 0){
        for (let slider of temp) {
    
          slider.classList.add('swiper-slider');
          
          let prev = null;
          let next = null;
          let pag = null;
          let pagType = null;
          if(slider.querySelector("[mnr-slider-next]")){
            slider.querySelector("[mnr-slider-next]").classList.add('swiper-button-next');
            next = slider.querySelector("[mnr-slider-next]");
          }
          if(slider.querySelector("[mnr-slider-prev]")){
            slider.querySelector("[mnr-slider-prev]").classList.add('swiper-button-prev');
            prev = slider.querySelector("[mnr-slider-prev]");
          }
          if(slider.querySelector("[mnr-slider-pagination]")){
            slider.querySelector("[mnr-slider-pagination]").classList.add('swiper-pagination');
            pag = slider.querySelector("[mnr-slider-pagination]");
            pagType = pag.getAttribute("mnr-slider-pagination");
          }
    
          
          
          if(slider.querySelector(".swiper-wrapper") == null){
             let wrapper = document.createElement("DIV");
             wrapper.classList.add('swiper-wrapper');
             wrapper.innerHTML = slider.innerHTML;
             slider.innerHTML = wrapper.outerHTML;
          }
    
          if(prev != null){
            slider.innerHTML += prev.outerHTML;
          }
          if(next != null){
            slider.innerHTML += next.outerHTML;
          }
          if(pag != null){
            slider.innerHTML += pag.outerHTML;
          }
    
          if(slider.querySelector(".swiper-wrapper [mnr-slider-next]")){
            slider.querySelector(".swiper-wrapper [mnr-slider-next]").remove();
          }
          if(slider.querySelector(".swiper-wrapper [mnr-slider-prev]")){
            slider.querySelector(".swiper-wrapper [mnr-slider-prev]").remove();
          }
          if(slider.querySelector(".swiper-wrapper [mnr-slider-pagination]")){
            slider.querySelector(".swiper-wrapper [mnr-slider-pagination]").remove();
          }
          
          let sliders = slider.querySelectorAll(".swiper-wrapper > *");
          if( sliders.length > 0){
             for (let sliderj of sliders) {
               sliderj.classList.add('swiper-slide');
             }
          }
    
    
          let optionsTemp = Object.entries(JSON.parse(slider.getAttribute('mnr-slider')));

    
          let options = {
            navigation: {
              nextEl: slider.querySelector(".swiper-button-next"),
              prevEl: slider.querySelector(".swiper-button-prev"),
            },
          };
          switch(pagType){
            case "numbers":
              options['pagination'] = {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                  return '<span class="' + className + '">' + (index + 1) + "</span>";
                },
              };
            break;
            default:
              options['pagination'] = {
                el: slider.querySelector(".swiper-pagination"),
                dynamicBullets: true,
                clickable: true,
              }
          }
    
          for (let option of optionsTemp) {
            options[option[0]] = option[1];
          }
          
          if(options['autoplay'] == true){
             options['autoplay'] = {
                delay: 7500,
                disableOnInteraction: false,
             }
          }
          if(options['thumbsId']){
            let thumbs = this.setSliderThumbs(options['thumbsId']);
            if(thumbs != null){
              options['thumbs'] = {
                swiper: thumbs
              }
            }
          }
    
          
          this.swipers.push(new Swiper(slider,options));
    
        }
      }   
    },
    setSliderThumbs: function(id){
      let temp = document.querySelectorAll('[mnr-slider-thumbs]');
    
      for (let option of temp) {
        let optionsTemp = JSON.parse(option.getAttribute('mnr-slider-thumbs'));
        
        if(optionsTemp['id']){
          if(optionsTemp['id'] == id){
             temp = option;
             break;
          }
        }
        
      }
    
      if(temp){
    
          let slider = temp;
    
          slider.classList.add('swiper-slider');
          
          if(slider.querySelector(".next")){
            slider.querySelector(".next").classList.add('swiper-button-next');
          }
          if(slider.querySelector(".prev")){
            slider.querySelector(".prev").classList.add('swiper-button-prev');
          }
          if(slider.querySelector(".pagination")){
            slider.querySelector(".pagination").classList.add('swiper-pagination');
          }
          
          
          if(slider.querySelector(".swiper-wrapper") == null){
             let wrapper = document.createElement("DIV");
             wrapper.classList.add('swiper-wrapper');
             wrapper.innerHTML = slider.innerHTML;
             slider.innerHTML = wrapper.outerHTML;
          }
          
          let sliders = slider.querySelectorAll(".swiper-wrapper > *");
          if( sliders.length > 0){
             for (let sliderj of sliders) {
               sliderj.classList.add('swiper-slide');
               sliderj.classList.add('cursor');
             }
          }
    
    
          let optionsTemp = Object.entries(JSON.parse(slider.getAttribute('mnr-slider-thumbs')));
    
          let options = {
            navigation: {
              nextEl: slider.querySelector(".next"),
              prevEl: slider.querySelector(".prev"),
            },
            pagination: {
              el: slider.querySelector(".pagination"),
              dynamicBullets: true,
              clickable: true,
            }
          };
    
          for (let option of optionsTemp) {
            options[option[0]] = option[1];
          }
          
          if(options['autoplay'] == true){
             options['autoplay'] = {
                delay: 7500,
                disableOnInteraction: false,
             }
          }
          this.swipers.push(new Swiper(slider,options));
          return this.swipers[this.swipers.length-1];
      }   
      return null;
    },
    slideElemTo: function(elemName, pos){
      for (let swiper of this.swipers) {
        let temp = document.createElement("DIV");
        temp.innerHTML = swiper.el.outerHTML;
        
        if(temp.querySelectorAll(elemName).length > 0){
          swiper.slideTo(pos,false,false);
        }
      }
    },
    loadHrefs: function(){
      let hrefs = document.querySelectorAll('[mnr-href]');
      for (let href of hrefs) {
        href.href = href.getAttribute('mnr-href');
        href.removeAttribute('mnr-href');
      }
    },
    loadSvgs: function(){
      if(typeof SVGInject === "function"){
        let svgs = this.e("[mnr-svg]").e;
        for(let svg of svgs){
          svg.src = this.root+this.b.assetsUrl+this.e(svg).attr('mnr-svg');
        }
        SVGInject(svgs);
        for(let svg of svgs){
          this.e(svg).removeAttr('mnr-svg');
        }
      }
    },


    ///////////////////////////////////////////////////////ajax handlers
    setSavingStatus: function(status){
      if(status == 1){ //saving
        this.b.savingStatus = 1;
        this.b.savingNotice = '';
      }
      else{
        this.savingTemp = status;
        setTimeout(()=>{
          this.b.savingStatus = this.savingTemp;
          if(this.b.savingStatus == 2){ //ok
            this.b.savingNotice = '<span class="colorOk">Los cambios se han guardado</span>';
            setTimeout(()=>{
              this.b.savingNotice = '';
            }, 4000);
          }
          else{ //bad
            this.b.savingNotice = '<span class="colorWarn">Hubo un error en el servidor, vuelve a intentarlo</span>';
          }
        }, 500);
        setTimeout(()=>{
          this.b.savingStatus = 0; //ready
        }, 1500);
      }
    },
    insertComponents: function(){
      this.componentsHTML = document.querySelectorAll('mnr-include');
      this.processComponents(this.componentsCount);
    },
    processComponents(){
      if(this.componentsHTML.length <= this.componentsCount){
         this.componentsCount = 0;
         this.componentsHTML = [];
         return;
      }
      if(this.componentsHTML[Mnr.componentsCount].hasAttribute('component')){
        let data = this.componentsHTML[Mnr.componentsCount].getAttribute('component');

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4){
              if (this.status == 200) {
                 Mnr.componentsHTML[Mnr.componentsCount].insertAdjacentHTML('afterend', this.responseText );
              }
              Mnr.componentsHTML[Mnr.componentsCount].remove();
              Mnr.componentsCount++;
              Mnr.processComponents();
            }
        };
        xhttp.open("GET", data, true);
        xhttp.send();
        return;
      }
    },

    fetchGetText: function(url,call = null,callBad = null){
      // data.append('sender', Mnr.binds.userId);
      if(url == null){return;}

      let response = fetch(url, {
        method: 'GET',
      })
      .then((response) => {
        if(!response.ok) {
          return Promise.reject(response);
        }
        return response.text();
      })
      .then(response => {
        if(call != null){
          call(response);
        }
        return response.text;
      })
      .catch((error) =>{
        if(callBad != null){
          callBad(response);
        }
        console.error('Something went wrong.', error);
      });
    },



    //////////////////////////////////////////////////////form handler
    setForms: function(){
       let forms = this.e('[mnr-form]').e;
       for(let form of forms){
         
       }
    },


    //////////////////////////////////////////////////////element handler
    e: function(query, all = true){
      let elem = [];
      let _this = this;
      let singleNode = (function () {
        // make an empty node list to inherit from
        let nodelist = document.createDocumentFragment().childNodes;
        // return a function to create object formed as desired
        return function (node) {
            return Object.create(nodelist, {
                '0': {value: node, enumerable: true},
                'length': {value: 1},
                'item': {
                    "value": function (i) {
                        return this[+i || 0];
                    }, 
                    enumerable: true
                }
            }); // return an object pretending to be a NodeList
        };
      }());
      if(typeof(query) == 'string'){
        elem = (all)? document.querySelectorAll(query) : [document.querySelector(query)];
      }
      else{
        elem = singleNode(query);
      }
      
      
      
      return {
        e: elem,
        class: function(names, add = true){
          let classes = names.trim().split(' ');
          for(let el of elem){
            for(let clss of classes){
              if(add){
                el.classList.add(clss);
              }
              else{
                el.classList.remove(clss);
              }
            }
          }
          return this;
        },
        toggleClass: function(names){
          let classes = names.trim().split(' ');
          for(let el of elem){
            for(let clss of classes){
             el.classList.toggle(clss);
            }
          }
          return this;
        },
        css: function(property = null,value = null){
          let styles = [];
          if(value == null && typeof property !== 'Object'){
            styles = getComputedStyle(elem[0]);
            return (property == null)? styles : styles[property];
          }
          else{
             for(let el of elem){
               
               if(typeof property == 'Object'){
                  for(let style of Object.keys(property) ){
                    el.style[style] = property[style];
                  }
               }
               else{
                 el.style[property] = value;
               }
             }
          }

          return this;
        },
        attr: function(attr,val = null){
          if(val == null){
            return elem[0].getAttribute(attr);
          }
          else{
            for(let el of elem){
              el.setAttribute(attr, val);
            }
          }
          return this;
        },
        html: function(html = null,add = false){
          if(html == null){
            return elem[0].innerHTML;
          }
          for(let el of elem){
            el.innerHTML = (add) ? el.innerHTML+html : html;
          }
          return this;
        },
        text: function(text = null,add = false){
          if(text == null){
            return elem[0].innerText;
          }
          for(let el of elem){
            el.innerText = (add) ? el.innerText+text : text;
          }
          return this;
        },
        value: function(value, add = false){
          if(elem[0].nodeName == "INPUT" || elem[0].nodeName == "TEXTAREA" || elem[0].nodeName == "SELECT"){
            if(value == null){
              return elem[0].value;
            }
            for(let el of elem){
              el.value = (add) ? el.value+value : value;
            }
          }
          else{
            this.text(value,add);
          }
          return this;
        },        
        hide: function(anim = false){
          this.class('mnrHide');
          return this;
        },
        show: function(anim = false){
          this.class('mnrHide',false);
          return this;
        },
        hasAttr: function(names, all = true){
          let attr = names.trim().split(' ');
          let match = 0;
          let compare = 0;
          for(let el of elem){
            for(let at of attr){
              compare ++;
              if(all && el.hasAttribute(at)){
                if(el.hasAttribute(at)){
                  match ++;
                }
              }
              else{
                return el.hasAttribute(at);
                break;
              }
            }
          }
          return (match == compare);
        },
        hasClass: function(names, all = true){
          let classes = names.trim().split(' ');
          let match = 0;
          let compare = 0;
          for(let el of elem){
            for(let clss of classes){
              compare ++;
              if(all){
                if(el.classList.contains(clss)){
                  match ++;
                }
              }
              else{
                return el.classList.contains(clss);
                break;
              }
            }
          }
          return (match == compare);
        },
        removeAttr: function(names, all = true){
          let attr = names.trim().split(' ');
          if(all == false){
            for(let at of attr){
              elem.removeAttribute(at);
            }
          }
          for(let el of elem){
            for(let at of attr){
              el.removeAttribute(at);
            }
          }
          return this;
        },
        parent: function(){
          elem = singleNode(elem[0].parentNode);
          this.e = elem;
          return this;
        },
        screenFocus : function(offset = 0){
           _this.screenTo(elem[0],offset);
           return this;
        },
        inView: function(){

           return _this.isInViewport(elem[0]);
        },
        aboveView: function(){
          
           return _this.isAboveViewport(elem[0]);
        },
        loadBinds: function(){
           _this.runAllBinds();
           return this;
        },

      };
    },
   


    
    //////////////////////////////////////////////////helpers
    hasKey: function(stash,key){
      try{
        return key in stash;
      }
      catch{
        return false;
      }
    },
    getProperties: function(obj){
      if(obj){
        return Object.getOwnPropertyNames(obj);
      }
      return [];
    },
    screenTo: function(elem, offset = 0){
      let scroll = window.pageYOffset;
      // document.querySelector(elem).scrollIntoView({ behavior: 'smooth' });
      
      if(typeof(elem) == 'string'){
        elem = document.querySelector(elem);
      }
      if(elem == null){
        return;
      }
      let bodyRect = this.e('body').e[0].getBoundingClientRect().top;
      let elementRect = elem.getBoundingClientRect().top;
      let elementPosition = elementRect - bodyRect;
      let offsetPosition = elementPosition - offset;
      window.scrollTo({
           top: offsetPosition,
           behavior: "smooth"
      });
    },
    replaceAll: function(str, find, replace) {
    
          return str.replace(new RegExp(find, 'g'), replace);
    },
    mapValue: function(X,A,B,C,D){
          X = parseInt(X);
          A = parseInt(A);
          B = parseInt(B);
          C = parseInt(C);
          D = parseInt(D);
          r =  ((X-A)/(B-A));
          y = ( r * (D-C)) + C;
          return Math.trunc(y * 100) / 100;
    },
    parseBool: function(val, def = false){
          switch(val){
           case "true":
             return true;
           break;
           case "1":
             return true;
           break;
           case 1:
             return true;
           break;
           case true:
             return true;
           break;
           case 'false':
             return false;
           break;
           case '0':
             return false;
           break;
           case 0:
             return false;
           break;
           case null:
             return false;
           break;
           case 'null':
             return false;
           break;
           case '':
             return false;
           break;
          }
          return def;   
    },
    hasClasses: function(element, className) {
          if(typeof(element) == 'string'){
            element = document.querySelector(element);
          }
          let tempClass = className.split(" ");
          if(tempClass.length >= 1){
            for (let temp of tempClass) {
              if(temp != ''){
                if(element.classList.contains(temp) === false){
                    return false;
                }
              }
            }
            return true;
          }
          return false;
    },
    handleClass: function(classes,target,action = 'add',type = 'query'){
        try{
          // console.log(target);
          let temp;
          switch(type){
            case 'elem':
              switch(action){
                 case 'add':
                   target.classList.add(classes);
                 break;
                 case 'remove':
                   target.classList.remove(classes);
                 break;
                 case 'toggle':
                   target.classList.toggle(classes);
                 break;
              }
            break;
            case "query":
              if(document.querySelector(target)){
                switch(action){
                   case 'add':
                     document.querySelector(target).classList.add(classes);
                   break;
                   case 'remove':
                     document.querySelector(target).classList.remove(classes);
                   break;
                   case 'toggle':
                     document.querySelector(target).classList.toggle(classes);
                   break;
                }
              }
            break;
            case "queryAll":
              temp = document.querySelectorAll(target);
              for (let tempi of temp) {
                switch(action){
                   case 'add':
                     tempi.classList.add(classes);
                   break;
                   case 'remove':
                     tempi.classList.remove(classes);
                   break;
                   case 'toggle':
                     tempi.classList.toggle(classes);
                   break;
                }
              }
            break;
          }
        }
        catch{
          console.warn('selector no encontrado: ');
          console.warn(target);
        }
    },
    validateEmail: function(email){
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    findPosByProp: function(prop,value, arr){
      for (let i = arr.length - 1; i >= 0; i--) {
        if(arr[i][prop] == value){
          return i;
        }
      }
      return false;
    },
    deepCopy: function(inObject){
        let outObject, value, key;
    
        if (typeof inObject !== "object" || inObject === null) {
          return inObject // Return the value if inObject is not an object
        }
    
        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {};
    
        for (key in inObject) {
          value = inObject[key];
    
          // Recursively (deep) copy for nested objects, including arrays
          outObject[key] = this.deepCopy(value);
        }
    
        return outObject;
    },
    cutText: function (text, max, addDot = false ) {
      if (text.length >= max) {
        text = text.substr(0, max);
        if (addDot == true) {
          text += "...";
        }
      }
      return text;
    },
    addEvent: function(event,element,funct){
      let found = false;
      let i = -1;
      
      for (let elem of this.elemsEvents) {
        i++;
        if(elem.el == element){
          found = true;
          for (let e of elem.events) {
            if(e == event){
               console.log('element already has that event');
               return;
            }
          }
          break;
        }
      }
      if(found == false){
        this.elemsEvents.push({el:element,events:[event]});
      }
      else{
        this.elemsEvents[i].events.push(event);
      }
      element.addEventListener(event,funct);
    },
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    isAboveViewport: function(element, offset){
       let simplePos = element.getBoundingClientRect().top-offset;
       let winPos = (window.innerHeight || document.documentElement.clientHeight);
       return (winPos >= simplePos)? true : false;
    },
    toCamelCase: function(s){

      return s.toLowerCase().replace(/(_\w)/g, (w) => w.toUpperCase().substr(1));
    },
    suffleArray: function(arr){

      return arr.sort(() => 0.5 - Math.random());
    },
    meanArray: function(arr){

      return arr.reduce((a, b) => a + b, 0) / arr.length;
    },
    isDarkMode: function(){

      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    isApple: function(){

      return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    },
    getUnique: function(arr){

      return arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
    },
    getHex: function(){

      return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
    },
    getScreenWidth: function(){
    },
    shareHeight: function(){
       let elems = Mnr.e('[mnr-copy-height]').e;
       for(let elem of elems){
           
       }
    }

    
    
  };

})();
