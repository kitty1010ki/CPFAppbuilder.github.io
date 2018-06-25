//select two
    //show time
    var SiteName_s='' ;
    var County_s ='';
    var County_index;
    var SiteName_index;
    setup();
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
            var locations=['基隆市','雲林縣','屏東縣'];
            var LocationSelect=document.getElementById("location-list");
            var inner="";
            for(var i=0;i<locations.length;i++){
              inner=inner+'<option value=i>'+locations[i]+'</option>'; 	  
            }
            LocationSelect.innerHTML=inner;  
            var sectors=new Array();
            //基隆市
            sectors[0]=['基隆'];
            //雲林縣
            sectors[8]=['斗六','崙背','臺西','麥寮'];
            //屏東縣
            sectors[14]=['屏東','潮州','恆春'];
            //桃園市
            // sectors[3]=['桃園','大園','觀音','平鎮','龍潭','中壢'];
            // //新竹縣
            // sectors[4]=['湖口','竹東'];
            // //苗栗縣
            // sectors[5]=['頭份','苗栗','三義'];
            // //臺中市
            // sectors[6]=['豐原','沙鹿','大里','忠明','西屯'];
            // //彰化縣
            // sectors[7]=['彰化','線西','二林'];
            // //雲林縣
            // sectors[8]=['斗六','崙背','臺西','麥寮'];
            // //南投縣
            // sectors[9]=['南投','竹山','埔里'];
            // //嘉義縣
            // sectors[10]=['新港','朴子'];
            // //嘉義市
            // sectors[11]=['嘉義'];
            // //臺南市
            // sectors[12]=['新營','善化','安南','臺南'];
            // //高雄市
            // sectors[13]=['美濃','橋頭','仁武','鳳山','大寮','林園','楠梓','左營','前金','前鎮','小港','復興'];
            // //屏東縣
            // sectors[14]=['屏東','潮州','恆春'];
            // //臺東縣
            // sectors[15]=['臺東','關山'];
            // //花蓮縣
            // sectors[16]=['花蓮'];	
            // //宜蘭縣
            // sectors[17]=['宜蘭','東山'];
            // //新北市
            // sectors[18]=['汐止','萬里','新店','土城','板橋','新莊','菜寮','林口','淡水','三重','永和','富貴角'];
            // //連江縣
            // sectors[19]=['馬祖'];
            // //金門縣
            // sectors[20]=['金門'];
            // //澎湖縣
            // sectors[21]=['馬公'];
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
            0
            
            }
            
            function call(){
                $.ajax({
                    type: "GET",
                    url: "http://opendata2.epa.gov.tw/AQI.xml",
                    dataType: "xml",
                    error: function (result) {
                      console.log('nonono');
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
                    
                      
              switch (Status){
                case "良好":
                  cpf.SetSpeech("On","cmn-Hant-TW","狀態良好",0.1,2);
                  cpf.request('["grove_rgblcd_clear"]');  //清空文字     
                  cpf.request('["grove_rgblcd_set_rgb", 0, 255, 0]');                  
                  cpf.request('["grove_rgblcd_print", 0, 1, "Good"]'); //設定文字
                  break;
                case "普通":
                  cpf.request('["digitalWrite", 2 , 1]');
                  cpf.SetSpeech("On","cmn-Hant-TW","狀態普通",0.2,2);
                  cpf.request('["tone_play", 6, 261, 300],["sleep", 300]');
                  cpf.request('["grove_rgblcd_clear"]');  //清空文字     
                  cpf.request('["grove_rgblcd_set_rgb", 255, 255, 0]');                  
                  cpf.request('["grove_rgblcd_print", 0, 1, "Normal"]'); //設定文字
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
                cpf.request('["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1],["digitalWrite", 2 , 0],["digitalWrite", 2 , 1]');
                  cpf.SetSpeech("On","cmn-Hant-TW","危害",0.6,2);
                  cpf.request('["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300],["tone_play", 6, 523, 200],["sleep", 300]');
                  cpf.request('["grove_rgblcd_clear"]');  //清空文字     
                  cpf.request('["grove_rgblcd_set_rgb", 7, 47, 122]');                  
                  cpf.request('["grove_rgblcd_print", 0, 1, "狀態危害"]'); //設定文字
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

         
          
              
      
            
          function setup(){
              if(cpf){
                  cpf.setPinMode('["resetPin"],["grove_rgblcd_begin", 16, 2],["setPinMode", "digital", 6, "TONE"],["setPinMode", "digital", 2, "OUTPUT"]');
              }
          }

