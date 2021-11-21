
Mnr.init({
  binds:{
    
  },
  loadEnter: function(){
   if(document.getElementById('pageLoader')){
      document.getElementById('pageLoader').classList.remove('load');
   }
  },
  loadEnd: function(){
    if(document.getElementById('pageLoader')){
      document.querySelector('#pageLoader .glare').classList.remove('expand');
      document.querySelector('#pageLoader .glare').classList.add('contract');
      setTimeout(()=>{
        document.querySelector('#pageLoader .moon').classList.add('load3');
      },400);
      setTimeout(()=>{
        document.getElementById('pageLoader').classList.add('load');
      },700);
      setTimeout(()=>{
        document.querySelector('#pageLoader').classList.add('hide');
      },1000);
    }
  },
  loadEndTime: 500,
});

