
(()=>{
  let sizesScreenFull = [0,1140,960,720,500];
  let sizesPrefixesFull = ['','Lg','Md','Sm','Xs'];

  let classes = `
   @charset "UTF-8";
   
   /* Variables */
   :root {
     --mnr-color1: #0d1f2c;
     --mnr-color2: #cb2155;
     --mnr-color3: rgb(231,13,108);
     --mnr-color4: #91d4df;
     --mnr-colorWhite: antiquewhite;
     --mnr-colorBlack: rgb(17,19,20);
     --mnr-colorGray: rgb(73, 83, 86);
     --mnr-colorWarn: #be1b1b;
     --mnr-colorOk: #00A86B;
     --mnr-colorRate: #ffeb3b;
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

  `;

  for (let i = 1; i < sizesScreenFull.length; i++) {
    classes += `
       @media only screen and (max-width: ${sizesScreenFull[i]}px){
         :root {
           --mnr-padSides: var(--mnr-padSides${sizesPrefixesFull[i]});
         }
       }
    `;
  }


  /*////////////////////////////////////////////////////////////////////////////////////*/
  /*////////////////////////////////////////////////////////////////////Reglas Generales*/
  classes += `
   
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
   
   
   body*{outline: none}
   ::-webkit-scrollbar {
       width: 10px;
       max-width: 10px;
   }
   ::-webkit-scrollbar-track {
       background: #f1f1f1; 
   }
   ::-webkit-scrollbar-thumb {
       background: #888; 
   }
   ::-webkit-scrollbar-thumb:hover {
       background: #555; 
   }
   
   *{
     -webkit-box-sizing: border-box; 
     -moz-box-sizing: border-box;    
     box-sizing: border-box;   
   
     -webkit-touch-callout: none; 
     -webkit-user-select: none; 
     -khtml-user-select: none; 
     -moz-user-select: none; 
     -ms-user-select: none; 
     user-select: none;      
   
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
     -webkit-transition: all .2s;
     -moz-transition: all .2s;
     -o-transition: all .2s;
     -ms-transition: all .2s;
     transition: all .2s;
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
   .svg{
     transform: none;
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
   pre,
   iframe,
   hr,
   h1,
   h2,
   h3,
   h4,
   h5,
   h6 {
     -moz-osx-font-smoothing: grayscale;
     -webkit-font-smoothing: antialiased;
   }
   
   
   body{
     min-width: var(--mnr-minContentWidth);
     /*max-width: 5000px;*/
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
   }
   @media only screen and (max-width: 320px){
     html {
         overflow-x: auto;
         min-width: var(--mnr-minContentWidth);
     }
   }
  `;




/*/////////////////////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////////////////Textos*/


/*///////////////////////////////////////////////////////////Textos - Normalizacion*/
classes += `
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

p, 
h1,
h2,
h3,
h4, 
h5, 
h6, 
textarea, 
input,
li,
ul,
th,
td,
select,
label,
div,
section{
  text-align: left;
  font-family: "regular";
  line-height:  var(--mnr-lineHeight);
  font-size: var(--mnr-fontS4); 
  color: var(--mnr-textColor);
}




h1,
h2,
h3,
h4,
h5,
h6{
  font-family: "title";
  letter-spacing: var(--mnr-titleSpacing);
  line-height:  var(--mnr-titleLineHeight);
  font-weight: 400;
  margin:unset;
}

.Mnr .fontRegular{
  font-family: "regular";
  line-height:  var(--mnr-lineHeight);
}
.Mnr .fontRegular2{
  font-family: "regular2";
  line-height:  var(--mnr-lineHeight);
}
.Mnr .fontRegular3{
  font-family: "regular3";
  line-height:  var(--mnr-lineHeight);
}
.Mnr .fontTitle{
  font-family: "title";
  letter-spacing: var(--mnr-titleSpacing);
  line-height:  var(--mnr-titleLineHeight);
}
.Mnr .fontTitle2{
  font-family: "title2";
  letter-spacing: var(--mnr-titleSpacing);
  line-height:  var(--mnr-titleLineHeight);
}
.Mnr .fontTitle3{
  font-family: "title3";
  letter-spacing: var(--mnr-titleSpacing);
  line-height:  var(--mnr-titleLineHeight);
}

.Mnr .fontBold{
  font-weight: bold;
}
.Mnr .fontLight{
  font-weight: lighter;
}
strong{
  font-weight: bold;
}



`;

for (let j = 1; j < 7; j++) {
    classes += `
       h${j}{
         font-size:var(--mnr-fontS${j});
       }
    `;
}


for (let size = 0; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
    classes += `
      @media only screen and (max-width: ${sizesScreenFull[size]}px){
    `;
  }

  for (let j = 1; j < 7; j++) {
    classes += `
       .Mnr .txtS${j}${sizesPrefixesFull[size]}{
         font-size:var(--mnr-fontS${j});
       }
       .txtSpace${j}${sizesPrefixesFull[size]}{
         letter-spacing: ${j}px;
       }
    `;
  }
  


  /*///////////////////////////////////////////////////////////Textos - Alineaciones transformacion*/
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

  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }
}





