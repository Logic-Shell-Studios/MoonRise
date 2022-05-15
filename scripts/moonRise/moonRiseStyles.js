// MoonRise Styles

const MnrStyles = (function(){
  
  ////////////////////variables
  
  let sizesScreenFull = [500,720,960,1140,0];
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

  let styleTarget;

  let setCross = function(prop){
    for (let i = cross.length - 1; i >= 0; i--) {
      classes += `${cross[i]}${prop};
      `;
    }
  };

  let classes = '';

  


  classes += `
   @charset "UTF-8";


       .mnrHide{
         display: none!important;
       }


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
          outline: none;   
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

          .asp1-1{
            aspect-ratio: 1/1;
          }
          .asp1-2{
            aspect-ratio: 1/2;
          }
          .asp9-16{
            aspect-ratio: 9/16;
          }
          .asp16-9{
            aspect-ratio: 16/9;
          }
       `;

       if(sizesScreenFull[size] != 0){
         classes += `
           }
         `;
       }

     }//end main screen sizes
      


  window.addEventListener('DOMContentLoaded',()=>{
    styleTarget = document.querySelector('[mnr-styles]');
    if(styleTarget == null){
     console.warn('Can´t find target to add MoonRise Styles add a style tag with attribute "mnr-styles" ');
     return;
    }
    styleTarget.textContent = classes;
  });
  

  
 
  

})();