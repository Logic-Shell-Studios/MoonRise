// MoonRise Engine Version 5.0

const Mnr = (function(){
  
  ////////////////////variables
  let running = false;
  let binders = [];
  let currentBody = null;
  let currentTitle = null;
  let imgList = {dones:0,iter:0,elems:[]};
  let scrollOld = 0;
  let scrollSensitivity = 40;
  let timeAddStatus = null;
  let scrollImgOffset = 500;
  let componentsHTML =[];
  let componentsCount =0;
  let classBinds = [];
  let tagBinds = [];
  let debounceBinds = 20;
  let b = {};
  let bCalls = {};
  let initialBinds = {
    pageLoading: true,
    windowWidth: 0,
    windowHeight: 0,
  };

  let start = null;

  let loadRun = [];

  let scrollRun = [];

  let version = '5.0';



  ///////////////////////////////////////////////////methods
  

  ///////////////////////////////////initials
  const init = (options = {}) => {
    if(running){
      return;
    }
    running = true;
    
    e('html').attr('mnr-loading',true);

    // set options
    if(options['debounceBindTime'] != null){
     debounceBinds = options['debounceBindTime'];
    }
    if(options['onLoad'] != null){
      Object.values(options['onLoad']).map(value => {
          onLoad(null,value);
      });
    }
    if(options['binds'] != null){
      setBinds(options['binds']);
    }
    setBinds(initialBinds);
    
   
    
    window.addEventListener('scroll',handleScroll);
    window.addEventListener('resize',handleResize);
    window.addEventListener('DOMContentLoaded',finishLoad);
  };
  const finishLoad = () => {
      // manage media loading
      loadMedia();

      if(b.pageLoading == true){
        console.log('MOONRISE '+version+' running');

        handleScroll();
        handleResize();
       
        bindAll();
        forceAllBinds();

        //run functions after finish load once
        runLoads();


        b.pageLoading = false;
        e('html').attr('mnr-loading',false);
      }
  };
  const reload = () => {
      b.pageLoading = true;
      e('html').attr('mnr-loading',true);

      finishLoad();
  };

  const onLoad = (binds = null, funct = null) => {
    if(binds != null){
      setBinds(binds);
    }
    if(typeof funct === 'function'){
      loadRun.push(funct);
      if(b.pageLoading == false){
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
    
  

  ///////////////////////////////////performance
  const debounce = (cb, delay = 500) => {
    let timeout;
  
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    }
  };
  

  ///////////////////////////////////binders
  const setBinderTree = () =>{
    let bindEls = Array.from(e('[mnr-bind]:not([mnr-bind="set"])').e).map(el=>{ 
                   return {
                    el,
                    list:e(el).attr('mnr-bind').replace(/\s/g, ''),
                    binds:[],
                    event:null,
                    type:null,
                   } 
                 });

    bindEls.map(el=>{
       let list = el.list.split(',');
       let def = getDefaultBindData(el.el);
       el.event = def.event;
       el.type = def.type;
       e(el.el).attr('mnr-bind','set');
       if(list.length == 1 && list[0].split(':').length == 1){
         el.binds.push({
           attr: def.attr,
           prop: list[0],
         });
         return;
       }
       let pairs = list.map(l=>{
         let pair = l.split(':');
         return {
           attr: (!!pair[0])? ((pair[0] == 'text')? 'innerText': pair[0]) : def.attr,
           prop: (!!pair[1])? pair[1] : null,
         };
       });

       pairs = pairs.filter(p=>{
         if(!!p.attr){
           p.prop = p.prop ?? pairs.filter(p=>p.prop != null)[0]?.prop;
           return true; 
         }
         return false;
           
       });
       
       el.binds = pairs;
    });
    


    assignToBinder(bindEls);
  };
  const assignToBinder = (data) =>{
    data.map(el=>{
       let props = el.binds.map(bi=>{
          pushToBinder({
           el: el.el,
           attrs: [bi.attr],
           event: el.event,
           type: el.type,
           bind: bi.prop,
          });
       });
    });

    Object.keys(b).map(bi=>{
      pushToBinder({
        el: null,
        attrs: null,
        event: null,
        type: null,
        bind: bi,
      });
    });
  }
  const getDefaultBindData = (el) =>{
    let attr = 'innerText';
    let event = null;
    let type = 'text';
    switch(el.nodeName){
       case "INPUT":
         attr = 'value';
         event = 'keyup';
         type = el.type;
         if(!!type == false){
           type = 'text';
         }
         if(type != 'text'){
           event = 'change';
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
         type = null;
       break;
    }
    attr = e(el).attr('mnr-bind-attr') ?? attr;
    event = e(el).attr('mnr-bind-event') ?? event;
    return {attr,event,type};
  };
  const pushToBinder = ({el,attrs,event,type,bind}) =>{
    
    let elData = {
      el,
      attrs,
      event,
      type,
    }
    if(u.hasKey(binders, bind)){
      if(elData.el){
        let pos = u.findPosByProp('el',el,binders[bind].elems);
        if(pos === false){
          binders[bind].elems.push(elData);
        }
        else{
          binders[bind].elems[pos].attrs = [...binders[bind].elems[pos].attrs,...attrs]; 
          binders[bind].elems[pos].attrs = u.removeDuplicate(binders[bind].elems[pos].attrs);
        }
      }
    }
    else{
      if(elData.el){
        binders[bind] = {elems:[elData],bind,calls:[]};
      }
      else{
        binders[bind] = {elems:[],bind,calls:[]};
      }
    }
  }
  const bindAll = () => {
    setBinderTree();

    for (let bind of Object.keys(b) ) {
        if(u.hasKey(binders, bind) == false) continue;

        binders[bind].elems.map(elem=>{
            let el = elem.el;
            let attrs = elem.attrs;
            let type = elem.type;
            let event = elem.event;
            //element set default values
            if(!!(e(el).attr('mnr-bind-set'))){
              
              if(el.nodeName == 'SELECT' && type == 'multiple'){
                let options = e("option[selected]",el).e;
                let selected = Array.from(options).map(elm => elm.value);
                b[bind] = selected;
              }
              else{
                attrs.map(a=>{
                  b[bind] = el[a];
                });
              }
            }

            // add events
            // console.log(`currentBind : ${el.nodeName} ${attrs}  ${event} ${bind}`);
            attrs.map(a=>{
              let bindEvent = null;
              if(type == 'multiple' && a == 'value'){
                bindEvent = debounce((ev)=>{
                   let options = e("option:checked",el).e;
                   let selected = Array.from(options).map(elm => elm.value);
                   b[bind] = selected;
                },debounceBinds);
              }
              else if(a == 'value'){
                bindEvent = debounce((ev)=>{
                   // console.log(`binded: ${el.nodeName} - ${a}`);
                   b[bind] = el[a];
                },debounceBinds);
              }

              // add event function
              if(event != null){
                el.addEventListener(event,bindEvent);
              }
            });
        });  
        Bind(bind);
    }
    
    setBindClasses();
    setBindTags();
    
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
                for(let a of elem.attrs){
                  // console.log(a);
                  // console.log(elem.el);
                  if(elem.type == 'multiple' && a == 'value'){
                    for(let opt of e("option",elem.el).e){
                      e(opt).removeAttr('selected');
                    }
                    for(let val of newValue){
                      let opt = e("option[value='"+val+"']",elem.el).e[0];
                      if(opt){
                       e(opt).attr('selected',true);
                       opt.checked = true;
                      }
                    }
                  }
                  else{
                    if(u.hasKey(elem.el,a)){
                      elem.el[a] = newValue;
                    }
                    else{
                      e(elem.el).attr(a,newValue);
                    }
                  }
                }
              }
            }
            
            if(b.pageLoading == false){
              runAllBinds(prop);
            }
        },
        get: () => {
            return value;
        }
    });
    b[prop] = value;
  };
  const forceAllBinds = () => {
    runBindClasses(true);
    runBindTags(true);
  };
  const runAllBinds = debounce((prop) =>{
    runBindClasses();
    runBindTags();

    runBindCalls(prop);
  },200);

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
      if(b.pageLoading == false || force == true){
        
        for (let el of e('[mnr-class]').e){
          let allConds = Object.entries(JSON.parse(el.getAttribute('mnr-class')));
          for (let j = allConds.length - 1; j >= 0; j--) {
          
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
  
  const setBinds = (bind) => {
      if(typeof bind == 'object'){
        let temps = Object.entries(bind);
        for (let temp of temps) {
          b[temp[0]] = temp[1];
        }
      }
      if(b.pageLoading == false){
        bindAll();
      }
  };

  const onUpdate = (callback,prop) => {
    if(bCalls[prop]){
      bCalls[prop].calls.push(callback);
    }
    else{
      bCalls[prop] = {calls:[callback]};
    }
  };
  const runBindCalls = (prop) => {
    if(bCalls[prop]?.calls.length > 0 && binders[prop]){
      bCalls[prop].calls.map(c=>{
        binders[prop].calls.push(c);
      });
      bCalls[prop] = null;
    }

    let _this = this;
    binders[prop]?.calls?.map(c=>{
      c?.call(this);
    });
  };
  
  const setBindTags = () => {
      for(let el of document.querySelectorAll("mnr")){
        if(u.findPosByProp('el',el, tagBinds) === false ){
          tagBinds.push({ev:parseMnrBinds(el.innerText,el) ,el:el});
        }
      }
  };
  const runBindTags = (force = false) => {
       if(b.pageLoading == false || force == true){
          
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
  const handleScroll = () => {
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
      // console.log("update scroll");
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
            el.src = this.attr('mnr-src-loading');
          }
          else{
            try{
             this.css({'background-image': `url(${this.attr('mnr-src-loading')})` });
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
  



  /////////////////////////////////element handler
  const e = (query, rltv = document) => {
    
    
    
    let elem = getQuery(query,rltv);
    
    return {
      e: elem,
      eBack: elem,
      query: [query],
      singleNode: singleNode,
      getQuery: getQuery,
      waiting: false,
      chainPos: 0,
      waitingTotal: 0,
      chain: [],
      chainWait: [],
      result: null,
      results: [],
      addedClasses: [],
      addedAttr: [],
      eventMethods : [],
      q: function(query){
        
        this.e = getQuery(query,this.e[0]);
        this.query.push(query);

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
      css: function(property){
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
      attr: function(attr,val){
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
      html: function(html,add = false,sanitize = true,location='beforeEnd'){

        if(this.isWaiting(['html',[html,add]])){
           return this;
        }

        if(html == null){
          return this.e[0].innerHTML;
        }

        for(let el of this.e){
          if(sanitize){
            html = u.sanitizeStr(html);
          }
          if(!add){
            el.innerHTML = '';
          }
          el.insertAdjacentHTML(location,html);
        }
        
        

        return this;
      },
      text: function(text,add = false){
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
          if(query < 0){
           let tempNum = this.e[0].children.length + query;
           query = tempNum;
          }
          this.e = this.singleNode(this.e[0].children[query]);
        }
        else{
          this.q(query);
        }
        return this;
      },
      el: function(num = 0){
         if(num < 0){
           let tempNum = this.e.length + num;
           num = tempNum;
         }
         return this.e[num];
      },
      elem: function(num = 0){
         this.e = this.singleNode(this.el(num));
         return this; 
      },
      elems: function(){
         this.e = this.eBack;
         return this;
      },
      children: function(num = 0){
        this.e = this.e[num].children;
        return this;
      },
      hasElems: function(){

        return !!(this.e.length);
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
         u.loadBinds();
         return this;
      },
      event: function(events, method){
        
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
      setInScreen: function(offset = 0){
        u.screenTo(this.e[0],offset);
        return this;
      },
      setViewTrigger: function(enter, exit,once){
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
      destroy: function(){
        for(let el of this.e){
          el.remove();
        }
        this.e = [];
        this.eBack = [];
        return this;
      }

    };
  };


  const getQuery = function(query,rltv = document){
       let elem = [];
       if(typeof(query) == 'string'){
         elem = rltv.querySelectorAll(query);
       }
       else{
         elem = singleNode(query);
       }
       return elem;
  }
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
       screenToTop: function(offset = 0, behavior='smooth'){
         let offsetPosition = 0 - offset;
         window.scrollTo({
              top: offsetPosition,
              behavior: behavior
         });
       },
       screenTo: function(elem, offset = 0,behavior='smooth'){
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
              behavior: behavior
         });
       },
       replaceAll: function(str, find, replace) {
       
             return str.replace(new RegExp(find, 'g'), replace);
       },
       mapValue: function(X,A,B,C,D,max = false){
             X = parseFloat(X);
             A = parseFloat(A);
             B = parseFloat(B);
             C = parseFloat(C);
             D = parseFloat(D);
             r =  ((X-A)/(B-A));
             y = ( r * (D-C)) + C;
             let res = Math.trunc(y * 100) / 100;
             if(max){
               res = (res > D)? D : res;
               res = (res < C)? C : res;
             }
             return res;
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
       sanitizeStr: function(str){
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
         
         let html = document.createElement('div');
         html.insertAdjacentHTML('beforeend',str);

         // Sanitize it
         removeScripts(html);
         clean(html);

         return html.innerHTML;
       },
       stringToHTML: function(str) {
         let parser = new DOMParser();
         let doc = parser.parseFromString(str, 'text/html');
         console.log(doc);
         return doc.body || document.createElement('body');
       },
       bool: function(val){
          switch(val){
           case '':
             return false;
           break;
           case 'false':
             return false;
           break;
           case '0':
             return false;
           break;
           case 'null':
             return false;
           break;
          }
          return !!val;   
       },
       loadBinds: function(){
         bindAll();
         loadMedia();
       }
    };
  })();
  


  //////////////////////////////////////////////////expose
  return {
    //variables
    b,
    binders,

    //methods
    init,
    reload,
    onLoad,
    onScroll,
    onUpdate,

    debounce,

  
    
    el:null,
    e,
    u,
  }

})();
Object.freeze(Mnr);