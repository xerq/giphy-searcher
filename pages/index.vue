<template>
  <div>
    <div name="search-form">
      <input
        v-model="query"
        type="text">
      <a :href="'/s/' + query">szukaj</a>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
  head() {
    return {
      title: 'Wyszukiwarka Gif'
    }
  }
}
</script>
