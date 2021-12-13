
(()=>{
  let sizesScreenFull = [0,1140,960,720,500];
  let sizesPrefixesFull = ['','Lg','Md','Sm','Xs'];

   /*////////////////////////////////////////////////////////////////////////////////////*/
  /*////////////////////////////////////////////////////////////////////Contenedores*/
  let classes = `
   
   
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
   
   
   
   .Mnr .rltv{
     position: relative;
   }
   .Mnr .abs{
     position: absolute;
   }
   .Mnr .fixed,
   .Mnr .fixedFull{
     position: fixed;
   }
   .Mnr .posUnset{
     top:unset;
     right:unset;
     left: unset;
     bottom: unset;
   }
   .Mnr .posT{
     top: 0;
   }
   .Mnr .posR{
     right: 0;
   }
   .Mnr .posL{
     left: 0;
   }
   .Mnr .posRP{
     right: var(--mnr-padSides);
   }
   .Mnr .posLP{
     left: var(--mnr-padSides);
   }
   .Mnr .posB{
     bottom: 0;
   }
   .Mnr .posC{
     right: 0;
     top: 0;
     left: 0;
     bottom: 0;
   }
   
   .Mnr .absS{
     position: absolute;
     top:0;
     left: 0;
     width: 100%;
     height: 100%;
   }

  `;

let zIndex = ['-1','1','2','3','4','5','10','15','20'];
for (let i = 0; i < zIndex.length; i++) {
   classes += `
     .Mnr .z${zIndex[i]} {z-index:${zIndex[i]};}
   `;
}
classes += `
  .Mnr .zMax{
    z-index: 9999;
  }
  @media only screen and (min-width: 3000px){
    .Mnr .fixed{
      max-width: var(--mnr-maxBodyWidth);
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    } 
  }
`;


/*///////////////////////////////////////////////////////Alineaciones & Orden - Grid*/
classes += `

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
`;



for (var size = 0; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
   classes += `
     @media only screen and (max-width: ${sizesScreenFull[size]}px){
   `;
  }
  
  
  
  classes += `
    .grdCFull${sizesPrefixesFull[size]}.grd{
      grid-template-columns: repeat(12, [col] 1fr);
    }
  `;
  for (let i = 1; i < 12; i++) {
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
  for (let i = 1; i < 12; i++) {
    classes += `
     .grdC${i}${sizesPrefixesFull[size]}{
       grid-column:  auto / span ${i};
     }
    `;
  }
  
  
  // proportional
  for (let i = 2; i < 12; i++) {
     classes += `
        .grdC${i}.grd .grdCFull${sizesPrefixesFull[size]}
        ,.grdC${i}.grd .grdC${i}${sizesPrefixesFull[size]}
     `;
  
  
     for (let j = 1; j < sizesPrefixesFull.length; j++) {
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
     
     
     for (let j = 1; j < i; j++) {
       for (let k= 0; k < sizesPrefixesFull.length; k++) {
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
  for (let i = 1; i < 13; i++) {
    classes += `
      .grdCS${i}${sizesPrefixesFull[size]}{
        grid-column-start: ${i};
      }
    `;
  }
  for (let i = 1; i < 13; i++) {
    classes += `
      .grdR${i}${sizesPrefixesFull[size]}{
        grid-row:auto / span ${i};
      }
    `;
  }
  for (let i = 1; i < 13; i++) {
    classes += `
      .grdRS${i}${sizesPrefixesFull[size]}{
        grid-row-start: ${i};
      }
    `;
  }
    


  if(sizesScreenFull[size] != 0){
    classes += `
       }
    `;
  }

}



/*///////////////////////////////////////////////////////Alineaciones & Orden - Flexbox*/
classes += `
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

`;



for (let size = 0; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
   classes += `
     @media only screen and (max-width: ${sizesScreenFull[size]}px){
   `;
  }

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
  for (let i = 1; i < 12; i++) {
    classes += `
      .flx${i}${sizesPrefixesFull[size]}{
        width: calc(${100/(12/i)}% - (var(--mnr-gutter)));
      }
    `;
  }

  
  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }

}




return classes;



})();