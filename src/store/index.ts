import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },

    loadBag(state, products) {
      state.productsInBag = products;
    },

    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    },

    removeFromBag(state, product) {
      const updatedProducts = state.productsInBag.filter((prod: any) => prod.id != product.id);
      state.productsInBag = updatedProducts;
      localStorage.setItem("productsInBag", JSON.stringify(state.productsInBag))
    }
  },
  actions: {
    loadProducts({ commit }) {
      axios.get('https://fakestoreapi.com/products')
      .then(res => {
        commit('loadProducts', res.data)
      })
    },

    loadBag({ commit }) {
      if(localStorage.getItem("productsInBag")) {
        commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")));
      }
    },

    addToBag({ commit }, product) {
      commit('addToBag', product)
    },

    removeFromBag({ commit }, product) {
      if( confirm('Are you sure you want to remove the item from bag?') ){
        commit('removeFromBag', product)
      }
    }
  },
  modules: {
  }
})
