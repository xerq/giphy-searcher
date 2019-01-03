<template>
  <div>
    <div name="results">
      <div
        v-for="item in results.data"
        :key="item.id">
        <img :src="item.images.fixed_height.url">
        <a
          v-show="!favoritesID.includes(item.id)"
          @click="addToFavorites(item)">Dodaj do ulubionych</a>
        <a
          v-show="favoritesID.includes(item.id)"
          @click="removeFromFavorites(item.id)">Usuń z ulubionych</a>
      </div>
    </div>

    <div
      v-show="favorites.length > 0"
      name="favorites">
      <p>Lista ulubionych</p>
      <div
        v-for="item in favorites"
        :key="item.id">
        <img :src="item.images.fixed_height.url">
        <a
          @click="removeFromFavorites(item.id)">x</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'

export default {
  async asyncData({ params, env }) {
    const { data } = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${env.giphy.apiKey}&q=${
        params.query
      }`
    )

    return {
      query: params.query,
      results: data
    }
  },
  computed: {
    ...mapGetters({
      favorites: 'favorites',
      favoritesID: 'favoritesID'
    })
  },
  methods: {
    ...mapMutations({
      addToFavorites: 'addToFavorites',
      removeFromFavorites: 'removeFromFavorites'
    })
  },
  head() {
    return {
      title: `Wyniki wyszukiwania dla ${this.query}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Znalezione gify: ' +
            this.results.data.map(({ title }) => title).join(', ')
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.results.data.map(({ title }) => title).join(', ')
        }
      ]
    }
  }
}
</script>
