// MoonRise Engine Version 4.0

const Mnr = (function(){
  
  ////////////////////variables
  let root = '.';
  let running = false;
  let binders = [];
  let currentBody = null;
  let currentTitle = null;
  let imgList = {dones:0,iter:0,elems:[]};
  let eTree = [];
  let scrollOld = 0;
  let scrollSensitivity = 40;
  let timeAddStatus = null;
  let scrollImgOffset = 500;
  let componentsHTML =[];
  let componentsCount =0;
  let classBinds = [];
  let tagBinds = [];
  let mainStyle = '';
  let b = {};
  let pageLoading = true;
  let assetsPath = '/assets';
  let screenSizesCss = [500,720,960,1140];
  let initialBinds = {
    savingStatus: 0,
    pageLoading: true,
    scrolled: false,
    windowWidth: 0,
    windowHeight: 0,
  };

  let start = null;

  let run = {};
  let loadRun = [];

  let scrollRun = [];

  let version = '4.0';



  ///////////////////////////////////////////////////methods
  

  ///////////////////////////////////initials
  const init = (options = {}) => {
    if(running){
      return;
    }
    running = true;
    
    try {
      e('html').attr('mnr-page-loading',true);
      e('html').class('Mnr');
    }
    catch(err) {
      console.error('<html> tag not found: '+err);
      return;
    }


    // set options
    if(options['onLoad'] != null){
      run = options['onLoad'];
    }
    if(options['root'] != null){
      root = options['root'];
    }
    if(options['assetsPath'] != null){
      assetsPath = options['assetsPath'];
    }
    if(options['responsiveSizes']){
      screenSizesCss = options['responsiveSizes'];
    }
    if(options['binds'] != null){
      setBinds(options['binds']);
    }
    setBinds(initialBinds);
    
    

    // get root if exist
    if(e('#mnr-mainRoot').e.length > 0){
      root = e('#mnr-mainRoot').e[0].value;
    }


    
    let loadCss = true;
    if(options['loadCss'] != null){
      loadCss = parseBool(options['loadCss']);
    }
    loadStyles(loadCss);
   
    
    window.addEventListener('scroll',handleScroll);
    window.addEventListener('resize',handleResize);
    window.addEventListener('DOMContentLoaded',finishLoad);
  };
  const finishLoad = () => {
      loadHrefs();

      // manage media loading
      loadMedia();

      if(pageLoading == true){
        console.log('MOONRISE '+version+' running');


        handleScroll();
        handleResize();
       
        bindAll();

        setForms();
        
        //run functions after finish load once
        Object.values(run).map(value => {
          onLoad(null,value);
        });

        runLoads();

        b.pageLoading = false;
        pageLoading = false;
        e('html').attr('mnr-page-loading',false);
      }
  };
  const reload = () => {
      b.pageLoading = true;
      pageLoading = true;
      e('html').attr('mnr-page-loading',true);

      finishLoad();
  };

  const onLoad = (binds = null, funct = null) => {
    if(binds != null){
      setBinds(binds);
    }
    if(typeof funct === 'function'){
      loadRun.push(funct);
      if(pageLoading == false){
        runLoads();
      }
    }  
  };
  const runLoads = () => {
    for (let i = 0; i < loadRun.length; i++) {
      try{
        loadRun[i].call(Mnr);
      }
      catch(error){
        console.warn('error trying to call function in loads '+error);
      }
    }
    loadRun = {};
  };

  const onScroll = (funct) => {
    if(typeof funct === 'function'){
      scrollRun.push(funct);
    }
  };
  const runScroll = () => {
    for (let i = 0; i < scrollRun.length; i++) {
      try{
        scrollRun[i].call(Mnr);
      }
      catch(error){
        console.warn('error trying to call function in scroll runs '+error);
      }
    }
  };
    

  

  ///////////////////////////////////binders
  const bindAll = () => {
    for (let bind of Object.keys(b) ) {
      for(let el of e('[mnr-bind="'+bind+'"]').e ){
        if(e(el).attr('mnr-bind') != 'set'){  
          //binds property to events
          let attr = 'innerText';
          let event = null;
          let type = 'text';
          switch(el.nodeName){
             case "INPUT":
               attr = 'value';
               event = 'keyup';
               type = el.type;
               if(el.type == 'date'){
                 event = 'change';
               }
               else if(u.parseBool(type) == false){
                 type = 'text';
               }
             break;
             case "TEXTAREA":
               attr = 'value';
               event = 'keyup';
             break;
             case "SELECT":
               attr = 'value';
               event = 'change';
               if(e(el).hasAttr('multiple')){
                 type = 'multiple';
               }
             break;
             case "IMG":
               attr = 'src';
               event = null;
             break;
             default:
               attr = 'innerText';
               event = null;
          }
          
          // overwrite attribute and values
          if(e(el).hasAttr('mnr-bind-attr')){
            attr = e(el).attr('mnr-bind-attr');
          }
          if(e(el).hasAttr('mnr-bind-event')){
            event = e(el).attr('mnr-bind-event');
          }

          //element set default values
          if(u.parseBool(e(el).attr('mnr-bind-set')) == true){
            
            if(el.nodeName == 'SELECT' && type == 'multiple'){
              let options = e("option[selected]",el).e;
              let selected = Array.from(options).map(elm => elm.value);
              b[bind] = selected;
            }
            else{
              b[bind] = el[attr];
            }
          }

          // add events
          let bindEvent = null;
          if(type == 'multiple'){
            bindEvent = (ev)=>{
               let options = e("option:checked",el).e;
               let selected = Array.from(options).map(elm => elm.value);
               b[bind] = selected;
            }
          }
          else{
            bindEvent = (ev)=>{
               b[bind] = el[attr];
            }
          }

          // add event function
          if(event != null){
            el.addEventListener(event,bindEvent);
          }


          el[attr] = b[bind];
          
          // generate binder
          let elData = {
            el: el,
            attr: attr,
            event: event,
            type: type,
          };
          if(u.hasKey(binders, bind)){
            if(u.findPosByProp('el',el,binders[bind].elems) === false){
              binders[bind].elems.push(elData);
            }
          }
          else{
            binders[bind] = {elems:[elData],bind:bind};
          }
          e(el).attr('mnr-bind','set');
        }    
      }
      Bind(bind);
    }
    
    setBindClasses();
    // setBindImgs();
    setBindTags();
    
    
    
    runAllBinds();
    // console.log(b);
    // console.log(binders);
  };
  const Bind = (prop) => {
    let value = b[prop];
    Object.defineProperty(b, prop, {
        set: (newValue) => {
            value = newValue;
            // console.log("set: "+prop+ " "+ newValue);
            // Set elements to new value
            if(u.hasKey(binders, prop)){
              for (let elem of binders[prop].elems) {
                if(elem.type == 'multiple'){
                  for(let opt of e("option",elem.el).e){
                    opt.removeAttribute('selected');
                  }
                  for(let val of newValue){
                    let opt = e("option[value='"+val+"']",elem.el).e[0];
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
            
            if(u.parseBool(pageLoading) == false){
              runAllBindsSingle(prop);
            }
        },
        get: () => {
            return value;
        },
    });
    b[prop] = value;
  };
  const runAllBinds = () =>{
    runBindMaxText(true);
    runBindPrints(true);
    runBindClasses(true);
    runBindTags(true);
  };
  const runAllBindsSingle = (bind) =>{
    runBindMaxText();
    runBindPrints();
    runBindClasses();
    runBindTags();
  };

  const setBindClasses = () => {
     // classes binds
      for (let el of document.querySelectorAll('[mnr-class]')) {
        if(!el.hasAttribute('mnr-class-set')){
          el.setAttribute('mnr-class', parseMnrBinds(el.getAttribute('mnr-class'),el) );
          el.setAttribute('mnr-class-set', true);
        }
      }
  };
  const runBindClasses = (force = false) => {
      if(u.parseBool(pageLoading) == false || force == true){
        
        for (let el of e('[mnr-class]').e){
          let allConds = Object.entries(JSON.parse(el.getAttribute('mnr-class')));
          for (var j = allConds.length - 1; j >= 0; j--) {
          
             let temp = allConds[j];
             if(temp[1].indexOf('mnr-') !== -1){
                 let attrs = el.getAttributeNames();
                 attrs = attrs.sort((ai,bi) => bi.length - ai.length);
                 for(let attr of attrs){
                   if(temp[1].indexOf(attr) !== -1){
                      temp[1] = temp[1].replaceAll(attr,el.getAttribute(attr));
                   }
                 }
             }

             // console.log(temp);
             // console.log(eval(temp[1]));
             try{
               if(eval(temp[1]) == true){
                 el.classList.add(temp[0]);
               }
               else{
                 el.classList.remove(temp[0]);
               }
             }
             catch{
               console.warn('The evaluation '+temp[1]+' of '+el.outerHTML+' failed');
             }
          }
        }

      }
  };
  
  const runBindPrints = (force = true) => {
      //print binds
      if(u.parseBool(pageLoading) == false || force == true){
        for (let elem of e('[mnr-print]').e) {
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
  };
  const runBindMaxText = (force = true) => {
      if(u.parseBool(pageLoading) == false || force == true){
        for (let elem of e('[mnr-max-text]').e) {
          let max = elem.getAttribute('mnr-max-text');
          if(elem.nodeName == 'INPUT' ||  
            elem.nodeName == 'TEXTAREA'){
            let val = elem.value;
            let size = (val != null) ? val.length : 0;
            elem.value = u.cutText(val,max);
          }
          else{
            let val = elem.innerText;
            let size = (val != null) ? val.length : 0;
            elem.innerText = u.cutText(val,max);
          }
        }
      }
  };
  
  const bindPush = (prop,val) => {
      if(u.hasKey(b,prop)){
        let temp = b[prop];
        temp.push(val);
        b[prop] = temp;
      }
  };
  const setBinds = (bind) => {
      if(typeof bind == 'object'){
        let temps = Object.entries(bind);
        for (let temp of temps) {
          b[temp[0]] = temp[1];
        }
      }
      if(pageLoading == false){
        bindAll();
      }
  };
  
  const setBindTags = () => {
      for(let el of document.querySelectorAll("mnr")){
        if(u.findPosByProp('el',el, tagBinds) === false ){
          tagBinds.push({ev:parseMnrBinds(el.innerText,el) ,el:el});
        }
      }
  };
  const runBindTags = (force = false) => {
       if(u.parseBool(pageLoading) == false || force == true){
          
          for(let tag of tagBinds){
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
  };


  const parseMnrBinds = (string,el) => {

      let type = "";
      if(el){
        if(e(el).hasAttr("mnr-type")){
          if(e(el).attr("mnr-type") == "number"){
             type = "+";
          }
          e(el).removeAttr("mnr-type");
        }
      }

      string = string.replaceAll(";","");
      string = string.replaceAll("script","");
      string = string.replaceAll("alert(","");
      string = string.replaceAll(".log(","");
      string = string.replaceAll(".then","");
      string = string.replaceAll("try","");

      string = string.replaceAll("e(this)","e(el)");
      
      if(el.nodeName === 'MNR'){
        string = string.replaceAll("e()","e(el.parentNode)");
        el.innerText = "";
      }
      else{
        string = string.replaceAll("e()","e(el)");
      }

      string = string.replaceAll("e(",type+"Mnr.e(");


      let binds = Object.keys(b);
      binds = binds.sort((ai,bi) => bi.length - ai.length);
      for(let bind of binds){
        if(string.indexOf(bind) !== -1 && string.indexOf('Mnr.b.'+bind) === -1){
           string = string.replaceAll(bind,type+'Mnr.b.'+bind);
        }
      }


      return string;
  };
  


  ///////////////////////////////////window handlers
  const handleScroll = (force = false) => {
    if(window.pageYOffset > 10){
      if(b.scrolled == false){
       b.scrolled = true;
      }
      e('html').class('scrolled');
    }
    else if(window.pageYOffset <= 10){
      if(b.scrolled){
       b.scrolled = false;
      }
      e('html').class('scrolled',0);
    }
    
    let change = false;
    if(scrollOld > window.pageYOffset+scrollSensitivity){
      change = true;
    }
    else if(scrollOld < window.pageYOffset-scrollSensitivity){
      change = true;
    }
    if(change){
      scrollOld = window.pageYOffset;

      runScroll();
    }   
  };
  const handleResize = () => {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    
    b.windowWidth = width;
    b.windowHeight = height;

    e('body').attr('mnr-screen-width', width);
    e('body').attr('mnr-screen-height', height);

    handleScroll();
  };
  const shareHeight = () => {
     let elems = e('[mnr-copy-height]').e;
     for(let el of elems){
         
     }
  };



  ///////////////////////////////////media handlers
  const loadMedia = () => {
    for(let el of e('[mnr-src]').e){
      setMedia(el);
    }
  };
  const setMedia = (el) => {
    let errorLoad = (ev)=>{
      e(el).class('mnrHide');
      console.warn('image skipped: '+el.src);
    };
    let src = e(el).attr('mnr-src');
    if( src != 'set'){
       if(el.nodeName == 'IMG'){
         if(e(el).hasAttr('alt') == false){
           let alt = src.split('/');
           alt = alt[alt.length-1];
           alt = alt.split('.');
           alt = alt.splice(0,alt.length-2);
           el.alt = alt;
         }
         el.addEventListener('error',errorLoad);
       }

       e(el).setViewTrigger(
        function(){
          this.resetClasses().class('imgLoaded');
          let el = this.e[0];
          if(el.nodeName == 'IMG'){
            el.src = root+assetsPath+'/'+this.attr('mnr-src-loading');
          }
          else{
            try{
             this.css({'background-image': 'url('+root+assetsPath+'/'+this.attr('mnr-src-loading')+')'});
            }
            catch{
              console.warn('background image skipped: '+el.src);
            }
          }
          this.removeAttr('mnr-src-loading');
        },
        function(){
          this.class('imgLoading anim5')
        },true);
       
       e(el).attr('mnr-src-loading', src)
       e(el).removeAttr('mnr-src');
    }
  }
  const loadHrefs = () => {
    let hrefs = e('[mnr-href]').e;
    for (let href of hrefs) {
      href.href = href.getAttribute('mnr-href');
      href.removeAttribute('mnr-href');
    }
  };



  ///////////////////////////////////ajax handlers
  const setSavingStatus = (status) => {
    if(status == 1){ //saving
      b.savingStatus = 1;
      b.savingNotice = '';
    }
    else{
      savingTemp = status;
      setTimeout(()=>{
        b.savingStatus = savingTemp;
        if(b.savingStatus == 2){ //ok
          b.savingNotice = '<span class="colorOk">Los cambios se han guardado</span>';
          setTimeout(()=>{
            b.savingNotice = '';
          }, 4000);
        }
        else{ //bad
          b.savingNotice = '<span class="colorWarn">Hubo un error en el servidor, vuelve a intentarlo</span>';
        }
      }, 500);
      setTimeout(()=>{
        b.savingStatus = 0; //ready
      }, 1500);
    }
  };
  const fetchGetText = (url,call = null,callBad = null) => {
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
  };


  //////////////////////////////////form handler
  const setForms = () => {
     let forms = e('[mnr-form]').e;
     for(let form of forms){
       
     }
  };


  /////////////////////////////////element handler
  const e = (query, rltv = document) => {
    let elem = [];
    if(typeof(query) == 'string'){
      elem = rltv.querySelectorAll(query);
    }
    else{
      elem = singleNode(query);
    }

    
    return {
      e: elem,
      eBack: elem,
      query: [query],
      singleNode: singleNode,
      waiting: false,
      chainPos: 0,
      waitingTotal: 0,
      chain: [],
      chainWait: [],
      looping: false,
      result: null,
      results: [],
      addedClasses: [],
      addedAttr: [],
      eventMethods : [],
      q: function(query){
        if(typeof(query) == 'string'){
         let elem = [];
         elem = this.e[0].querySelectorAll(query);

         this.e = elem;
         this.query.push(query);
        }

        return this;
      },  
      initial: function(){
        if(this.isWaiting(['initial',[]])){
           return this;
        }

        this.e = this.eBack;
        return this;
      },
      class: function(names, add = true){
        if(this.isWaiting(['class',[names,add]])){
           return this;
        }
        
        // console.log(names);
        let classes = names.trim().split(' ');
        for(let el of this.e){
          for(let clss of classes){
            if(add){
              
              if(this.hasClass(clss) == false){
                 this.addedClasses.push(clss);
              }
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
        for(let el of this.e){
          for(let clss of classes){
           
           if(this.hasClass(clss) == false){
              this.addedClasses.push(clss);
           }
           el.classList.toggle(clss);
          }
        }
        return this;
      },
      hasClass: function(names, all = true){
        let classes = names.trim().split(' ');
        let match = 0;
        let compare = 0;
        for(let el of this.e){
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
      resetClasses: function(){
        if(this.isWaiting(['resetClasses',[]])){
           return this;
        }
        for (let i = this.addedClasses.length - 1; i >= 0; i--) {
          this.class(this.addedClasses[i],false);
          this.addedClasses.splice(i,1);
        }

        return this;
      },
      css: function(property = null){
        if(this.isWaiting(['css',[property]])){
           return this;
        }

        let styles = [];
        if(property == null || typeof property == 'string'){
          styles = getComputedStyle(this.e[0]);
          return (property == null)? styles : styles[property];
        }
        else{
          if(typeof property == 'object'){
           for(let el of this.e){
             
                for(let style of Object.keys(property) ){
                  el.style[style] = property[style];
                }
            }
          }
        }

        return this;
      },
      attr: function(attr,val = null){
        if(val == null){
          return this.e[0].getAttribute(attr);
        }
        else{
          for(let el of this.e){
            el.setAttribute(attr, val);

            if(this.hasAttr(attr) == false){
              this.addedAttr.push(attr);
            }
            
          }
        }
        return this;
      },
      hasAttr: function(names, all = true){
        let attr = names.trim().split(' ');
        let match = 0;
        let compare = 0;
        for(let el of this.e){
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
      removeAttr: function(names){
        let attr = names.trim().split(' ');
        for(let el of this.e){
          for(let at of attr){
            el.removeAttribute(at);
          }
        }
        return this;
      },
      resetAttrs: function(){
        if(this.isWaiting(['resetAttrs',[]])){
           return this;
        }

        for (let i = this.addedAttr.length - 1; i >= 0; i--) {
          this.removeAttr(this.addedAttr[i],false);
          this.addedAttr.splice(i,1);
        }
        return this;
      },
      html: function(html = null,add = false){
        if(this.isWaiting(['html',[html,add]])){
           return this;
        }

        if(html == null){
          return this.e[0].innerHTML;
        }
        for(let el of this.e){
          el.innerHTML = (add) ? el.innerHTML+html : html;
        }
        return this;
      },
      text: function(text = null,add = false){
        if(this.isWaiting(['text',[text,add]])){
           return this;
        }

        if(text == null){
          return this.e[0].innerText;
        }
        for(let el of this.e){
          el.innerText = (add) ? el.innerText+text : text;
        }
        return this;
      },
      value: function(value, add = false){
        if(this.e[0].nodeName == "INPUT" || this.e[0].nodeName == "TEXTAREA" || this.e[0].nodeName == "SELECT"){
          if(value == null){
            return this.e[0].value;
          }
          for(let el of this.e){
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
      parent: function(){
        if(this.isWaiting(['parent',[]])){
           return this;
        }

        this.e = this.singleNode(this.e[0].parentNode);
        return this;
      },
      child: function(query = 0){
        if(this.isWaiting(['child',[query]])){
           return this;
        }

        if(typeof(query) != 'string'){
          this.e = this.singleNode(this.e[0].children[num]);
        }
        else{
          this.q(query);
        }
        return this;
      },
      elem: function(num = 0){
         this.e = this.singleNode(this.e[num]);
         return this; 
      },
      elems: function(){
         this.e = this.eBack;
         return this;
      },
      children: function(){
        this.e = this.e[0].children;
        return this;
      },
      screenFocus: function(offset = 0){
         u.screenTo(this.e[0],offset);
         return this;
      },
      inView: function(offset = 0){

         return u.isInViewport(this.e[0],offset);
      },
      aboveView: function(offset = 0){
        
         return u.isAboveViewport(this.e[0],offset);
      },
      loadBinds: function(){
         runAllBinds();
         return this;
      },
      event: function(events, method = null){
        
        if(method != null){
          for(let el of this.e){
            events = (typeof(events) === 'string') ? events.split(' ') : [events];
            events = u.removeDuplicate(events);

            for(event of events){
              if(event == ''){
                continue;
              }
              let eventTemp = (ev)=>{
                let _this = this
                _this.ev = ev;
                method.call(_this);
              }
              el.addEventListener(event,eventTemp);
            }
          }
        }

        return this;
      },
      wait: function(time = 0){
         
         if(this.isWaiting(['wait',[time]])){
           return this;
         }
        
         this.waitingTotal += time;
          
         setTimeout(()=>{
            this.waiting = false;
            let tempChain = u.deepCopy(this.chainWait);
            for (let i = 0; i < tempChain.length; i++) {
              
              this.chainWait.splice(0,1);
              this[tempChain[i][0]](...tempChain[i][1]);

              if(tempChain[i][0] == 'wait'){
                break;
              }
            }
            
            return this;
         },time);

         this.waiting = true;
         return this;
      },
      isWaiting: function(data){
         
         if(this.waiting){
           this.chain.push(data);
           this.chainWait.push(data);
           return true;
         }
         return false;
      },
      run: function(funct){
        if(this.isWaiting(['run',[funct]])){
           return this;
        }
        try{
          let _this = this;
          this.result = funct.call(_this);
        }
        catch(error){
          console.warn('error trying to call function in chain '+error);
        }

        this.results.push(this.result);

        return this;
      },
      setViewTrigger: function(enter = null, exit = null,once = null){
        for(let el of this.e){
          let interFunct = (entries, observer) => {
            entries.forEach(entry => {
              if(entry.isIntersecting) {
                once = (once == null) ? false : once;

                if(once == true){
                  observer.unobserve(entry.target)
                }

                if(enter != null){
                  let _this = this;
                  enter.call(_this);
                }
              }
              else{
                if(exit != null){
                  let _this = this;
                  exit.call(_this);
                }
              }
            });
          };
          let observer = new IntersectionObserver(interFunct);
          observer.observe(el)
        }

        return this;
      },
      newElem: function(){
        //create element inside
      },
      moveElem: function(){
        //move existing element to inside of this elements, by query and by element
      },
      copyElem: function(){
        //copy existing element to inside of this elements, by query and by element
      },
      destroy: function(){
        //autodestroy this elements
      }

    };
  };



  const singleNode = (function () {
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


  /////////////////////////////////utilities
  const u = (function(){
    return {
       
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
       getValues: function(obj){
         let tempArr = Object.entries(obj);
         let temp = [];
         for (let i = 0; i < tempArr.length; i++) {
           temp.push(tempArr[i][1]);
         }
         return temp;
       },
       screenTo: function(elem, offset = 0){
         let scroll = window.pageYOffset;
         // document.querySelector(elem).scrollIntoView({ behavior: 'smooth' });
         
         if(typeof(elem) == 'string'){
           elem = e(elem,false).e;
         }
         if(elem == null){
           return;
         }
         let bodyRect = e('body').e[0].getBoundingClientRect().top;
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
             X = parseFloat(X);
             A = parseFloat(A);
             B = parseFloat(B);
             C = parseFloat(C);
             D = parseFloat(D);
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
             outObject[key] = u.deepCopy(value);
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
       isInViewport: function(element,offset = 0) {
           let rect = element.getBoundingClientRect();
           return (
               (rect.top-offset >= 0 && rect.top-offset <= b.windowHeight ) || 
               ( rect.bottom-offset <= b.windowHeight && rect.bottom-offset >= 0) ||
               ( rect.top-offset <= 0 && rect.bottom-offset >= b.windowHeight && rect.bottom-offset >= 0)
           );
       },
       isInFullViewport: function(element) {
           const rect = element.getBoundingClientRect();
           return (
               rect.top >= 0 &&
               rect.left >= 0 &&
               rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
               rect.right <= (window.innerWidth || document.documentElement.clientWidth)
           );
       },
       isAboveViewport: function(element, offset = 0){
          let simplePos = element.getBoundingClientRect().top-offset;
          return (b.windowHeight >= simplePos);
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
       removeDuplicate: function(arr){

          return [...new Set(arr)];
       },
       getHexColor: function(){

         return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
       },
       sanitizeHTML: function(str, nodes = false){
         function clean (html) {
           let nodes = html.children;
           for (let node of nodes) {
             removeAttributes(node);
             clean(node);
           }
         }
         function removeAttributes (elem) {
           let atts = elem.attributes;
           for (let {name, value} of atts) {
             if (!isPossiblyDangerous(name, value)) continue;
             elem.removeAttribute(name);
           }
         }
         function removeScripts (html) {
           let scripts = html.querySelectorAll('script');
           for (let script of scripts) {
             script.remove();
           }
         }
         function isPossiblyDangerous (name, value) {
           let val = value.replace(/\s+/g, '').toLowerCase();
           if (['src', 'href', 'xlink:href'].includes(name)) {
             if (val.includes('javascript:') || val.includes('data:text/html')) return true;
           }
           if (name.startsWith('on')) return true;
         }

         let html = u.stringToHTML(str);

         // Sanitize it
         removeScripts(html);
         clean(html);

         // If the user wants HTML nodes back, return them
         // Otherwise, pass a sanitized string back
         return nodes ? html.childNodes : html.innerHTML;
       },
       stringToHTML: function(str) {
         let parser = new DOMParser();
         let doc = parser.parseFromString(str, 'text/html');
         return doc.body || document.createElement('body');
       },
    };
  })();
  

  /////////////////////////////////////////////////////css
  const setCss = (loadCss) => {
     
     screenSizesCss = screenSizesCss.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
     screenSizesCss.push(0);

     let sizesScreenFull = screenSizesCss;
     let sizesPrefixesFull = ['Xs','Sm','Md','Lg',''];
     


     let zIndex = ['-1','1','2','3','4','5','10','15','20'];
     let colors = [1,2,3,4,'Error','Ok','Warn','White','Gray','Black'];
     
     let spaces = [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100];
     let dirs   = ['','T','B','R','L','C'];
     let prefix = ['','top','bottom','right','left','center'];
     
     
     let spacesW = [5,10,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];
     let spacesT = [2,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,150,200,250,300,350,400,450,500,600,800];
     let round   = [3,6,12,22,36];


     let cross = ['-webkit-', '-khtml-','-moz-','-ms-','-o-',''];

     let setCross = function(prop){
       for (let i = cross.length - 1; i >= 0; i--) {
         classes += `${cross[i]}${prop};
         `;
       }
     };

     let classes = '';

     classes += `
      @charset "UTF-8";
     `
     classes += `
       .mnrHide{
         display: none!important;
       }
     `;
     if(loadCss == false){
       return;
     }
     classes += `
        /* Variables */
        :root {
          --mnr-color1: #0d1f2c;
          --mnr-color2: #cb2155;
          --mnr-color3: rgb(231,13,108);
          --mnr-color4: #91d4df;
          --mnr-colorWhite: antiquewhite;
          --mnr-colorBlack: rgb(17,19,20);
          --mnr-colorGray: rgb(73, 83, 86);
          --mnr-colorError: #be1b1b;
          --mnr-colorOk: #00A86B;
          --mnr-colorWarn: #ffeb3b;
          --mnr-colorDisabled: rgba(16, 16, 16, 0.3);
          --mnr-colorInput: #e0e0e0;
        
          --mnr-textColor: var(--mnr-colorBlack);
          --mnr-inputTextColor: var(--mnr-colorBlack);
        
          --mnr-inputRadius: 3px;
          --mnr-inputBorder: 1px solid rgba(0,0,0,0.1);
          --mnr-btnBorder: 0px;
          --mnr-btnRadius:  3px;
          --mnr-btnHeight: 50px;
          --mnr-btnWidth:  250px;
          
        
          --mnr-maxBodyWidth: 1600px;
          --mnr-contentWidth: 1300px;
          --mnr-innerContentWidth: 800px;
          --mnr-minContentWidth: 320px;
        
          --mnr-padSides: 40px;
          --mnr-padSidesLg: 20px; 
          --mnr-padSidesMd: 20px; 
          --mnr-padSidesSm: 20px; 
          --mnr-padSidesXs: 15px; 
          

          --mnr-fontS1: 59px;
          --mnr-fontS2: 37px;
          --mnr-fontS3: 24px;
          --mnr-fontS4: 18px; /*regular*/
          --mnr-fontS5: 14px;
          --mnr-fontS6: 9px;
        
          --mnr-titleSpacing: 1px;
          --mnr-titleLineHeight: 140%;
          --mnr-lineHeight: 140%;
        
        
          --mnr-gutter: 20px;
          --mnr-item-height: 100px;
        }

        html {
          height: auto;
          margin:0px!important;
          position: relative;
          overflow-x: hidden;
          min-width: var(--mnr-minContentWidth);
          scroll-behavior: smooth;
          line-height: 1.15;
          -webkit-text-size-adjust: 100%;
        }

        ::-webkit-scrollbar {
            width: 10px;
            max-width: 10px;
        }
        ::-webkit-scrollbar-track{
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #888; 
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
        
        *{
          outline: none   
     `;

         setCross('box-sizing: border-box');
         setCross('user-select: none');

     classes += ` 
        
          -webkit-touch-callout: none;  
        
          margin: 0;
          padding: 0;
        }
        
        
        div,
        section,
        main{
          width: auto;
          height: auto;
        }
        
        main{
          max-width: 5000px;
          width: 100%;
          min-height: 90vh;
     `;

         setCross('transition: all .2s');

     classes += ` 
          display: block;
          left: 0;
          right: 0;
          position: relative;
          margin: auto;
        }
        
        img{
          pointer-events: none;
          object-fit: contain;
        }
        img.imgLoading{
          opacity:0
        }
        
        html,
        body,
        p,
        ol,
        ul,
        li,
        dl,
        dt,
        dd,
        blockquote,
        figure,
        fieldset,
        form,
        legend,
        textarea, 
        input,
        select,
        label,
        div,
        section,
        pre,
        iframe,
        hr,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        a,
        span {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;

          text-align: left;
          font-family: "regular";
          line-height:  var(--mnr-lineHeight);
          font-size: var(--mnr-fontS4); 
          color: var(--mnr-textColor);
        }
        
        
        body{
          min-width: var(--mnr-minContentWidth);
          width: 100%;
          padding: 0;
          margin: 0;
          max-height: 100vh;
          height: 100vh;
          overflow: hidden; 
        }
        html[mnr-page-loading = "false"] body{
          max-height: unset;
          height: auto;
          overflow: initial;
        }
        
        @media only screen and (min-width: 3000px){
          main{
            max-width: var(--mnr-maxBodyWidth);
          }
          .fixed.fixedC{
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media only screen and (max-width: 320px){
          html {
              overflow-x: auto;
              min-width: var(--mnr-minContentWidth);
          }
        }
     
     
        a{
          color: inherit; 
          text-decoration: none; 
          outline: none;
          font-size: inherit;
        }
        a:focus{
          outline: none; 
          color: none;
        }
        a:hover{
          text-decoration: none; 
          outline: none; 
        }
        span{
          font-size: inherit;
        }
        ul{
          padding-left: 20px;
        }
     
     
     
     
        h1,h2,h3,h4,h5,h6{
          font-family: "title";
          letter-spacing: var(--mnr-titleSpacing);
          line-height:  var(--mnr-titleLineHeight);
          font-weight: 400;
          margin:unset;
        }
     `;

     let temp = ['',2,3];
     for (let i = temp.length - 1; i >= 0; i--) {
        classes += `
          .fontRegular${temp[i]}{
            font-family: "regular${temp[i]}";
            line-height:  var(--mnr-lineHeight);
          }
          .fontTitle${temp[i]}{
            font-family: "title${temp[i]}";
            letter-spacing: var(--mnr-titleSpacing);
            line-height:  var(--mnr-titleLineHeight);
          }
        `;
     }

     classes += `
     
        .fontBold{
          font-weight: bold;
        }
        .fontLight{
          font-weight: lighter;
        }
        strong{
          font-weight: bold;
        }
     `;
    
     for (let j = 6; j >= 1; j--) {
         classes += `
            h${j}{
              font-size:var(--mnr-fontS${j});
            }
         `;
     }

     classes += `
       input{outline: none;}
       input:focus::-webkit-input-placeholder{color: transparent;}
       input:focus:-moz-placeholder{color: transparent;}
       input:focus::-moz-placeholder{color: transparent;}
       input:focus:-ms-input-placeholder {color: transparent;}
       input:focus{outline: none}
       textarea:focus::-webkit-input-placeholder{color: transparent;}
       textarea:focus:-moz-placeholder{color: transparent;}
       textarea:focus::-moz-placeholder{color: transparent;}
       textarea:focus:-ms-input-placeholder {color: transparent;}
       textarea:focus{outline: none}
       input, select, textarea, .button, button{
         -o-text-overflow: clip;
         text-overflow: clip;
         min-height: var(--mnr-btnHeight);
         padding-left: 10px!important;
         padding-right: 10px!important;
         background-color: white;
         border: var(--mnr-inputBorder);
         border-radius: var(--mnr-inputRadius);
         width: 100%;
         color: var(--mnr-inputTextColor);
       }
       input, textarea, selectable{
     `;
       setCross('user-select: text!important');
     classes += `
         -webkit-touch-callout: text!important;
       }

       textarea{
         min-height: 300px;
         resize: none;
       }


       input[type="range"]{
         -webkit-appearance: none;
         width: calc(100% - 5px);
         height: 4px;
         border-radius: 20px;  
         background-color: var(--mnr-colorBlack);
         outline: none;
         opacity: 0.9;
         -webkit-transition: .2s;
         transition: opacity .2s;
         margin-top: 10px;
         margin-bottom: 10px;
       }
       input[type="range"]:hover{
         opacity: 1;
       }
       input[type="range"]::-webkit-slider-thumb {
         -webkit-appearance: none;
         appearance: none;
         width: 20px;
         height: 20px;
         border-radius: 50%; 
         background-color: var(--mnr-color2);
         cursor: pointer;
       }
       input[type="range"]::-moz-range-thumb {
         width: 20px;
         height: 20px;
         border-radius: 50%;
         background-color: var(--mnr-color2);
         cursor: pointer;
       }

       /* Chrome, Safari, Edge, Opera */
       input.noArrow::-webkit-outer-spin-button,
       input.noArrow::-webkit-inner-spin-button {
         -webkit-appearance: none;
         margin: 0;
       }
       /* Firefox */
       input[type=number].noArrow {
         -moz-appearance: textfield;
       }

       input[type=checkbox], 
       input[type=radio] {
         height: 15px!important;
         width: 15px!important;
         min-height: 15px!important;
         background: #fff;
         cursor: pointer;
         display:inline-block;
         padding: 0;
       }
       input[type=checkbox]:checked{
         background: var(--mnr-colorOk)!important;
       }


       ::-webkit-credentials-auto-fill-button {
           visibility: hidden;
           pointer-events: none;
           position: absolute;
           right: 0;
       }
     `;
     
     temp = ['::-webkit-input-placeholder','::-moz-placeholder',':-ms-input-placeholder',':-moz-placeholder'];
     for (let i = temp.length - 1; i >= 0; i--) {
       classes += `${temp[i]}{ 
                     color: inherit;
                     font-size: var(--mnr-fontS4);
                     font-family: "regular";
                     opacity: 1;
                  }`;
     }
     classes += `

       /*///////////////////////////////////////////////////////Inputs - Botones*/

       input[type="submit"], 
       input#submit,
       button,
       .button{
         border: var(--mnr-btnBorder);
         border-radius: var(--mnr-btnRadius);

         cursor: pointer;
         padding-top: 0!important;
         padding-bottom: 0!important;
     `;
       setCross('transition: all .2s');

     classes += `

         display:flex!important;

         -webkit-box-pack: center;
         -ms-flex-pack: center;
         justify-content: center;
         -ms-flex-line-pack:center;
         align-content:center;
         -webkit-box-align: center;
         -ms-flex-align: center;
         align-items: center;

         opacity: 1;

         text-align: center;
       }
       input[type="submit"] > *, 
       input#submit > *,
       button > *,
       .button > *{
         text-align: center;
     `;
        setCross('transition: all .2s');

     classes += `
        }

        input[type="submit"]:hover, 
        input#submit:hover,
        button:hover,
        .button:hover{
          opacity: 0.9;
        }

        input#submit.disabled, 
        input#submit:disabled, 
        input#submit:disabled[disabled], 
        button.disabled, 
        button:disabled, 
        button:disabled[disabled], 
        button.button.disabled, 
        button.button:disabled, 
        button.button:disabled[disabled], 
        .button.disabled, 
        .button:disabled, 
        .button:disabled[disabled],
        input[type="submit"].disabled, 
        button.disabled{
          color: black!important;
          opacity: 1!important;
          background-color: var(--mnr-colorDisabled)!important;
          cursor: not-allowed!important;
        }

        section{
          position: relative;
          width: 100%;
          min-width: var(--mnr-minContentWidth)!important;
          height: auto;
          background-size: cover;
          background-repeat: no-repeat;
          overflow: hidden;
        }
        .content,
        .fullContent,
        .expContent,
        .contentGrd,
        .grd{
          position: relative;
          max-width: var(--mnr-contentWidth);
          min-width: var(--mnr-minContentWidth);
          width: 100%;
          padding-left: var(--mnr-padSides);
          padding-right: var(--mnr-padSides);
          overflow: hidden;
          height: auto;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .grd{
          min-width: unset;
          padding-left: 0;
          padding-right: 0;
        }
        .contentGrd,
        .grd{
          display: grid;
          grid-template-columns: repeat(12, [col] 1fr);
          /*grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));*/
          grid-column-gap: var(--mnr-gutter);
          grid-row-gap: var(--mnr-gutter);
          grid-auto-rows: minmax(var(--mnr-item-height), auto);
          grid-auto-flow: row;
        }
        .innerContent{
          max-width: var(--mnr-innerContentWidth);
        }
        .fullContent{
          max-width: initial;
        }
        .contentNoPad{
          padding-left: 0px;
          padding-right: 0px;
        }
        .overflowShow{
          overflow: visible;
        }
        .overflowXShow{
          overflow-x: visible;
        }
        .overflowYShow{
          overflow-y: visible;
        }
        .setOverflow{
          overflow: initial;
        }
        .overflowHide{
          overflow: hidden;
        }


        .flxR,
        .flxC,
        .flxGrd,
        section{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;

          -webkit-box-pack: start;
          -ms-flex-pack: start;

          justify-content: flex-start;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          -ms-flex-line-pack: start;
          align-content: flex-start;
        }
        .flxR,
        .flxGrd{
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;

          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }
        .flxC,
        section{
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }

        section{
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
        
        .rltv{
          position: relative;
        }
        .abs{
          position: absolute;
        }
        .fixed,
        .fixedFull{
          position: fixed;
        }
        .fixed{
          max-width: var(--mnr-maxBodyWidth);
        }
        .posUnset{
          top:unset;
          right:unset;
          left: unset;
          bottom: unset;
        }
        .posT{
          top: 0;
        }
        .posR{
          right: 0;
        }
        .posL{
          left: 0;
        }
        .posRP{
          right: var(--mnr-padSides);
        }
        .posLP{
          left: var(--mnr-padSides);
        }
        .posB{
          bottom: 0;
        }
        .posC{
          right: 0;
          top: 0;
          left: 0;
          bottom: 0;
        }
        
        .absS{
          position: absolute;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
        }



        .scroll{
          overflow-y:auto;
        }
        .scroll::-webkit-scrollbar {
          width: 0px;
        }
        .scroll::-webkit-scrollbar-track {
          background: transparent; 
        }
        .scrollWhite::-webkit-scrollbar-thumb {
          background: var(--mnr-colorWhite);
          opacity: 0.7;
        }
        .scrollWhite::-webkit-scrollbar-thumb:hover {
          opacity: 0;
        }
        .scrollBlack::-webkit-scrollbar-thumb {
          background: var(--mnr-colorBlack); 
          opacity: 0.7;
        }
        .scrollBlack::-webkit-scrollbar-thumb:hover {
          opacity: 0;
        }
        .scrollHor{
          overflow-x: auto;
        }
        .scrollHor::-webkit-scrollbar {
          height: 10px;
        }
        .scrollHor::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .scrollHor::-webkit-scrollbar-thumb {
          background: #888; 
        }
        .scrollHor::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
        .shadow{
          box-shadow: 0px 4px 4px 4px rgb(0 0 0 / 10%);
          -webkit-box-shadow: 0px 4px 4px 4px rgb(0 0 0 / 10%);
        }
        .shadowScreen{
          background-color: rgba(47,47,47,0.4);
        }

        .cursor{
          cursor: pointer;
        }


        .mnrModal{
          height: 100vh;
          top: -120vh;
          position: fixed;
          margin:auto;
        }
        .mnrModal.open{
          top: 0;
        }





        .displayBlock{
          display: block;
        }
        .displayInBlock{
          display: inline-block;
        }
        
    
        .hide,
        .showSm,
        .showFlexSm,
        .showBlockSm,
        .showXs,
        .showFlexXs,
        .showBlockXs,
        .showMd,
        .showFlexMd,
        .showBlockMd,
        .showLg,
        .showFlexLg,
        .showBlockLg{
          display: none;
        }
        .show{
          display: initial;
        }
        .showFlex{
          display: flex;
        }
        .showBlock{
          display: block;
        }

        .anim2{
     `;
        setCross('transition: all .2s');
     classes += `
       }
       .anim3{
     `;
        setCross('transition: all .3s');
     classes += `
       }
       .anim5{
     `;
        setCross('transition: all .5s');
     classes += `
       }
       .anim8{
     `;
        setCross('transition: all .8s');
     classes += `
       }
       .anim16{
     `;
        setCross('transition: all 1.6s');
     classes += `
        }

        @keyframes animHide {
       0% {
         opacity: 1;
       }
       50% {
         z-index: 99999;
       }
       100% {
         opacity: 0.0;
         z-index: -99999;
       }
        }
        @keyframes animExpand {
       0% {
         transform: scale(1);
       }
       100% {
         transform: scale(2);
       }
        }
        @keyframes animShow {
       0% {
         opacity: 0.0;
       }
       50% {
         z-index: -99999;
       }
       100% {
         opacity: 1;
         z-index: 99999;
       }
        }
        @keyframes animContract {
       0% {
         max-width: 200px;
       }
       20% {
         opacity: 0.0;
       }
       100% {
         opacity: 2;
         max-width: 150px;
       }
        }
        @keyframes spin {
         0% {
             transform: rotate(0);
         }
         100% {
             transform: rotate(360deg);
         }
        }
        @keyframes spinInvert {
         0% {
             transform: rotate(0);
         }
         100% {
             transform: rotate(-360deg);
         }
        }
        @keyframes float {
       0% {
         transform: translatey(0px);
       }
       50% {
         transform: translatey(-20px);
       }
       100% {
         transform: translatey(0px);
       }
        }

        .float{
          transform: translatey(0px);
          animation: float 6s ease-in-out infinite;
        }
        .spin{
          animation: spin 5s linear infinite;
        }
        .spinInvert{
          animation: spinInvert 5s linear infinite;
        }
        .reveal{
          animation: animShow 0.3s linear forwards;
        }
        .disapear{
          animation: animHide 0.3s linear forwards;
        }
     `;


     //main loop 
     for (let size = sizesScreenFull.length - 1; size >= 0; size--){
       if(sizesScreenFull[size] != 0){
         classes += `
           @media only screen and (max-width: ${sizesScreenFull[size]}px){

             :root {
               --mnr-padSides: var(--mnr-padSides${sizesPrefixesFull[size]});
             }
         `;
       }

       // textos
       for (let i = 6; i >= 1; i--) {
           classes += `
              .txtS${i}${sizesPrefixesFull[size]}{
                font-size:var(--mnr-fontS${i});
              }
              .txtSpace${i}${sizesPrefixesFull[size]}{
                letter-spacing: ${i}px;
              }
           `;
       }
       classes += `
          
            .txtL${sizesPrefixesFull[size]}{
              text-align: left;
            }
            .txtR${sizesPrefixesFull[size]}{
              text-align: right;
            }
            .txtC${sizesPrefixesFull[size]}{
              text-align: center;
            }
            .txtJ${sizesPrefixesFull[size]}{
              text-align: justify;
            }
            .txtJM${sizesPrefixesFull[size]}{
              text-align: justify;
              -webkit-hyphens: manual;
              -ms-hyphens: manual;
              hyphens: manual;
            }
            .lineBreak${sizesPrefixesFull[size]}{
              line-break: anywhere;
            }
            
            .txtUpper${sizesPrefixesFull[size]}{
              text-transform: uppercase;
            }
            .txtCap${sizesPrefixesFull[size]}{
              text-transform: capitalize;
            }
            .txtSub${sizesPrefixesFull[size]}{
              text-decoration: underline;
            }
            .txtLine${sizesPrefixesFull[size]}{
              text-decoration: line-through;
            }
       `;

       // contenedores y posicion
       classes += `
          .zMax${sizesPrefixesFull[size]}{
            z-index: 9999;
          }
       `;
       for (let i = zIndex.length-1; i >= 1; i--) {
           classes += `
             .z${zIndex[i]}${sizesPrefixesFull[size]} {z-index:${zIndex[i]};}
           `;
       }

       classes += `
          .grdCFull${sizesPrefixesFull[size]}.grd{
            grid-template-columns: repeat(12, [col] 1fr);
          }
       `;
       for (let i = 11; i >= 1; i--) {
          classes += `
           .grdC${i}${sizesPrefixesFull[size]}.grd{
             grid-template-columns: repeat(${i}, [col] 1fr);
           }
          `;
       }
       classes += `
           .grdDense${sizesPrefixesFull[size]}{
             grid-auto-flow: dense;
           }
           .grdNoGttr${sizesPrefixesFull[size]}{
             grid-column-gap: 0px;
             grid-row-gap: 0px;
           }
         
           .grdCFull${sizesPrefixesFull[size]}{
             grid-column: auto / span 12;
           }
       `;
       for (let i = 11; i >= 1; i--) {
           classes += `
            .grdC${i}${sizesPrefixesFull[size]}{
              grid-column:  auto / span ${i};
            }
           `;
       }
       
       // proportional
       for (let i = 11; i >= 2; i--) {
           classes += `
              .grdC${i}.grd .grdCFull${sizesPrefixesFull[size]}
              ,.grdC${i}.grd .grdC${i}${sizesPrefixesFull[size]}
           `;
        
        
           for (let j = sizesPrefixesFull.length - 1; j >= 1; j--) {
             classes += `
               .grdC${i}${sizesPrefixesFull[j]}.grd .grdCFull${sizesPrefixesFull[size]}
               ,.grdC${i}${sizesPrefixesFull[j]}.grd .grdC${i}${sizesPrefixesFull[size]}
             `;
           }
           classes += `
            {
              grid-column:  auto / span ${i};
            }
           `;
           
           
           for (let j = 1; j >= i; j--) {
             for (let k = sizesPrefixesFull.length - 1; k >= 0; k--) {
               classes += `
                 .grdC${i}${sizesPrefixesFull[k]}.grd .grdC${j}${sizesPrefixesFull[size]}
               `;
             }
             classes += `
               {
                 grid-column:  auto / span ${j};
               }
             `;
           }
       }
        
       classes += `
          .grdCSAuto${sizesPrefixesFull[size]}{
            grid-column-start: auto;
          }
       `;
       for (let i = 12; i >= 1; i--) {
          classes += `
            .grdCS${i}${sizesPrefixesFull[size]}{
              grid-column-start: ${i};
            }
            .grdR${i}${sizesPrefixesFull[size]}{
              grid-row:auto / span ${i};
            }
            .grdRS${i}${sizesPrefixesFull[size]}{
              grid-row-start: ${i};
            }
          `;
       }

       // flexbox 
       classes += `
         .flxR${sizesPrefixesFull[size]}{
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
         }
         .flxC${sizesPrefixesFull[size]}{
           -webkit-box-orient: vertical;
           -webkit-box-direction: normal;
           -ms-flex-direction: column;
           flex-direction: column;
         }
         .flxNoWrap${sizesPrefixesFull[size]}{
           -ms-flex-wrap: nowrap;
           flex-wrap: nowrap;
         }
         
         .ordC${sizesPrefixesFull[size]}{
           -webkit-box-pack: center;
           -ms-flex-pack: center;
           justify-content: center;
           -ms-flex-line-pack:center;
           align-content:center;
           -webkit-box-align: center;
           -ms-flex-align: center;
           align-items: center;
         }
         .ordS${sizesPrefixesFull[size]}{
           -webkit-box-pack: start;
           -ms-flex-pack: start;
           justify-content: flex-start;
           -ms-flex-line-pack:start;
           align-content:flex-start;
           -webkit-box-align: start;
           -ms-flex-align: start;
           align-items: flex-start;
         }
         .ordE${sizesPrefixesFull[size]}{
           -webkit-box-pack: end;
           -ms-flex-pack: end;
           justify-content: flex-end;
           -ms-flex-line-pack:end;
           align-content:flex-end;
           -webkit-box-align: end;
           -ms-flex-align: end;
           align-items: flex-end;
         }
         .ordSB${sizesPrefixesFull[size]}{
           -webkit-box-pack: justify;
           -ms-flex-pack: justify;
           justify-content: space-between;
         }
         .ordSA${sizesPrefixesFull[size]}{
           -ms-flex-pack: distribute;
           justify-content: space-around;
         }
         
         .itmC${sizesPrefixesFull[size]}{
           -webkit-box-align: center;
           -ms-flex-align: center;
           align-items: center;
           -ms-flex-line-pack:center;
           align-content:center;
         }
         .itmS${sizesPrefixesFull[size]}{
           -webkit-box-align: start;
           -ms-flex-align: start;
           align-items: flex-start;
           -ms-flex-line-pack:start;
           align-content:flex-start;
         }
         .itmE${sizesPrefixesFull[size]}{
           -webkit-box-align: end;
           -ms-flex-align: end;
           align-items: flex-end;
           -ms-flex-line-pack:end;
           align-content:flex-end;
         }
         
         .lnC${sizesPrefixesFull[size]}{
           -ms-flex-line-pack:center;
           align-content:center;
         }
         .lnS${sizesPrefixesFull[size]}{
           -ms-flex-line-pack:start;
           align-content:flex-start;
         }
         .lnE${sizesPrefixesFull[size]}{
           -ms-flex-line-pack:end;
           align-content:flex-end;
         }
         .lnSB${sizesPrefixesFull[size]}{
           -ms-flex-line-pack:justify;
           align-content:space-between;
         }
         .lnSA${sizesPrefixesFull[size]}{
           -ms-flex-line-pack:distribute;
           align-content:space-around;
         }
         
         .flxGrd${sizesPrefixesFull[size]}{
           padding-right: calc( var(--mnr-padSides) - var(--mnr-gutter));
         }
         .flxGrd${sizesPrefixesFull[size]} > *{
           min-height: var(--mnr-item-height);
           margin-right: var(--mnr-gutter);
           margin-bottom: var(--mnr-gutter);
         }


         .flxFull${sizesPrefixesFull[size]}{
           width: calc(100% - (var(--mnr-gutter)));
         }
       `;
       for (let i = 11; i >= 1; i--) {
         classes += `
           .flx${i}${sizesPrefixesFull[size]}{
             width: calc(${100/(12/i)}% - (var(--mnr-gutter)));
           }
         `;
       }

       // colores
       for (let j = colors.length - 1; j >= 0; j--) {
         classes += `
            .color${colors[j]}${sizesPrefixesFull[size]}{
               color:var(--mnr-color${colors[j]}); 
            }
            .colorB${colors[j]}${sizesPrefixesFull[size]}{
               background-color:var(--mnr-color${colors[j]}); 
            }
            .colorSvg${colors[j]}${sizesPrefixesFull[size]},
            .colorSvg${colors[j]}${sizesPrefixesFull[size]} path{
               fill: var(--mnr-color${colors[j]});
            }
            .colorBrd${colors[j]}${sizesPrefixesFull[size]}{
               border:solid 2px var(--mnr-color${colors[j]});
            }

            .colorTo${colors[j]}${sizesPrefixesFull[size]}:hover,
            .button.colorTo${colors[j]}${sizesPrefixesFull[size]}:hover *,
            input[type="submit"].colorTo${colors[j]}${sizesPrefixesFull[size]}:hover *,
            button.colorTo${colors[j]}${sizesPrefixesFull[size]}:hover *{
              color:var(--mnr-color${colors[j]}); 
            }
            .colorBTo${colors[j]}${sizesPrefixesFull[size]}:hover,
            .button.colorBTo${colors[j]}${sizesPrefixesFull[size]}:hover *,
            input[type="submit"].colorBTo${colors[j]}${sizesPrefixesFull[size]}:hover *,
            button.colorBTo${colors[j]}${sizesPrefixesFull[size]}:hover *{
              background-color:var(--mnr-color${colors[j]}); 
            }
            .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover path,
            .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover svg path,
            .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover svg,
            .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover{
              fill:var(--mnr-color${colors[j]}); ;
            }
            .colorBrdTo${colors[j]}${sizesPrefixesFull[size]}:hover,
            .button.colorBrdTo${colors[j]}${sizesPrefixesFull[size]}:hover *,
            input[type="submit"].colorBrdTo${colors[j]}${sizesPrefixesFull[size]}:hover *,
            button.colorBrdTo${colors[j]}${sizesPrefixesFull[size]}:hover *{
              border:solid 2px var(--mnr-color${colors[j]});
            }
         `;
       }
       classes += `
          
         .colorTWhite${sizesPrefixesFull[size]}{
           color: white;
         }
         .colorTBlack${sizesPrefixesFull[size]}{
           color: black;
         }
         .colorUnset${sizesPrefixesFull[size]}{
           color: unset;
         }
         .colorTrans${sizesPrefixesFull[size]}{
           color: rgba(0,0,0,0);
         }
         .colorBTWhite${sizesPrefixesFull[size]}{
           background-color: white;
         }
         .colorBTBlack${sizesPrefixesFull[size]}{
           background-color: black;
         }
         .colorBUnset${sizesPrefixesFull[size]}{
           background-color: unset;
         }
         .colorBTrans${sizesPrefixesFull[size]}{
           background-color: rgba(0,0,0,0);
         }
         .colorBrdTWhite${sizesPrefixesFull[size]}{
           border:solid 2px white;
         }
         .colorBrdTBlack${sizesPrefixesFull[size]}{
           border:solid 2px black;
         }
         .colorBrdTrans${sizesPrefixesFull[size]}{
           border:solid 2px rgba(0,0,0,0);
         }
         .colorSvgTWhite${sizesPrefixesFull[size]},
         .colorSvgTWhite${sizesPrefixesFull[size]} path{
            fill: white;
         }
         .colorSvgTBlack${sizesPrefixesFull[size]},
         .colorSvgTBlack${sizesPrefixesFull[size]} path{
            fill: black;
         }


         .colorToTWhite${sizesPrefixesFull[size]}:hover,
         .button.colorToTWhite${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorToTWhite${sizesPrefixesFull[size]}:hover *,
         button.colorToTWhite${sizesPrefixesFull[size]}:hover *{
           color:white;
         }
         .colorToTBlack${sizesPrefixesFull[size]}:hover,
         .button.colorToTBlack${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorToTBlack${sizesPrefixesFull[size]}:hover *,
         button.colorToTBlack${sizesPrefixesFull[size]}:hover *{
           color:black;
         }
         .colorToTrans${sizesPrefixesFull[size]}:hover,
         .button.colorToTrans${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorToTrans${sizesPrefixesFull[size]}:hover *,
         button.colorToTrans${sizesPrefixesFull[size]}:hover *{
           color:rgba(0,0,0,0);
         }

         .colorBToTWhite${sizesPrefixesFull[size]}:hover,
         .button.colorBToTWhite${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorBToTWhite${sizesPrefixesFull[size]}:hover *,
         button.colorBToTWhite${sizesPrefixesFull[size]}:hover *{
           background-color:white;
         }
         .colorBToTBlack${sizesPrefixesFull[size]}:hover,
         .button.colorBToTBlack${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorBToTBlack${sizesPrefixesFull[size]}:hover *,
         button.colorBToTBlack${sizesPrefixesFull[size]}:hover *{
           background-color:black;
         }
         .colorBToTrans${sizesPrefixesFull[size]}:hover,
         .button.colorBToTrans${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorBToTrans${sizesPrefixesFull[size]}:hover *,
         button.colorBToTrans${sizesPrefixesFull[size]}:hover *{
           background-color:rgba(0,0,0,0);
         }


         .colorSvgToTWhite${sizesPrefixesFull[size]}:hover path,
         .colorSvgToTWhite${sizesPrefixesFull[size]}:hover svg path,
         .colorSvgToTWhite${sizesPrefixesFull[size]}:hover svg,
         .colorSvgToTWhite${sizesPrefixesFull[size]}:hover{
           fill:white;
         }
         .colorSvgToTBlack${sizesPrefixesFull[size]}:hover path,
         .colorSvgToTBlack${sizesPrefixesFull[size]}:hover svg path,
         .colorSvgToTBlack${sizesPrefixesFull[size]}:hover svg,
         .colorSvgToTBlack${sizesPrefixesFull[size]}:hover{
           fill:black;
         }
         .colorSvgToTrans${sizesPrefixesFull[size]}:hover path,
         .colorSvgToTrans${sizesPrefixesFull[size]}:hover svg path,
         .colorSvgToTrans${sizesPrefixesFull[size]}:hover svg,
         .colorSvgToTrans${sizesPrefixesFull[size]}:hover{
           fill:rgba(0,0,0,0);
         }

         .colorBrdTWhite${sizesPrefixesFull[size]}:hover,
         .button.colorBrdTWhite${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorBrdTWhite${sizesPrefixesFull[size]}:hover *,
         button.colorBrdTWhite${sizesPrefixesFull[size]}:hover *{
           border:solid 2px white;
         }
         .colorBrdTBlack${sizesPrefixesFull[size]}:hover,
         .button.colorBrdTBlack${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorBrdTBlack${sizesPrefixesFull[size]}:hover *,
         button.colorBrdTBlack${sizesPrefixesFull[size]}:hover *{
           border:solid 2px black;
         }
         .colorBrdToTrans${sizesPrefixesFull[size]}:hover,
         .button.colorBrdToTrans${sizesPrefixesFull[size]}:hover *,
         input[type="submit"].colorBrdToTrans${sizesPrefixesFull[size]}:hover *,
         button.colorBrdToTrans${sizesPrefixesFull[size]}:hover *{
           border:solid 2px rgba(0,0,0,0);
         }
       `;

       // espacios
       for (let i = spaces.length - 2; i >= 0; i--) {
         for (let j = dirs.length - 2; j >= 0; j--) {
           classes += `
               .p${dirs[j]}${spaces[i]}${sizesPrefixesFull[size]}{
                 padding${(prefix[j] == '')? '' : '-' }${prefix[j]}: ${spaces[i]}px;
               }
               .m${dirs[j]}${spaces[i]}${sizesPrefixesFull[size]}{
                 margin${(prefix[j] == '')? '' : '-' }${prefix[j]}: ${spaces[i]}px;
               }
            `;
         }
       }
       classes += `
         .pL${sizesPrefixesFull[size]}{
           padding-left: var(--mnr-padSides);
         }
         .pR${sizesPrefixesFull[size]}{
           padding-right: var(--mnr-padSides);
         }
         .pRGttr${sizesPrefixesFull[size]}{
           padding-right: var(--mnr-gutter);
         }
         .pLGttr${sizesPrefixesFull[size]}{
           padding-left: var(--mnr-gutter);
         }
         .mL${sizesPrefixesFull[size]}{
           margin-left: var(--mnr-padSides);
         }
         .mR${sizesPrefixesFull[size]}{
           margin-right: var(--mnr-padSides);
         }
         .mAuto${sizesPrefixesFull[size]}{
           margin: auto;
         }
       `;
       for (let j = dirs.length - 2; j >= 0; j--) {
         classes += `
            .m${dirs[j]}Auto${sizesPrefixesFull[size]}{
              margin${(prefix[j] == '')? '' : '-' }${prefix[j]}: auto;
            }
            .m${dirs[j]}Gttr${sizesPrefixesFull[size]}{
              margin${(prefix[j] == '')? '' : '-' }${prefix[j]}: var(--mnr-gutter);
            }
            .p${dirs[j]}Gttr${sizesPrefixesFull[size]}{
              padding${(prefix[j] == '')? '' : '-' }${prefix[j]}: var(--mnr-gutter);
            }
         `;
       }

       // imagenes
       for (let j = dirs.length - 1; j >= 0; j--) {
         classes += `
            .back${dirs[j]}${sizesPrefixesFull[size]}{
              background-position: ${prefix[j]};
            }
         `;
       }

       classes += `
         .backCover${sizesPrefixesFull[size]}{
           background-size: cover;
           background-repeat: no-repeat;
         }
         .backContain${sizesPrefixesFull[size]}{
           background-size: contain;
           background-repeat: no-repeat;
         }
         .backFixed${sizesPrefixesFull[size]}{
           background-size: cover;
           background-attachment: fixed;
           background-repeat: no-repeat;
         }
         .imgCover${sizesPrefixesFull[size]}{
           object-fit: cover;
         }
         .imgContain${sizesPrefixesFull[size]}{
           object-fit: contain;
         }
         .imgInit${sizesPrefixesFull[size]}{
           object-fit: initial;
         }
       `;
       for (let j = 10; j >= 0; j--){
          classes += `
             .opacity${j}${sizesPrefixesFull[size]}{
               opacity: 0.${j};
             }
          `;
       }

       classes += `
          .opacityFull${sizesPrefixesFull[size]}{
            opacity: 1;
          }
       `;

       // display
       classes += `
          .hide${sizesPrefixesFull[size]}{
            display: none;
          }
          .show${sizesPrefixesFull[size]}{
            display: initial;
          }
          .showFlex${sizesPrefixesFull[size]}{
            display: flex;
          }
          .showBlock${sizesPrefixesFull[size]}{
            display: block;
          }
       `;

       // tamaños
       for (let j = spacesW.length - 1; j >= 0; j--) {
         classes += `
            .w${spacesW[j]}${sizesPrefixesFull[size]}{
              width:${spacesW[j]}%;
            }
         `;
       }
       for (let j =  spacesT.length - 1; j >= 0; j--) {
         classes += `
            .wMin${spacesT[j]}${sizesPrefixesFull[size]}{
              min-width:${spacesT[j]}px;
            }
            .wMax${spacesT[j]}${sizesPrefixesFull[size]}{
              max-width:${spacesT[j]}px;
            }
            .h${spacesT[j]}${sizesPrefixesFull[size]}{
              height:${spacesT[j]}px;
            }
            .hMin${spacesT[j]}${sizesPrefixesFull[size]}{
              min-height:${spacesT[j]}px;
            }
            .hMax${spacesT[j]}${sizesPrefixesFull[size]}{
              max-height:${spacesT[j]}px;
            }
            .s${spacesT[j]}${sizesPrefixesFull[size]}{
              width: ${spacesT[j]}px;
              height: ${spacesT[j]}px;
            }
         `;
       }
       for (let j = round.length - 1; j >= 0; j--) {
         classes += `
            .round${round[j]}${sizesPrefixesFull[size]}{
              border-radius: ${round[j]}px;
            }
         `;
       }

       classes += `
          .wFull${sizesPrefixesFull[size]}{
            width: 100%;
          }
          .wFullvw${sizesPrefixesFull[size]}{
            width: 100vw;
          }
          .wMaxFullvw${sizesPrefixesFull[size]}{
            max-width:100vw;
          }
          .wMinFullvw${sizesPrefixesFull[size]}{
            min-width:100vw;
          }
          .w1-3${sizesPrefixesFull[size]}{
            width:33.33%;
          }

          .wFullPads${sizesPrefixesFull[size]}{
            width: calc(100% - (var(--mnr-padSides) * 2) );
          }
          .wMaxFullPads${sizesPrefixesFull[size]}{
            max-width: calc(var(--mnr-contentWidth) - (var(--mnr-padSides) * 2) )!important;
          }
          .wMaxInner${sizesPrefixesFull[size]}{
            max-width: var(--mnr-innerContentWidth);
          }
          .wAuto${sizesPrefixesFull[size]}{
            width: auto;
          }


          .hAuto${sizesPrefixesFull[size]}{
            height: auto;
          }
          .hFull${sizesPrefixesFull[size]}{
            height:100%;
          }
          .hFullvh${sizesPrefixesFull[size]}{
            height:100vh;
          }
          .hMaxFull${sizesPrefixesFull[size]}{
            max-height:100%;
          }
          .wMaxFullvw${sizesPrefixesFull[size]}{
            max-height:100vh;
          }
          .wMinFullvw${sizesPrefixesFull[size]}{
            min-height:100vh;
          }

          .round${sizesPrefixesFull[size]}{
            border-radius: 50%;
          }
       `;

       if(sizesScreenFull[size] != 0){
         classes += `
           }
         `;
       }

     }//end main screen sizes
      


    return classes;
  };//end css
  const loadStyles = (loadCss) => {
    let style = e('[mnr-main-css]').e[0];
    if(style == null){
      style = document.createElement('style');
      e(style).attr('mnr-main-css',true);
      document.head.insertBefore(style, e("head meta").e[0]);
    }

    style.textContent = setCss(loadCss);
  };

  //////////////////////////////////////////////////expose
  return {
    //variables
    b,
    root,
    assetsPath,
    binders,

    //methods
    init,
    reload,
    onLoad,
    onScroll,


    bindPush,
    
    el:null,
    e,
    u,
  }

})();