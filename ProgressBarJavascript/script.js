document.addEventListener('DOMContentLoaded', function(){ 
   console.log("Document load event");
     var statusBarCtrl=statusBarController;
     statusBarCtrl.intProcess();

}, false);




var statusBarController={

dataURL:"http://pb-api.herokuapp.com/bars",
data:{},
intProcess:function(){
this.loadStatusBarDataAsync();

},
helloworld:function(){   
   return 'Hello World'; 
},

loadStatusBarDataAsync:function ()
{
	var stb=this;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)             
         var stbCtrl=statusBarController;
         statusBarController.assignData(xmlHttp.responseText);
         statusBarController.loadStatusBarScreenData();
    }
    xmlHttp.open("GET", stb.dataURL, true); // true for asynchronous 
    xmlHttp.send(null);
 /*var stbCtrl=statusBarController;
         statusBarController.assignData('{"buttons":[42,34,-11,-44],"bars":[69,49,19],"limit":120}');
         statusBarController.loadStatusBarScreenData();*/


},
assignData:function(dataToAssign){
	 var stb=statusBarController; 
console.log(dataToAssign);
	stb.data=JSON.parse(dataToAssign);
},
loadStatusBarScreenData:function(){
	 var stb=statusBarController; 
stb.loadButtons();
stb.loadDropDowns();
  stb.loadBars(); 


},

loadBars:function(){



var barsHTML='';
var barsArr=statusBarController.data.bars;
  
		for (var i = 0; i < barsArr.length; i++) {
			var barVal=barsArr[i];
			  var  newwidth=Math.floor(((barVal*100)/statusBarController.data.limit));
			var barID="bar_"+i;
			barsHTML +='<div class="progress"><div id="'+barID+'_value" class="value">'+barVal+'%</div><div id="'+barID+'_fill" class="bar" style="width: '+newwidth+'%;"></div></div>';


					}

		var barsDIV=statusBarController.getElementByID("bars_div");
		barsDIV.innerHTML=barsHTML;

 
},

loadDropDowns:function(){

var dropdownHTML='<select id="select_bar" onchange="statusBarController.onChangeDropDownControl();">';
var barsArr=statusBarController.data.bars;
  
		for (var i = 0; i < barsArr.length; i++) {
			var barVal=barsArr[i];
			var name="progress_"+i;
			if(i==0)
			{
				dropdownHTML +='<option selected value="'+i+'">'+name+'</option>';
			}
			else
			{
				dropdownHTML +='<option value="'+i+'">'+name+'</option>';
			}
			

		}

		var dropdownDIV=statusBarController.getElementByID("dropdown_div");
		dropdownDIV.innerHTML=dropdownHTML;

 

},
onChangeDropDownControl:function()
{

	var dropdownVal=statusBarController.getControlDropdownValue();

},

getControlDropdownValue:function(){
var e = statusBarController.getElementByID("select_bar");
var dropdownVal = e.options[e.selectedIndex].value;

return dropdownVal;
},

loadButtons:function(){

    
   var buttonsArr=statusBarController.data.buttons;
   var buttonsHTML="";
		for (var i = 0; i < buttonsArr.length; i++) {
			var buttonVal=buttonsArr[i];
			buttonsHTML +="<button   onclick='statusBarController.onclickButton(\""+buttonVal+"\");'>"+buttonVal+"</button>"

		}

		var buttonsDIV=statusBarController.getElementByID("buttons_div");
		buttonsDIV.innerHTML=buttonsHTML;

},	

onclickButton:function(val){

    var buttonVal=val;
    var dropdownVal=statusBarController.getControlDropdownValue();
	        var barID="bar_"+dropdownVal;
	        var barValueObj=statusBarController.getElementByID(barID+'_value');
	        var barFillObj=statusBarController.getElementByID(barID+'_fill');
	         statusBarController.animateValObj(barValueObj,barFillObj,parseInt(buttonVal));

},

getElementByID:function(id){

	return document.getElementById(id);

},

animateValObj:function(barValueObj,barFillObj,increment){
        var width=barValueObj.innerHTML;
        	width=parseInt(width.split("%")[0]);        
        var newwidth=width+increment;
        newwidth=newwidth<0?0:newwidth;
        barValueObj.innerHTML=newwidth+"%";

this.animateObj(barFillObj,newwidth,increment);
      
},

animateObj:function(barOBJ,newwidth,increment){
        var start=barOBJ.style.width;
            start=parseInt(start.split("%")[0]);   
            barOBJ.style.backgroundColor='#0f0';
			newwidth=Math.floor(((newwidth*100)/statusBarController.data.limit));
            if(newwidth>100)
            {
            	  barOBJ.style.backgroundColor='#f00';
            	  newwidth=100;
            } 
           var end=newwidth;
          var pixelIncrement=increment<0?-1:1; 
statusBarController.animateBarFillObj(barOBJ,start,end,pixelIncrement);


},

animateBarFillObj:function(barOBJ,start,end,pixelIncrement){

        var newStart=start;

        if(newStart>=0 && newStart<=100)
        {

        	if(newStart!=end)
        	{
        		 newStart=start+pixelIncrement;
        		setTimeout(function(){ 
        			statusBarController.animateBarFillObj(barOBJ,newStart,end,pixelIncrement);


        		}, 5);
        	}
        
         barOBJ.style.width=newStart+"%";       
        }
        

    

}







};