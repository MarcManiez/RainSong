angular.module('rain.services', [])

.factory('Weather', ['$http', function($http) {
  return {
    getWeatherByCoords: function(lat, lon) {
      return $http({
        method: 'GET',
        url: '/api/lat',
        params: {lat: lat, lon: lon}
      }).then(function(resp) {
        return JSON.parse(resp.data.body);
      });
    },

    getWeatherByCity: function(city) {
      return $http({
        method: 'GET',
        url: '/api/city',
        params: {city: city}
      }).then(function(resp) {
        return JSON.parse(resp.data.body);
      });
    }  
  };
}])

.factory('Video', ['$http', '$q', function($http, $q) {
  return {
    getVid: function(search) {
      var obj = {
        'Thunderstorm': ['storm', 'wind', 'thunderstruck'],
        'Drizzle': ['drizzle', 'melancholy', 'sad anime', 'rain song'],
        'Rain': ['sad', 'melancholy', 'sad anime', 'rain song'],
        'Clouds': ['chill', 'vaporwave', 'sorsari', 'classical', 'final fantasy vii'],
        'Snow': ['cold', 'cold weather', 'christmas'],
        'Clear': ['salsa', 'brazilian jazz', 'bossa nova', 'nujabes'],
        'Extreme': ['extreme', 'fire', 'danger'],
        'Fog': ['']
      };
      var queryStr = obj[search] || ['chill', 'vaporwave', 'classical', 'final fantasy vii'];
      var randomNum = function() {
        return Math.floor(Math.random() * (queryStr.length));
      };
      var randomGenre = queryStr[randomNum()];
      var youtubeKey = $http({
        method: 'GET',
        url: '/api/keys'
      });

      return $q.all([youtubeKey]).then(function(arr) {
        return $http({
          method: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/search',
          params: {
            part: 'snippet',
            type: 'video',
            videoEmbeddable: true,
            key: arr[0].data,
            q: randomGenre,
            videoCategoryId: '10',
            videoDefinition: 'high',
            maxResults: 20
          }
        }).then(function(resp) {
          return resp.data;
        });
      });
    },

    getWeatherByCity: function(city) {
      return $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&appid=07a96fec5d332a2798fa83aba696d9f2'
      }).then(function(resp) {
        return resp.data;
      });
    }
  };
}])

.factory('Comments', ['$http', function($http) {
  return {
    getComments: function() {
      return $http({
        method: 'GET',
        url: '/api/comments'
      }).then(function(resp) {
        return resp.data;
      });
    },
    
    postComments: function(data) {
      return $http({
        method: 'POST',
        url: '/api/comments',
        data: data
      }).then(function(resp) {
        return resp;
      });
    }
  };
}])

.factory('Users', ['$http', function($http) {
  return {
    getUser: function(userName) {
      return $http({
        method: 'GET',

        url: '/api/users',
        params: userName
      }).then(function(resp) {
        return resp.data;
      });
    },

    createUser: function(user) {
      return $http({
        method: 'POST',
        url: '/api/users',
        data: user
      }).then(function(resp) {
        return resp;
      });
    },

    updateUser: function(user) {
      return $http({
        method: 'PUT',
        url: '/api/users',
        data: user
      }).then(function(resp) {
        return resp;
      });
    }
  };
}]);

