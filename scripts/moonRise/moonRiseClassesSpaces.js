
const mnrClasses = function(){
  let sizesScreen = [1140,960,720,500];
  let sizesScreenFull = [0,1140,960,720,500];
  let sizesPrefixesFull = ['','Lg','Md','Sm','Xs'];
  let zIndex = ['-1','1','2','3','4','5','10','15','20'];

  let classes = '';
/*//////////////////////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////////////Espacios*/


/*///////////////////////////////////////////////////////////////////Espacios*/
let spaces = [0,5,10,15,20,25,30,35,40,45,50,60,70,80,90,100];
let dirs = ['','T','B','R','L'];
let prefix = ['','-top','-bottom','-right','-left'];
for (let size = 0; size < sizesScreenFull.length; size++) {
   if(sizesScreenFull[size] != 0){
    classes += `
      @media only screen and (max-width: ${sizesScreenFull[size]}px){
    `;
   }

   for (let i = 0; i < spaces.length; i++) {
     for (let j = 0; j < dirs.length; j++) {
       classes += `
          .p${dirs[j]}${spaces[i]}${sizesPrefixesFull[size]}{
            padding${prefix[j]}: ${spaces[i]}px;
          }
          .m${dirs[j]}${spaces[i]}${sizesPrefixesFull[size]}{
            margin${prefix[j]}: ${spaces[i]}px;
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
    .mRGttr${sizesPrefixesFull[size]}{
      margin-right: var(--mnr-gutter);
    }
    .mLGttr${sizesPrefixesFull[size]}{
      margin-left: var(--mnr-gutter);
    }
    .mAuto${sizesPrefixesFull[size]}{
      margin: auto;
    }
  `;
  for (let j = 0; j < dirs.length; j++) {
    classes += `
       .m${dirs[j]}Auto${sizesPrefixesFull[size]}{
         margin${prefix[j]}: auto;
       }
    `;
  }
   
  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }
}



/*////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////Imagenes*/

dirs = ['C','T','B','R','L'];
prefix = ['center','top','bottom','right','left'];
for (let size = 0; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
    classes += `
      @media only screen and (max-width: ${sizesScreenFull[size]}px){
    `;
  }

  for (let j = 0; j < dirs.length; j++) {
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

  for (let j = 0; j < 10; j++) {
     classes += `
        .Mnr .opacity${j}${sizesPrefixesFull[size]}{
          opacity: 0.${j};
        }
     `;
  }
  classes += `
     .Mnr .opacityFull${sizesPrefixesFull[size]}{
       opacity: 1;
     }
  `;
  

  

  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }
}


/*////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////Display*/
classes += `
   .Mnr .displayBlock{
     display: block;
   }
   .Mnr .displayInBlock{
     display: inline-block;
   }
   
   .Mnr .mnrHide{
     display: none!important;
   }
   .Mnr .hide,
   .Mnr .showSm,
   .Mnr .showFlexSm,
   .Mnr .showBlockSm,
   .Mnr .showXs,
   .Mnr .showFlexXs,
   .Mnr .showBlockXs,
   .Mnr .showMd,
   .Mnr .showFlexMd,
   .Mnr .showBlockMd,
   .Mnr .showLg,
   .Mnr .showFlexLg,
   .Mnr .showBlockLg{
     display: none;
   }
   .Mnr .show{
     display: initial;
   }
   .Mnr .showFlex{
     display: flex;
   }
   .Mnr .showBlock{
     display: block;
   }
`;
for (let size = 1; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
    classes += `
      @media only screen and (max-width: ${sizesScreenFull[size]}px){
    `;
  }

  classes += `
     .Mnr .hide${sizesPrefixesFull[size]}{
       display: none;
     }
     .Mnr .show${sizesPrefixesFull[size]}{
       display: initial;
     }
     .Mnr .showFlex${sizesPrefixesFull[size]}{
       display: flex;
     }
     .Mnr .showBlock${sizesPrefixesFull[size]}{
       display: block;
     }
  `;

  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }
}





/*////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////Tamaños*/


/*////////////////////////////////////////////////////////////////Tamaños - Horizontal*/
let spacesW = [5,10,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];
spaces = [2,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,150,200,250,300,350,400,450,500,600,800];
let round = [3,6,12,22,36];
for (let size = 0; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
    classes += `
      @media only screen and (max-width: ${sizesScreenFull[size]}px){
    `;
  }

  for (let j = 0; j < spacesW.length; j++) {
    classes += `
       .Mnr .w${spacesW[j]}${sizesPrefixesFull[size]}{
         width:${spacesW[j]}%;
       }
    `;
  }
  for (let j = 0; j < spaces.length; j++) {
    classes += `
       .Mnr .wMin${spaces[j]}${sizesPrefixesFull[size]}{
         min-width:${spaces[j]}px;
       }
       .Mnr .wMax${spaces[j]}${sizesPrefixesFull[size]}{
         max-width:${spaces[j]}px;
       }
       .Mnr .h${spaces[j]}${sizesPrefixesFull[size]}{
         height:${spaces[j]}px;
       }
       .Mnr .hMin${spaces[j]}${sizesPrefixesFull[size]}{
         min-height:${spaces[j]}px;
       }
       .Mnr .hMax${spaces[j]}${sizesPrefixesFull[size]}{
         max-height:${spaces[j]}px;
       }
       .Mnr .s${spaces[j]}${sizesPrefixesFull[size]}{
         width: ${spaces[j]}px;
         height: ${spaces[j]}px;
       }
    `;
  }

  for (let j = 0; j < round.length; j++) {
    classes += `
       .Mnr .round${round[j]}${sizesPrefixesFull[size]}{
         border-radius: ${round[j]}px;
       }
    `;
  }

  classes += `
     .Mnr .wFull${sizesPrefixesFull[size]}{
       width: 100%;
     }
     .Mnr .wFullvw${sizesPrefixesFull[size]}{
       width: 100vw;
     }
     .Mnr .wMaxFullvw${sizesPrefixesFull[size]}{
       max-width:100vw;
     }
     .Mnr .wMinFullvw${sizesPrefixesFull[size]}{
       min-width:100vw;
     }
     .Mnr .w1-3${sizesPrefixesFull[size]}{
       width:33.33%;
     }

     .Mnr .wFullPads${sizesPrefixesFull[size]}{
       width: calc(100% - (var(--mnr-padSides) * 2) );
     }
     .Mnr .wMaxFullPads${sizesPrefixesFull[size]}{
       max-width: calc(var(--mnr-contentWidth) - (var(--mnr-padSides) * 2) )!important;
     }
     .Mnr .wMaxInner${sizesPrefixesFull[size]}{
       max-width: var(--mnr-innerContentWidth);
     }
     .Mnr .wAuto${sizesPrefixesFull[size]}{
       width: auto;
     }


     .Mnr .hAuto${sizesPrefixesFull[size]}{
       height: auto;
     }
     .Mnr .hFull{
       height:100%;
     }
     .Mnr .hFullvh{
       height:100vh;
     }
     .Mnr .hMaxFull{
       max-height:100%;
     }
     .Mnr .wMaxFullvw${sizesPrefixesFull[size]}{
       max-height:100vh;
     }
     .Mnr .wMinFullvw${sizesPrefixesFull[size]}{
       min-height:100vh;
     }

     .Mnr .round{
       border-radius: 50%;
     }

  `;

  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }
}




return classes;



}
mnrClasses();