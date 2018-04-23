var App =  function(){
  var cityElement = document.getElementById('city')
  var tempElement = document.getElementById('temp')
  var dateElement = document.getElementById('date')
  var conditionElement = document.getElementById('condition')
  var tempCelsius = '°C'
  var tempFahrenheit = '°F'
  var iconHome = '<i class="fa fa-location-arrow"></i>'
  var iconTemp = '<i class="fa fa-thermometer-quarter"></i>'
  var iconDate = '<i class="fa fa-calendar-plus-o"></i>'
  var inconCondition = '<i class="fa fa-cloud"></i>'

  this.loacationNavigator = function(){
    var self = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
      self.getWeatherFromApi(position)
      })
    } else { 
        return "Erro"
    }
    this.showLoader()
  }

  this.getWeatherFromApi = function(position){
    var self = this
    var latitude = position.coords.latitude 
    var longitude = position.coords.longitude
    var request = new XMLHttpRequest()

    request.onload = function(){
      var response = JSON.parse(request.response)
      self.getWeather(response)
      console.log(response.query.results.channel.location.city)
      console.log(response.query.results.channel.item.condition.temp)
      console.log(response.query)
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

   this.getWeather = function(response){
    cityElement.innerHTML = iconHome + ' ' + response.query.results.channel.location.city 
    tempElement.innerHTML = iconTemp + ' ' + response.query.results.channel.item.condition.temp + ' ' + tempCelsius 
    dateElement.innerHTML = iconDate + ' ' + response.query.results.channel.item.condition.date
    conditionElement.innerHTML = inconCondition + ' ' + response.query.results.channel.item.condition.text 
    this.celsius = response.query.results.channel.item.condition.temp
   }

   this.celsiusToFahrenheit = function() {
     var fahrenheit = (1.8 * this.celsius) + 32
     tempElement.innerHTML = iconTemp + ' ' + fahrenheit.toFixed(1) + tempFahrenheit
   }

  this.fahrenheitToCelsius = function() {
    tempElement.innerHTML = iconTemp + ' ' + this.celsius + tempCelsius
  }

}
document.addEventListener('DOMContentLoaded', function(){
  var tempDiv = document.getElementById('temperatura')
  var app = new App()
  var status = 'celsius'
  
  app.loacationNavigator()
  
  tempDiv.addEventListener('click', function(){
    if(status == 'celsius'){
      app.celsiusToFahrenheit()
      status = 'fahrenheit'
    } else {
      app.fahrenheitToCelsius()
      status = 'celsius'
    }
  })
})


