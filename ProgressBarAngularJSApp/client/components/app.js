var myApp = angular.module("myApp", ["ui.bootstrap","countTo"]);

myApp.controller("progressBar",function($scope,$timeout,$http){
  
 


  $scope.data={}
  $scope.data.buttons=[];
  $scope.data.bars=[];
  $scope.data.limit=100;

  //JSON.parse('{"buttons":[42,34,-11,-44],"bars":[69,49,19],"limit":120}');
  $scope.dataURL="http://pb-api.herokuapp.com/bars";
  $http.get($scope.dataURL)
  .success(function(dataServer) {
    console.log(dataServer);
    $scope.data=dataServer;   
    $scope.assignValueToCacheBar();  
    $scope.selectedProgress = $scope.data.bars[0]; 
  })
  .error(function(dataServer) {
      console.log('Error: ' + dataServer);
  });
 $scope.selectedProgress = $scope.data.bars[0];
 $scope.onclickButton=function(buttonClick){
    $scope.increment=parseInt(buttonClick);
    $scope.animateProgressBar();
 };

  $scope.assignValueToCacheBar=function(){
    $scope.cacheBars=[];
    for(var i=0;i<$scope.data.bars.length;i++)
    {
      var dataJson={};     
      dataJson.currentValue=0;
      dataJson.currentWidth=0;        
      $scope.cacheBars.push(dataJson);
    }
  
    $timeout(function(){
      for(var i=0;i<$scope.data.bars.length;i++)
        {
          var barVal=$scope.data.bars[i];
          $scope.cacheBars[i].rawValue=barVal;
          $scope.cacheBars[i].currentValue=barVal;
         var  newwidth=Math.floor(((barVal*100)/$scope.data.limit));
         console.log("new width:"+newwidth);
         $scope.cacheBars[i].cssClass=newwidth<=100?"progress-bar-info":"progress-bar-danger";
          $scope.cacheBars[i].currentWidth=newwidth;
          $scope.cacheBars[i].origValue=barVal;
        }
    }, 100);

  };

  $scope.assignValueToCacheBar();
  $scope.animateProgressBar=function(){

     var pos=0;
    for(var i=0;i<$scope.cacheBars.length;i++)
    {
      var origVal=parseInt($scope.cacheBars[i].origValue);
      if(parseInt($scope.selectedProgress)==origVal)
      {     
          pos=i;
          break;
      }
    }
    
    var cacheBar=$scope.cacheBars[pos];
    var start=cacheBar.currentWidth;  
    var width=parseInt(cacheBar.rawValue);            
    var newwidth=width+$scope.increment;
    newwidth=newwidth<0?0:newwidth;
    //console.log("new width:"+newwidth);
    cacheBar.rawValue=parseInt(newwidth);
   
    cacheBar.currentValue=parseInt(newwidth);
    //console.log("new width:"+newwidth);
    newwidth=Math.floor(((newwidth*100)/$scope.data.limit));
    //console.log("new width relative:"+newwidth);
    var cssClass=(newwidth<=100?"progress-bar-info":"progress-bar-danger");
     console.log("css class:"+cssClass);
    cacheBar.cssClass=cssClass;
    newwidth=newwidth>=100?100:newwidth;
    //cacheBar.currentWidth=parseInt(newwidth);
    var end=newwidth;
    
    var pixelIncrement=$scope.increment<0?-1:1; 
    $scope.animateBarFillObj(cacheBar,start,end,pixelIncrement);

};



$scope.animateBarFillObj=function(barToAnimate,start,end,pixelIncrement){

  var newStart=start;
  
  if(newStart>=0 && newStart<=100)
  {
    if(newStart!=end)
    {
       newStart=start+pixelIncrement;
       $timeout(function(){
 
        $scope.animateBarFillObj(barToAnimate,newStart,end,pixelIncrement);

      }, 2);

    }
    barToAnimate.currentWidth=newStart;      
  }
 
};
 
});

