//select two
    //show time
    var SiteName_s='' ;
    var County_s ='';
    var County_index;
    var SiteName_index;
    function ShowTime(){
        　        var NowDate=new Date();
        　        var h=NowDate.getHours();
        　        var m=NowDate.getMinutes();
        　        var s=NowDate.getSeconds();　
                  var Mo=NowDate.getMonth()+1;//月份
                  var d=NowDate.getDate();//日期
                  var week;
                  switch (NowDate.getDay()){
                    case 1: week="Monday"; break;
                    case 2: week="Tuesday"; break;
                    case 3: week="Wednesday"; break;
                    case 4: week="Thursday"; break;
                    case 5: week="Friday"; break;
                    case 6: week="Saturday"; break;
                    default: week="Sunday";
               }
                  m = checkTime(m);
                  s = checkTime(s);
        　        document.getElementById('showbox').innerHTML = h+':'+m+':'+s;
                  setTimeout('ShowTime()',1000);
                  document.getElementById('spandate').innerHTML= week+'&nbsp;&nbsp;'+Mo+' , '+d;
        　
            }
            function checkTime(i) {
            if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
            return i;
            }
            if(document.getElementById("location-list")){
            var locations=['基隆市','臺中市','雲林縣'];
            var LocationSelect=document.getElementById("location-list");
            var inner="";
            for(var i=0;i<locations.length;i++){
              inner=inner+'<option value=i>'+locations[i]+'</option>';
            }
            LocationSelect.innerHTML=inner;
            var sectors=new Array();
            //基隆市
            sectors[0]=['基隆'];
            // //臺中市
            sectors[1]=['豐原','沙鹿','大里','忠明','西屯'];
            // //雲林縣
            sectors[2]=['斗六','崙背','臺西','麥寮'];
              function changeLocation(index){
              var Sinner="";
              for(var i=0;i<sectors[index].length;i++){
                Sinner=Sinner+'<option value=i>'+sectors[index][i]+'</option>';
              }
              var sectorSelect=document.getElementById("sector-list");
              sectorSelect.innerHTML=Sinner;
              County_index=index;
              SiteName_index=0;
              County_s=locations[County_index];
              SiteName_s=sectors[County_index][SiteName_index];
              call();

            }

            function changeSiteName(index){
               SiteName_index=index;
               SiteName_s=sectors[County_index][SiteName_index];
               call();
              }
            changeLocation(document.getElementById("location-list").selectedIndex);


            }
            
            function call(){
                $.ajax({
                    type: "GET",
                    url: "http://opendata2.epa.gov.tw/AQI.xml",
                    dataType: "xml",
                    error: function (result) {
                      console.log('oh no');
                    },
                    success: function (result) {
                      var SiteName, County, SO2, CO_8hr, AQI, NO, Status;
                      var key = true;

                      for (var i = 0; i < result.getElementsByTagName('Data').length; i++) {
                        SiteName = getNodeValue(result, "SiteName", i);
                        County = getNodeValue(result, "County", i);
                        SO2 = getNodeValue(result, "SO2", i);
                        CO_8hr = getNodeValue(result, "CO_8hr", i);
                        AQI = getNodeValue(result, "AQI", i);
                        NO = getNodeValue(result, "NO", i);
                        Status = getNodeValue(result, "Status", i);

                        if (County==County_s && SiteName_s==SiteName)
                  {
                    document.getElementById('SO2').innerHTML=SO2;
                    document.getElementById('CO8H').innerHTML=CO_8hr;
                    document.getElementById('AQI').innerHTML=AQI;
                    document.getElementById('NO').innerHTML=NO;
                    document.getElementById('STU').innerHTML=Status;

                    setup(); 
                    function setup(){
                      if(cpf){
                          cpf.setPinMode('["resetPin"],["grove_rgblcd_begin", 16, 2],["setPinMode", "digital", 5, "TONE"],["setPinMode", "digital", 6, "OUTPUT"]');
                      }
                  }      
              switch (Status){
                case "良好":
                  cpf.SetSpeech("On","cmn-Hant-TW",SiteName+"狀態良好",0.1,2);
                  cpf.request('["digitalWrite", 6 , 0]');
                  cpf.request('["grove_rgblcd_clear"]');  //清空文字
                  cpf.request('["grove_rgblcd_display", 1]');     
                  cpf.request('["grove_rgblcd_set_rgb", 0, 255, 0]');                  
                  cpf.request('["grove_rgblcd_print", 0, 1, "Good"]'); //設定文字
                  break;
                case "普通":
                  cpf.request('["tone_play", 5, 261, 300]');
                  cpf.request('["digitalWrite", 6 , 0]');
                  cpf.SetSpeech("On","cmn-Hant-TW",SiteName+"狀態普通",0.2,2);
                  cpf.request('["grove_rgblcd_clear"]');  //清空文字
                  cpf.request('["grove_rgblcd_display", 1]');     
                  cpf.request('["grove_rgblcd_set_rgb", 0, 255, 0]');                  
                  cpf.request('["grove_rgblcd_print", 0, 1, "Normal"]'); //設定文字
                  cpf.request('["digitalWrite", 6 , 0]');
                      console.log("普通");
                  break;
                // case "對敏感族群不健康":
                //   cpf.request('["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1]');
                //   cpf.SetSpeech("On","cmn-Hant-TW","對敏感族群不健康",0.3,2);
                //   cpf.request('["tone_play", 6, 261, 500],["sleep", 300],["tone_play", 6, 261, 500],["sleep", 300],["tone_play", 6, 261, 500],["sleep", 300]');
                //   cpf.request('["grove_rgblcd_clear"]');  //清空文字     
                //   cpf.request('["grove_rgblcd_set_rgb", 255, 116, 21]');                  
                //   cpf.request('["grove_rgblcd_print", 0, 1, "對敏感族群不健康"]'); //設定文字
                //   break;
                // case "對所有族群不健康":
                //   cpf.request('["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1]');
                //   cpf.SetSpeech("On","cmn-Hant-TW","對所有族群不健康",0.4,2);
                //   cpf.request('["tone_play", 6, 261, 200],["sleep", 300],["tone_play", 6, 261, 200],["sleep", 300],["tone_play", 6, 261, 200],["sleep", 300]');
                //   cpf.request('["grove_rgblcd_clear"]');  //清空文字     
                //   cpf.request('["grove_rgblcd_set_rgb",203, 0, 0]');                  
                //   cpf.request('["grove_rgblcd_print", 0, 1, "對所有族群不健康"]'); //設定文字
                //   break;
                // case "非常不健康":
                //   cpf.request('["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1]');
                //   cpf.SetSpeech("On","cmn-Hant-TW","非常不健康",0.5,2);
                //   cpf.request('["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300]');
                //   cpf.request('["grove_rgblcd_clear"]');  //清空文字     
                //   cpf.request('["grove_rgblcd_set_rgb", 69, 0, 68]');                  
                //   cpf.request('["grove_rgblcd_print", 0, 1, "非常不健康"]'); //設定文字
                //   break;
                default:
                cpf.request('["digitalWrite", 6 , 1],["digitalWrite", 6 , 0],["digitalWrite",6 , 1],["digitalWrite",6 , 0],["digitalWrite", 6 , 1],["digitalWrite", 6 , 0],["digitalWrite", 6 , 1],["digitalWrite", 6 , 0],["digitalWrite", 6 , 1]');
                  cpf.SetSpeech("On","cmn-Hant-TW", SiteName+"狀態危害",0.6,2);
                  cpf.request('["tone_play", 5, 523, 200],["sleep", 300],["tone_play",5, 523, 200],["sleep", 300],["tone_play",5, 523, 200],["sleep", 300],["tone_play", 5, 523, 200],["sleep", 300],["tone_play",5, 523, 200],["sleep", 300],["tone_play", 5, 523, 200],["sleep", 300]');
                  cpf.request('["grove_rgblcd_clear"]');  //清空文字 
                  cpf.request('["grove_rgblcd_display", 1]');    
                  cpf.request('["grove_rgblcd_set_rgb", 7, 47, 122]');                  
                  cpf.request('["grove_rgblcd_print", 0, 1, "Danger"]'); //設定文字
                      console.log("default");
                  break;

              }

                  }
                    }  
                    },
                  });
            }
           
        function getNodeValue(e, key, i) {
            return e.getElementsByTagName(key)[i].firstChild != null ? e.getElementsByTagName(key)[i].firstChild.nodeValue : '無資料';
          }
           
          
