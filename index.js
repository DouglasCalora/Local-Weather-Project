var App =  function() {
  var cityElement = document.getElementById('city')
  var tempElement = document.getElementById('temp')
  var dateElement = document.getElementById('date')
  var conditionElement = document.getElementById('condition')
  var tempCelsius = '°C'
  var tempFahrenheit = '°F'
 
  this.loacationNavigator = function() {
    var self = this

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.getWeatherFromApi(position)
      })
    } else { 
      return "Erro"
    }
     
    this.showLoader()
  }

  this.getWeatherFromApi = function(position) {
    var self = this
    var latitude = position.coords.latitude 
    var longitude = position.coords.longitude
    var request = new XMLHttpRequest()

    request.onload = function() {
      var response = JSON.parse(request.response)
      self.getWeather(response)
    }

    request.open('GET','https://simple-weather.p.mashape.com/weatherdata?lat=' + latitude + '&lng=' + longitude)
    request.setRequestHeader('X-Mashape-Key', 'wQb7frEwYemshVONMLHsEBO0WlLWp12aCYyjsnrPxGE2vWFC6u')
    request.send()
  }

  this.showLoader = function() {
    cityElement.innerHTML = 'Carregando...'
    tempElement.innerHTML = 'Carregando...'
    dateElement.innerHTML = 'Carregando...'
    conditionElement.innerHTML = 'Carregando...'
  }

  this.getWeather = function(response) {
    cityElement.innerHTML = getIcon('location-arrow') + ' ' + response.query.results.channel.location.city 
    tempElement.innerHTML = getIcon('thermometer-quarter') + ' ' + response.query.results.channel.item.condition.temp + ' ' + tempCelsius 
    dateElement.innerHTML = getIcon('calendar-plus-o') + ' ' + response.query.results.channel.item.condition.date
    conditionElement.innerHTML = getIcon('cloud') + ' ' + response.query.results.channel.item.condition.text 

    this.celsius = response.query.results.channel.item.condition.temp
  }

  this.celsiusToFahrenheit = function() {
    var fahrenheit = (1.8 * this.celsius) + 32
    tempElement.innerHTML = getIcon('thermometer-quarter') + ' ' + fahrenheit.toFixed(1) + tempFahrenheit
  }

  this.fahrenheitToCelsius = function() {
    tempElement.innerHTML = getIcon('thermometer-quarter') + ' ' + this.celsius + tempCelsius
  }
  
  var getIcon = function(icon) {
    return '<i class="fa fa-' + icon + '"></i>'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var tempDiv = document.getElementById('temperatura')
  var app = new App()
  var status = 'celsius'
    
  app.loacationNavigator()
    
  tempDiv.addEventListener('click', function() {
    if (status == 'celsius') {
      app.celsiusToFahrenheit()
      status = 'fahrenheit'
    } else {
      app.fahrenheitToCelsius()
      status = 'celsius'
    }
  })
})


