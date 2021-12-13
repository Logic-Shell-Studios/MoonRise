
var mnrClasses = function(){
   /*/////////////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////Animaciones*/
let classes = `
  
 
.anim2{
  -webkit-transition: all .2s;
  -moz-transition: all .2s;
  -o-transition: all .2s;
  -ms-transition: all .2s;
  transition: all .2s;
}
.anim3{
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  -o-transition: all .3s;
  -ms-transition: all .3s;
  transition: all .3s;
}
.anim5{
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  -ms-transition: all .5s;
  transition: all .5s;
}
.anim8{
  -webkit-transition: all .8s;
  -moz-transition: all .8s;
  -o-transition: all .8s;
  -ms-transition: all .8s;
  transition: all .8s;
}
.anim16{
  -webkit-transition: all 1.6s;
  -moz-transition: all 1.6s;
  -o-transition: all 1.6s;
  -ms-transition: all 1.6s;
  transition: all 1.6s;
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




return classes;



}
mnrClasses();