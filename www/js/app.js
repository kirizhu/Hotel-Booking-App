// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//ROUTING
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider //parent template that has our navigation
  .state('tabs',{
    url: '/tab',
    abstract: true,
    templateUrl:'templates/tabs.html'
  })
  .state('tabs.home',{ //child template 
    url:'/home',
    views:{
      'home-tab':{
        templateUrl: 'templates/home.html'
        
      }
    }
  })
  .state('tabs.list',{ //child template 
    url:'/list',
    views:{
      'list-tab':{
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('tabs.detail',{ //child template 
    url:'/list/:roomID', //passes room details to next view
    views:{
      'list-tab':{
        templateUrl: 'templates/detail.html',
        controller: 'ListCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('/tab/home'); // default
})


//CONTROLLER som hämtar data från jsonfilen för listvyn 
.controller('ListCtrl',function($scope, $http,$state,$stateParams, $ionicPopup, $filter){
  $http.get('js/data.json')
  .success(function(data){
    
    $scope.rooms = data; //gets all rooms
    $scope.choosenroom = $state.params.roomID; //get choosen room


    })

    $scope.data = {};

    $scope.submit = function(){  
      
        console.log($scope.data);
  
        $scope.showAlert = function(){
  
        };
        var alertPopup = $ionicPopup.alert({
        scope:$scope,
        title: "Bokning godkänd",
        template: 
        "<h5> <br> Bokat:" +" "+ $scope.choosenroom + "</h5>" +
        "<h5> <br> Från:" +" "+ $scope.data.datefrom + "</h5>" +
        "<h5> <br> Till:" +" "+ $scope.data.dateto +"</h5>" +
        "<h5> <br> Vuxna:" +" "+ $scope.data.vuxna + "</h5>" +
        "<h5> <br> Barn:" +" "+ $scope.data.barn + "</h5>" +
        "<h5> <br> Namn:" +" "+ $scope.data.name + "</h5>" +
        "<h5> <br> Email:" +" "+ $scope.data.email + "</h5>" +
        "<h5> <br> Telefonnummer:+46" +" "+ $scope.data.number + "</h5>" +
        "<h5> <br> Pris:" +" "+ $scope.totalPrice + "</h5>"
        
       
      });
  
    }
  
    $scope.diffDate = function(datefrom, dateto){
  
      var startdatum = new Date(datefrom);
      var slutdatum = new Date(dateto);
      
      var timeDiff = Math.abs(slutdatum.getTime() - startdatum.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      var diffD=parseInt(diffDays);
      if(diffD==0){
        diffD = 1;
      }
      $scope.diffD=diffD;
      return diffD;
  };
  
  $scope.today = $filter("date")(Date.now(), 'yyyy-MM-dd');
  
  $scope.getbookdate=function(){
  $scope.bookdate= $filter("date")($scope.data.datefrom, 'yyyy-MM-dd');
  console.log($scope.bookdate);
  }
  
  $scope.confirm=function(){
  $scope.totalPrice = ($scope.data.roomprice-0) * $scope.diffD;
  $scope.data.days = $scope.diffD;
  $scope.data.totPrice = $scope.totalPrice;
  console.log($scope.diffD);
  console.log($scope.totalPrice);
  }
  
  $scope.doRefresh = function() {
      $http.get('js/data.json')
      .success(function(data){
        $scope.rooms = data;
       })
       .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
  
    }
  
  })




