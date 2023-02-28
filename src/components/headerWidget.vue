<template>
  <div class="search-box">
    <button
        @click="changeLink"
    >
      <font-awesome-icon icon="fa-solid fa-gear" />
    </button>
    <font-awesome-icon icon="fa-solid fa-location-dot" />
    <input v-if="this.$route.path === '/'"
      type="text"
      placeholder="Weather output"
      v-model="nameCity"
      disabled
    >
    <input v-else
      type="text"
      placeholder="Enter your location"
      v-model="nameCity"
    >
    <button v-if="this.$route.path === '/viewSettings'"
        @click="getCoordinateCity"
    >
      <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
    </button>
    <button v-else disabled>
      <font-awesome-icon icon="fa-solid fa-temperature-half" />
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      APIkey: '6c9795955fc786f11b8ba06bcf74eb19',
      weatherInfoObj: {},
      weatherInfoArray: [],
      nameCity: '',
      allInfoCityObj: {},
      coordCityObj: {
        lat: '',
        lon: ''
      }
    }
  },
  mounted() {
    if (localStorage.weatherInfoArray === '[]') {
      this.getCurrentLocation()
    }
  },
  methods: {
    async getCoordinateCity() {
      if (this.nameCity !== '') {
        const changeCity = this.nameCity
        this.allInfoCityObj = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${ changeCity }&limit=1&appid=${ this.APIkey }`)
        this.coordCityObj.lat = this.allInfoCityObj.data[0].lat
        this.coordCityObj.lon = this.allInfoCityObj.data[0].lon
        this.getWeatherInfo()
        this.nameCity = ''
      } else {
        alert('Поле не заполнено!')
      }
    },
    async getWeatherInfo() {
      this.weatherInfoObj = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ this.coordCityObj.lat }&lon=${ this.coordCityObj.lon }&appid=${ this.APIkey }`)

      this.weatherInfoArray = JSON.parse(localStorage.getItem('weatherInfoArray')) || []

      this.weatherInfoArray.push(this.weatherInfoObj.data)
      localStorage.setItem('weatherInfoArray', JSON.stringify(this.weatherInfoArray))
      this.$emit('transmitting-weather-info-obj', this.weatherInfoObj.data)
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.coordCityObj.lat = coords.latitude
          this.coordCityObj.lon = coords.longitude
          this.getWeatherInfo()
        });
      } else {
        console.log('no geolocation?');
      }
    },
    changeLink() {
      const linkPage = this.$route.path
      if (linkPage === '/') {
        this.$router.push('/viewSettings')
      } else this.$router.push('/')
    }
  }
}
</script>