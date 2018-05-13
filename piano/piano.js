window.addEventListener("orientationchange",onOrientationchange ,false);
   function onOrientationchange() {
      if (window.orientation === 180 || window.orientation === 0) {
              //直式
      }
      if (window.orientation === 90 || window.orientation === -90 ){
              //橫式
      }
   }
