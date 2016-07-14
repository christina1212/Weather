 var script = document.createElement('script');
    script.src = "http://api-maps.yandex.ru/2.0/?load=package.full&lang=en-US";
    document.getElementsByTagName("head")[0].appendChild(script);
    var city, country, a;
    function init () {
        if (typeof ymaps === 'undefined' || typeof ymaps.geolocation === 'undefined') {
            setTimeout(init, 100);
            return;
        }
        var geolocation = ymaps.geolocation;
        city    = geolocation.city;
        city    = geolocation.city;
        a = geolocation.latitude;
        document.getElementById("city").value=city;
        document.getElementById("city").dispatchEvent(new Event("change"));
    }
    init();
 
angular.module('weather', [])

.factory('openweather', function($http) {
  var runRequest = function(city) {
    return $http({
      method: 'JSONP',
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ city +'&mode=json&units=metric&cnt=4&callback=JSON_CALLBACK&appid=c15f8765fa3bab154ef61c87af87a692'
    });
  };
  return {
    event: function(city) {
      return runRequest(city);
    }
  };
})

.controller('WeatherForecastCtrl', function($scope, $timeout, openweather){
  var timeout;   

  $scope.$watch('city', function(newCity) {
    console.log(newCity);
    if(newCity) {
      if(timeout) $timeout.cancel(timeout);
      timeout = $timeout(function() {
        openweather.event(newCity).success(function(data, status) { 
          $scope.loc = data;
          $scope.forecast = data.list;
        });
      }, 1000);
    }
  });
});