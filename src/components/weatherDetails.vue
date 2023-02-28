<template>
  <div class="weather-details">
    <div class="current-weather-start">
      <font-awesome-icon :icon="nameIconOne" />
      <div class="text">
        <span>{{ detailsOne }}</span>
        <p>{{ nameTextOne }}</p>
      </div>
    </div>
    <div class="current-weather-end">
      <font-awesome-icon :icon="nameIconTwo"/>
      <div class="text">
        <span>{{ detailsTwo }}</span>
        <p>{{ nameTextTwo }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['detailsOne', 'detailsTwo', 'nameIconOne', 'nameIconTwo', 'nameTextOne', 'nameTextTwo']
}
</script>