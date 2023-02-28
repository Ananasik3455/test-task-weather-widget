<template>
  <div>
    <header-widget @transmitting-weather-info-obj="writeData"></header-widget>
    <div class="settings" v-if="this.itemInLocalStorage.length === 0">
      <p class="city">Города еще не добавлены в список!</p>
    </div>
    <div class="settings" v-else>
      <SlickList class="stick-list" axis="y" lockAxis="y" :useDragHandle="true" v-model:list="this.itemInLocalStorage">
        <SlickItem class="city-details" v-for="(item, i) in this.itemInLocalStorage" :key="item.id" :index="i">
          <DragHandle class="button-drag">
            <font-awesome-icon icon="fa-solid fa-bars"/>
          </DragHandle>
          <span>{{ item.name }}, {{ item.sys.country }}</span>
          <button @click="removeItem(i)">
            <font-awesome-icon icon="fa-solid fa-trash"/>
          </button>
        </SlickItem>
      </SlickList>
    </div>
  </div>
</template>

<script>
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort';
import headerWidget from '@/components/headerWidget.vue'

export default {
  data() {
    return {
      itemInLocalStorage: [],
    }
  },
  updated() {
    localStorage.setItem('weatherInfoArray', JSON.stringify(this.itemInLocalStorage))
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
      this.itemInLocalStorage.push(data)
    },
    removeItem(index) {
      this.itemInLocalStorage.splice(index, 1)
      localStorage.setItem('weatherInfoArray', JSON.stringify(this.itemInLocalStorage))
    }
  },
  components: {
    SlickList,
    SlickItem,
    DragHandle,
    headerWidget
  }
}
</script>