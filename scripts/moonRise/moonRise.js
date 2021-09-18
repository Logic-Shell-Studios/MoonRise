// MoonRise Engine Version 3.0

var Mnr = (function(){
  
  return {
    ////////////////////variables
    bodyElem: false,
    root: '.',
    running: false,
    swipers: [],
    binders: [],
    currentBody: null,
    currentTitle: null,
    imgDone: false,
    imgList: [],
    imgNum: 0,
    imgBackList: [],
    imgLoop: null,
    mediaLoopCount: 0,
    mediaTimePass: 0,
    loadEnterTime: 100,
    loadEndTime: 100,
    elemsEvents: [],
    loadLoop: null,
    scrollOld: 0,
    timeAddStatus: null,
    scrollImg:{dones:0,elems:[]},
    componentsHTML:[],
    componentsCount:0,
    classBinds: [],
    forBinds: [],
    imgBinds: [],
    binds: {},
    pageLoading: true,
    initialBinds: {
      savingStatus: 0,
      pageLoading: true,
      clickedText: '',
      searchWord: '',
      scrolled: false,
      windowWidth: 0,
      windowHeight: 0,
    },


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

    runStart:{},
    runEnd:{},
    runLoad:{},
    
    init: function(options = {}) {

      if(this.running){
        return;
      }
      this.running = true;

      try {
        this.bodyElem = document.querySelector('body');
        this.bodyElem.setAttribute('mnr-page-loading',true);
        this.bodyElem.classList.add('Mnr');
      }
      catch(err) {
        console.error('<body> tag not found: '+err);
        return;
      }


      // set options
      if(options['runStart'] != null){
        this.runStart = options['runStart'];
      }
      if(options['runEnd'] != null){
        this.runEnd = options['runEnd'];
      }
      if(options['runLoad'] != null){
        this.runLoad = options['runLoad'];
      }
      if(options['binds'] != null){
        this.binds = options['binds'];
      }
      let temps = Object.entries(this.initialBinds);
      for (var i = temps.length - 1; i >= 0; i--) {
        this.binds[temps[i][0]] = temps[i][1];    
      }
    
      if(options['loadEnter'] != null && options['loadEnd'] != null){
        this.pageLoader.start = options['loadEnter'];
        this.pageLoader.end = options['loadEnd'];
      }
      if(options['loadEnterTime'] != null && options['loadEndTime'] != null){
        this.loadEndTime = options['loadEndTime'];
        this.loadEnterTime = options['loadEnterTime'];
      }

    
      // get root if exist
      if(document.getElementById('mnr-mainRoot')){
        this.root = document.getElementById('mnr-mainRoot').value;
      }

      // run load
      window.addEventListener('load', ()=>{ 
        this.load(); 
      }); 
    },
    load: function(){
      this.loadHrefs();

    
      this.addEvent('scroll',window,()=>{ this.handleScroll() });
      this.addEvent('resize',window,()=>{ this.handleResize() });
      

      this.insertComponents();


      // manage media loading
      this.loadMedia();

      //check if images finish loading or the time surpas the limit
      this.loadLoop = setInterval(()=>{
        if(this.imgDone == true || this.mediaTimePass > 20){
          clearInterval(this.loadLoop);
          this.finishLoad();
        }
      },100);
    },
    finishLoad: function(){
      if(this.pageLoading == true){
        

        this.handleScroll();
        this.handleResize();

        //run functions after finish load once
        Object.values(this.runEnd).map(value => {
          if(typeof value === 'string' && this.hasOwnProperty(value)){
             this[value].init(this);
          }
          else if(typeof value === 'function') {
            value.call();
          }
        });
       
        this.bindAll();
        
        
        this.pageLoader.end();
        // set page load false and run wow
        setTimeout(()=>{
          this.binds.pageLoading = false;
          this.pageLoading = false;
          if(this.bodyElem !== false){
            this.bodyElem.setAttribute('mnr-page-loading',false);
          }
          
          if(typeof WOW === "function"){
            new WOW().init();
          }

          console.log('MOON RISE ENGINE running');
        },this.loadEndTime);

        
      }
    },
    reload: function(){
      this.pageLoader.start();

      this.binds.pageLoading = true;
      this.pageLoading = true;
      if(this.bodyElem !== false){
        this.bodyElem.setAttribute('mnr-page-loading',true);
      }

      this.load();
    },
    
    
    
    ///////////////////////////////////////////////binders
    bindAll: function(){
      //var binds
      // console.log("runBinds");
      for (let bind of Object.keys(this.binds) ) {
        for(let el of document.querySelectorAll('[mnr-bind="'+bind+'"]') ){
          if(el.getAttribute('mnr-bind') != 'set'){  
            //binds property to events
            let attr = 'innerText';
            let event = null;
            let value = this.binds[bind];
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
                  this.binds[bind] = selected;
                }
                else{
                  this.binds[bind] = el.value;
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
               el.value = this.binds[bind];
            }
            else{
               el.innerText = this.binds[bind];
            }

            if(el.nodeName == 'SELECT' && el.hasAttribute('multiple')){
              this.addEvent(event,el, e => {
                  let options = el.querySelectorAll("option:checked");
                  let selected = Array.from(options).map(elm => elm.value);
                  this.binds[bind] = selected;
              });
            }
            else{
              this.addEvent(event,el, e => {
                  this.binds[bind] = el.value;
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
      this.setBindFors();
      this.setBindImgs();
      
      

      
      this.runAllBinds();
      // console.log(this.binds);
      // console.log(this.binders);
    },
    Bind: function(prop){
        let value = this.binds[prop];
        Object.defineProperty(this.binds, prop, {
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
        this.binds[prop] = value;
    },
    runAllBinds(){
      this.runBindMaxText(true);
      this.runBindfors(true);
      this.runBindImgs(true);
      this.runBindPrints(true);
      this.runBindClasses(true);
    },
    runAllBindsSingle(bind){
      this.runBindMaxText();
      this.runSingleBindfors(bind);
      this.runSingleBindImgs(bind);
      this.runBindPrints();
      this.runBindClasses();
    },

    setBindClasses: function(){
     // classes binds
      for (let elem of document.querySelectorAll('[mnr-class]')) {
        if(!elem.hasAttribute('mnr-class-set')){
          let attr = elem.getAttribute('mnr-class');
          // let allConds = Object.entries(JSON.parse(attr));
          
          let binds = Object.keys(this.binds);
          binds = binds.sort((a,b) => b.length - a.length);
          for(bind of binds){
            if(attr.indexOf(bind) !== -1){
               attr = attr.replaceAll(bind,'Mnr.binds.'+bind);
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
                 for(attr of attrs){
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

    setBindFors: function(){
      //for binds
      for (let elem of document.querySelectorAll('[mnr-for]')) {
        let bind = elem.getAttribute('mnr-for');
        if(bind != 'set'){
          elem.setAttribute('mnr-for','set');
          if(this.hasKey(this.forBinds, bind)){
            if(this.forBinds[bind].elems.includes(elem) == false){
              this.forBinds[bind].elems.push(elem);
            }
          }
          else{
              this.forBinds[bind] = {elems:[elem]};
          }
        }
      }
    },
    runBindfors: function(force = false){
      if(this.parseBool(this.pageLoading) == false || force == true){
        let clones = document.querySelectorAll('[mnr-for-clone]');
        for(let clone of clones){
         clone.remove();
        }
        for (let bind of Object.keys(this.forBinds) ) {
          this.iterateForBinds(bind);

        }
      }   
    },
    runSingleBindfors: function(bind){
      if(this.parseBool(this.pageLoading) == false && this.hasKey(this.forBinds,bind)){
      
        let clones = document.querySelectorAll('[mnr-for-clone="'+bind+'"]');
        for(let clone of clones){
         clone.remove();
        }
      
        this.iterateForBinds(bind);
      }   
    },
    iterateForBinds:function(bind){
      if(this.forBinds[bind] != null){
       for (let i = this.forBinds[bind].elems.length - 1; i >= 0; i--) {
        let elem = this.forBinds[bind].elems[i];

        elem.setAttribute('mnr-for-value', this.binds[bind]);
        elem.setAttribute('mnr-for-key', 0);
        elem.classList.add("mnrHide");
        if(this.binds[bind] != null){
         // console.log(Array.isArray(this.binds[bind]));
         let value = this.binds[bind];
         // if(typeof(value) == 'string'){
         //    value = Array.from(value);                   
         // }
         if(Array.isArray(value) ){
            elem.setAttribute('mnr-for-value', this.binds[bind][0]);
            elem.setAttribute('mnr-for-key', 0);
            elem.classList.remove("mnrHide");
            if(this.binds[bind].length > 1){
              for(let j = this.binds[bind].length - 1; j >= 1; j--){
                  let temp = document.createElement('DIV');
                  temp.innerHTML = elem.outerHTML;
                  let newElem = temp.querySelector('[mnr-for]');

                  newElem.setAttribute('mnr-for-clone', bind);
                  newElem.setAttribute('mnr-for-key', j);
                  newElem.removeAttribute('mnr-for');
                  newElem.setAttribute('mnr-for-value', this.binds[bind][j]);
                  elem.insertAdjacentHTML('afterend',newElem.outerHTML);
              }
            }
         }
        }
       }
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
        if(this.binds[bind] != null){
            elem.src = this.binds[bind];
        }
       }
    },

    bindPush: function(prop,val){
      if(this.hasKey(this.binds,prop)){
        let temp = this.binds[prop];
        temp.push(val);
        this.binds[prop] = temp;
      }
    },
    setBinds: function(bind){
      if(typeof bind == 'object'){
        let temp = Object.entries(bind);
        for (var i = temp.length - 1; i >= 0; i--) {
          this.binds[temp[i][0]] = temp[i][1];
        }
      }
      if(this.pageLoading == false){
        this.bindAll();
      }
    },
    
    
    ///////////////////////////////////////////////window handlers
    handleScroll: function(){
      if(window.pageYOffset > 10){
        if(this.binds.scrolled == false){
         this.binds.scrolled = true;
        }
        if(this.bodyElem !== false){
          this.bodyElem.classList.add('scrolled');
        }
      }
      else if(window.pageYOffset <= 10){
        if(this.binds.scrolled){
         this.binds.scrolled = false;
        }
        if(this.bodyElem !== false){
          this.bodyElem.classList.remove('scrolled');
        }
      }
      
      let change = false;
      if(this.scrollOld > window.pageYOffset+1){
        change = true;
      }
      else if(this.scrollOld < window.pageYOffset-1){
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
    
      // if(this.binds.windowWidth != width && this.pageLoading == false){
      //   this.loadLayout();
      // }
      this.binds.windowWidth = width;
      this.binds.windowHeight = height;
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
    

    
    ////////////////////////////////////////////media handlers
    loadMedia: function(){
    
      this.imgList = document.querySelectorAll('[mnr-src]');
      this.imgNum = 0;
      this.mediaLoopCount = 0;

      if(this.imgList.length > 0){
        this.imgIterator();
        
        clearInterval(this.imgLoop);
        this.imgLoop = setInterval(()=>{
          this.mediaTimePass++;
          if(this.imgDone == true){
            if(typeof SVGInject === "function"){
              SVGInject(document.querySelectorAll("img.svg"));
            }
            this.loadImgsBack();
            this.setSliders();
            this.mediaLoopCount = 0;
            clearInterval(this.imgLoop);
          }
        },100);
      }
      else{
        this.imgDone = true;
      }

      ////set images scroll load
      let temp = document.querySelectorAll('[mnr-scroll-src]');
      for(elem of temp){
        let attr = elem.getAttribute("mnr-scroll-src")
        if(attr != 'set'){
           this.scrollImg.elems.push({el:elem,src:attr,set:false});
           elem.setAttribute("mnr-scroll-src","set");
        }
      }
    },
    imgIterator:  function(){

      this.mediaLoopCount ++;

      if(this.imgNum  >= this.imgList.length){
        this.imgDone = true;
        return;
      }
    
      let tempSrc = this.imgList[this.imgNum ].getAttribute('mnr-src');
      if(tempSrc != null && tempSrc != 'null'){
          this.imgList[this.imgNum ].addEventListener('error',() => {
            this.imgList[this.imgNum ].src = this.root+"/assets/placeholder.png";
            console.warn('image skipped: '+tempSrc);
          });
          this.imgList[this.imgNum ].addEventListener('load',() => {
            this.imgNum +=1;
            this.imgIterator();
          });
    
          this.imgList[this.imgNum ].src = tempSrc;
          this.imgList[this.imgNum ].removeAttribute('mnr-src');
      }
      else{
        this.imgNum +=1;
        this.imgIterator();
      }
    },
    imgLoadScroll: function(){
      if(this.scrollImg.elems.length < this.scrollImg.dones){
        return;  
      }
      for(elem of this.scrollImg.elems){
         if(this.isInViewport(elem.el) && elem.set == false){
            elem.el.src = elem.src;
            elem.set = true;
            this.scrollImg.dones ++;
         }
      }
    },
    loadImgsBack: function(){
      this.imgBackList = document.querySelectorAll('[mnr-back-src]');
      for (var i = 0; i < this.imgBackList.length; i++) {
        try{
         
         let tempSrc = this.imgBackList[i].getAttribute('mnr-back-src');
         if(tempSrc != null && tempSrc != 'null'){
           this.imgBackList[i].style.backgroundImage = 'url('+tempSrc+')';
           this.imgBackList[i].setAttribute('mnr-back-src',null);
         }
        }
        catch{
          console.warn(this.imgBackList[i]+' skipped');
          continue;
        }
      }
      this.imgBackList = [];
    },
    setSliders: function(){
      if(typeof Swiper !== 'function'){
        console.warn("Swiper not found");
        return;
      }
      if(this.swipers.length > 0){
        for (var i = this.swipers.length - 1; i >= 0; i--) {
          this.swipers[i].destroy();
        }
        this.swipers = [];
      }
    
      let temp = document.querySelectorAll('[mnr-slider]');
    
      if(temp.length > 0){
        for (let slider of document.querySelectorAll('[mnr-slider]')) {
    
          slider.classList.add('swiper-slider');
          
          let prev = null;
          let next = null;
          let pag = null;
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
          }
    
          
          
          if(slider.querySelector(".swiper-wrapper") == null){
             let wrapper = document.createElement("DIV");
             wrapper.classList.add('swiper-wrapper');
             wrapper.innerHTML = slider.innerHTML;
             slider.innerHTML = wrapper.outerHTML;
          }
    
          if(prev != null && next != null){
            slider.innerHTML += prev.outerHTML;
            slider.innerHTML += next.outerHTML;
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
             for (var j = sliders.length - 1; j >= 0; j--) {
               sliders[j].classList.add('swiper-slide');
             }
          }
    
    
          let optionsTemp = Object.entries(JSON.parse(slider.getAttribute('mnr-slider')));

    
          let options = {
            navigation: {
              nextEl: slider.querySelector(".swiper-button-next"),
              prevEl: slider.querySelector(".swiper-button-prev"),
            },
            pagination: {
              el: slider.querySelector(".swiper-pagination"),
              dynamicBullets: true,
              clickable: true,
            }
          };
    
          for (var j = optionsTemp.length - 1; j >= 0; j--) {
            options[optionsTemp[j][0]] = optionsTemp[j][1];
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
    
      for (var i = temp.length - 1; i >= 0; i--) {
        let optionsTemp = JSON.parse(temp[i].getAttribute('mnr-slider-thumbs'));
        
        if(optionsTemp['id']){
          if(optionsTemp['id'] == id){
             temp = temp[i];
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
             for (var j = sliders.length - 1; j >= 0; j--) {
               sliders[j].classList.add('swiper-slide');
               sliders[j].classList.add('cursor');
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
    
          for (var j = optionsTemp.length - 1; j >= 0; j--) {
            options[optionsTemp[j][0]] = optionsTemp[j][1];
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
      for (var i = this.swipers.length - 1; i >= 0; i--) {
        let temp = document.createElement("DIV");
        temp.innerHTML = this.swipers[i].el.outerHTML;
        
        if(temp.querySelectorAll(elemName).length > 0){
          this.swipers[i].slideTo(pos,false,false);
        }
      }
    },
    loadHrefs: function(){
      var hrefs = document.querySelectorAll('[mnr-href]');
      for (var i = hrefs.length - 1; i >= 0; i--) {
        hrefs[i].href = hrefs[i].getAttribute('mnr-href');
        hrefs[i].removeAttribute('mnr-href');
      }
    },


    ///////////////////////////////////////////////////////post handlers
    setSavingStatus: function(status){
      if(status == 1){ //saving
        this.binds.savingStatus = 1;
        this.binds.savingNotice = '';
      }
      else{
        this.savingTemp = status;
        setTimeout(()=>{
          this.binds.savingStatus = this.savingTemp;
          if(this.binds.savingStatus == 2){ //ok
            this.binds.savingNotice = '<span class="colorOk">Los cambios se han guardado</span>';
            setTimeout(()=>{
              this.binds.savingNotice = '';
            }, 4000);
          }
          else{ //bad
            this.binds.savingNotice = '<span class="colorWarn">Hubo un error en el servidor, vuelve a intentarlo</span>';
          }
        }, 500);
        setTimeout(()=>{
          this.binds.savingStatus = 0; //ready
        }, 1500);
      }
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
    screenTo: function(id){
      var scroll = window.pageYOffset;
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
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
    parseBool: function(val){
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
          }
          return false;   
    },
    hasClasses: function(element, className) {
          if(typeof(element) == 'string'){
            element = document.querySelector(element);
          }
          var tempClass = className.split(" ");
          if(tempClass.length >= 1){
            for (var i = tempClass.length - 1; i >= 0; i--) {
              if(tempClass[i] != ''){
                if(element.classList.contains(tempClass[i]) === false){
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
              for (var i = temp.length - 1; i >= 0; i--) {
                switch(action){
                   case 'add':
                     temp[i].classList.add(classes);
                   break;
                   case 'remove':
                     temp[i].classList.remove(classes);
                   break;
                   case 'toggle':
                     temp[i].classList.toggle(classes);
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
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    findPosByProp: function(prop,value, arr){
      for (var i = arr.length - 1; i >= 0; i--) {
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
    
  };

})();





