import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    instrumentos: [],
    instrumento: null,
    formValue: {
      instrumento: "",
      marca: "",
      modelo: "",
      precio: 0,
      costoEnvio: 0,
      cantidadVendida: 0,
      descripcion: "",
      id: 0
    }
  },
  mutations: {

    SET_INSTRUMENTOS: (state, instrumentos) => {
      state.instrumentos = instrumentos;
    },

    SET_ONE_INSTRUMENTO: (state, instrumento) => {
      state.instrumento = instrumento;
    },

    SET_FORM_VALUE: (state, formValue) => {
      state.formValue = formValue;
    }
  },
  actions: {

    getInstrumentos: async ({ commit }) => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/crud/instrumento/");
        let data = await response.json();

        commit('SET_INSTRUMENTOS',data);
      } catch (error) {
        console.log(`ACTION | getInstrumentos() | Error:${error}`);
      }
    },

    getOneInstrumento: async ({ commit }, instrumentoId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/crud/instrumento/${instrumentoId}`);
        let data = await response.json();

        commit('SET_ONE_INSTRUMENTO',data);
      } catch (error) {
        console.log(`ACTION | getOneInstrumento() | Error:${error}`);
      }
    },

    getFormValue: () => {
      
    },

    updateFormValue: ({ commit }, formValue) => {
      commit('SET_FORM_VALUE',formValue)
    }
  },
  modules: {
  }
})