/*/////////////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////Inputs*/

/*///////////////////////////////////////////////////////Inputs - Normalizacion*/

classes +=`
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
input, textarea{
  -webkit-user-select: text!important; /* Chrome, Opera, Safari */
  -moz-user-select: text!important; /* Firefox 2+ */
  -ms-user-select: text!important; /* IE 10+ */
  user-select: text!important; /* Standard syntax */
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
::-webkit-input-placeholder{
  color: inherit;
  font-size: var(--mnr-fontS4);
  font-family: "regular";
  opacity: 1;
}
::-moz-placeholder{
  color: inherit;
  font-size: var(--mnr-fontS4);
  font-family: "regular";
  opacity: 1;
}
:-ms-input-placeholder{
  color: inherit;
  font-size: var(--mnr-fontS4);
  font-family: "regular";
  opacity: 1;
}
:-moz-placeholder {
  color: inherit;
  font-size: var(--mnr-fontS4);
  font-family: "regular";
  opacity: 1;
}

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
  
  -webkit-transition: all .2s;
  -moz-transition: all .2s;
  -o-transition: all .2s;
  -ms-transition: all .2s;
  transition: all .2s;

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

  /*max-width: var(--mnr-btnWidth);*/
}
input[type="submit"] > *, 
input#submit > *,
button > *,
.button > *{
  text-align: center;

  -webkit-transition: all .2s;
  -moz-transition: all .2s;
  -o-transition: all .2s;
  -ms-transition: all .2s;
  transition: all .2s;
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

`;


 

  /*////////////////////////////////////////////////////////////////////////////////////*/
  /*////////////////////////////////////////////////////////////////////Contenedores*/
  classes += `
   
   
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










/*/////////////////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////////Colores*/
let colors = [1,2,3,4,'Warn','Ok','Rate','White','Gray','Black'];
for (let size = 0; size < sizesScreenFull.length; size++) {
  if(sizesScreenFull[size] != 0){
    classes += `
      @media only screen and (max-width: ${sizesScreenFull[size]}px){
    `;
  }

  for (let j = 0; j < colors.length; j++) {
    classes += `
       .Mnr .color${colors[j]}${sizesPrefixesFull[size]}{
          color:var(--mnr-color${colors[j]}); 
       }
       .Mnr .colorB${colors[j]}${sizesPrefixesFull[size]}{
          background-color:var(--mnr-color${colors[j]}); 
       }
       .Mnr .colorSvg${colors[j]}${sizesPrefixesFull[size]},
       .Mnr .colorSvg${colors[j]}${sizesPrefixesFull[size]} path{
          fill: var(--mnr-color${colors[j]});
       }
       .Mnr .colorBrd${colors[j]}${sizesPrefixesFull[size]}{
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
       .Mnr .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover path,
       .Mnr .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover svg path,
       .Mnr .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover svg,
       .Mnr .colorSvgTo${colors[j]}${sizesPrefixesFull[size]}:hover{
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
     
    .Mnr .colorTWhite${sizesPrefixesFull[size]}{
      color: white;
    }
    .Mnr .colorTBlack${sizesPrefixesFull[size]}{
      color: black;
    }
    .Mnr .colorUnset${sizesPrefixesFull[size]}{
      color: unset;
    }
    .Mnr .colorTrans${sizesPrefixesFull[size]}{
      color: rgba(0,0,0,0);
    }
    .Mnr .colorBTWhite${sizesPrefixesFull[size]}{
      background-color: white;
    }
    .Mnr .colorBTBlack${sizesPrefixesFull[size]}{
      background-color: black;
    }
    .Mnr .colorBUnset${sizesPrefixesFull[size]}{
      background-color: unset;
    }
    .Mnr .colorBTrans${sizesPrefixesFull[size]}{
      background-color: rgba(0,0,0,0);
    }
    .Mnr .colorBrdTWhite${sizesPrefixesFull[size]}{
      border:solid 2px white;
    }
    .Mnr .colorBrdTBlack${sizesPrefixesFull[size]}{
      border:solid 2px black;
    }
    .Mnr .colorBrdTrans${sizesPrefixesFull[size]}{
      border:solid 2px rgba(0,0,0,0);
    }
    .Mnr .colorSvgTWhite${sizesPrefixesFull[size]},
    .Mnr .colorSvgTWhite${sizesPrefixesFull[size]} path{
       fill: white;
    }
    .Mnr .colorSvgTBlack${sizesPrefixesFull[size]},
    .Mnr .colorSvgTBlack${sizesPrefixesFull[size]} path{
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


    .Mnr .colorSvgToTWhite${sizesPrefixesFull[size]}:hover path,
    .Mnr .colorSvgToTWhite${sizesPrefixesFull[size]}:hover svg path,
    .Mnr .colorSvgToTWhite${sizesPrefixesFull[size]}:hover svg,
    .Mnr .colorSvgToTWhite${sizesPrefixesFull[size]}:hover{
      fill:white;
    }
    .Mnr .colorSvgToTBlack${sizesPrefixesFull[size]}:hover path,
    .Mnr .colorSvgToTBlack${sizesPrefixesFull[size]}:hover svg path,
    .Mnr .colorSvgToTBlack${sizesPrefixesFull[size]}:hover svg,
    .Mnr .colorSvgToTBlack${sizesPrefixesFull[size]}:hover{
      fill:black;
    }
    .Mnr .colorSvgToTrans${sizesPrefixesFull[size]}:hover path,
    .Mnr .colorSvgToTrans${sizesPrefixesFull[size]}:hover svg path,
    .Mnr .colorSvgToTrans${sizesPrefixesFull[size]}:hover svg,
    .Mnr .colorSvgToTrans${sizesPrefixesFull[size]}:hover{
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

  if(sizesScreenFull[size] != 0){
   classes += `
     }
   `;
  }
}




/*////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////Miscell*/

classes += `
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
.Mnr .shadow{
  box-shadow: 0px 4px 4px 4px rgb(0 0 0 / 10%);
  -webkit-box-shadow: 0px 4px 4px 4px rgb(0 0 0 / 10%);
}
.Mnr .shadowScreen{
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


/*////////////////////////////////////////////////////Miscell - Swiper*/
.swiper-container, 
.swiper-wrapper, 
.swiper-slide, 
.swiper-slide img{
  transition-duration: 300ms;
}
.swiper-slider{
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}
.swiper-button-next,
.swiper-button-prev {
  width: 40px;
  height: 40px;
  background-image: none;
}
.swiper-button-next *,
.swiper-button-prev *{
  width: 30px;
  height: 30px;
}
.swiper-pagination{
  position: relative;
}
.swiper-pagination-bullet-active {
  background: white;
}


`;



classes += '';
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



classes += `
  
 
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



})();