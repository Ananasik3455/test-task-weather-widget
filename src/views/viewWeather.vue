<template>
  <div>
    <header-widget @transmitting-weather-info-obj="writeData"></header-widget>

    <div class="weather-scroll">
      <div
        v-for="item in this.itemInLocalStorage"
        :key="item.id"
      >
        <div class="weather-box">
          <p class="city">
            {{ item.name }}, {{ item.sys.country }}
          </p>
          <img
            :src="'/icons/' + item.weather[0].main + '.png'"
            alt=""
          >
          <p
            class="temperature"
          >
            {{ Math.floor(item.main.temp - 273.15) }}&deg;C
          </p>
          <p
            class="description"
          >
            {{ item.weather[0].description }}
          </p>
        </div>
        <weather-details
            name-icon-one="fa-solid fa-water"
            name-icon-two="fa-solid fa-wind"
            name-text-one="Humidity"
            name-text-two="Wind Speed"
            :details-one="item.main.humidity + '%'"
            :details-two="item.wind.speed + 'm/s'"
        ></weather-details>
        <weather-details
          name-icon-one="fa-solid fa-arrow-down"
          name-icon-two="fa-solid fa-eye"
          name-text-one="Pressure"
          name-text-two="Visibility"
          :details-one="Math.floor(item.main.pressure * 0.75) + 'mmhg'"
          :details-two="Math.floor(item.visibility / 1000) + 'km'"
        ></weather-details>
      </div>
    </div>
  </div>
</template>

<script>
import headerWidget from '@/components/headerWidget.vue'
import weatherDetails from '@/components/weatherDetails.vue'

export default {
  data() {
    return {
      itemInLocalStorage: [],
      imageSrc: '',
    }
  },
  created() {
    const checkedStorage = JSON.parse(localStorage.getItem('weatherInfoArray'))
    if (checkedStorage) {
      this.itemInLocalStorage.push(...JSON.parse(localStorage.getItem('weatherInfoArray')))
    } else {
      console.log('Пустое значение')
    }
  },
  methods: {
    writeData(data) {
      console.log(data)
      this.itemInLocalStorage.push(data)
    }
  },
  components: {
    headerWidget,
    weatherDetails
  }
}
</script>