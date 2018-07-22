/* describe('Progress Bar', function () {

    beforeEach(module('myApp'));
  
    var $controller;
  
    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));
  
    describe('On Click on Progress Bar button', function () {
          it('On Click on Progress Bar button', function () {
              var $scope = {};
              var controller = $controller('progressBar', { $scope: $scope });
              $scope.data=JSON.parse('{"buttons":[42,34,-11,-44],"bars":[69,49,19],"limit":120}');
              $scope.dataURL="http://pb-api.herokuapp.com/bars";
              $scope.onclickButton(42);
              expect($scope.dataURL).toBe('http://pb-api.herokuapp.com/bars');
          });	
      });
  
  }); */


  describe('progressBar', function() {
    beforeEach(module('myApp'));
  
    var $controller, $rootScope;
  
    beforeEach(inject(function(_$controller_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));
  
    describe('On Click on Progress Bar button', function() {
      it('Calling progress bar button function', function() {
        var $scope = $rootScope.$new();
        var controller = $controller('progressBar', { $scope: $scope });
      /*   $scope.password = 'longerthaneightchars';
        $scope.grade();
        expect($scope.strength).toEqual('strong'); */
      });
    });
  });