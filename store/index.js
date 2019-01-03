export const state = () => ({
  favorites: [],
  favoritesID: []
})

export const mutations = {
  addToFavorites(state, item) {
    state.favorites.push(item)
    state.favoritesID.push(item.id)
  },
  removeFromFavorites(state, itemID) {
    const itemIndex = state.favorites.findIndex(({ id }) => id === itemID)
    const itemIDIndex = state.favoritesID.findIndex(id => id === itemID)

    if (itemIndex === -1) {
      return
    }

    state.favorites.splice(itemIndex, 1)
    state.favoritesID.splice(itemIDIndex, 1)
  }
}

export const getters = {
  favorites: state => state.favorites,
  favoritesID: state => state.favoritesID
}
