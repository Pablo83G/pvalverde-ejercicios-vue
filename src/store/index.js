import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    artistas: [],
    discos: [],
    nextArtistaId: 1, // Inicializa el próximo ID disponible
    nextDiscosId: 1,
  },
  mutations: {
    add_mut_artista(state, artista) {
      artista.id = state.nextArtistaId; // Asigna el ID actual
      state.artistas.push(artista);
      state.nextArtistaId++; // Incrementa el próximo ID disponible
    },
    update_mut_artista(state, artista) {
      const index = state.artistas.findIndex(a => a.id === artista.id)
      if (index !== -1) {
        Vue.set(state.artistas, index, artista)
      }
    },
    delete_mut_artista(state, artistaId) {
      state.artistas = state.artistas.filter(a => a.id !== artistaId)
    },
    add_mut_disco(state, disco) {
      disco.id = state.nextDiscosId;
      state.discos.push(disco);
      state.nextDiscosId++;
    },
    update_mut_disco(state, disco) {  // Asegúrate de que se pase el objeto disco
      const index = state.discos.findIndex(d => d.id === disco.id)
      if (index !== -1) {
        Vue.set(state.discos, index, disco)  // Actualiza el disco completo
      }
    },
    // update_mut_disco(state, disco, modDisco) {
    //   //state.discos = lista de discos almacenada en el estado global de vuex
    //   //findIndex = busca en la lista de discos el índice 
    //   // index = almacena el indice del disco encontrado,  Si no se encuentra el disco, findIndex devuelve -1.
    //   const index = state.discos.findIndex(d => d.id === disco.id)
    //   if (index !== -1) {
    //     const actualizarDisco = {...disco}
    //     if(modDisco !== ''){
    //       actualizarDisco.nombre = modDisco;
    //     }
    //   //Vue.set: es una función proporcionada por Vue para 
    //   //garantizar que las reactividades sean respetadas al
    //   //modificar propiedades de objetos o elementos de arrays.
    //   //Esto asegura que Vue detecte los cambios y actualice las vistas correspondientes.
    //     Vue.set(state.discos, index, actualizarDisco)
    //   }
    // },
    delete_mut_disco(state, discoId) {
      //filter(d => d.id !== discoId): crea un nuevo array que
      //contiene solo los discos cuyo id no coincide con discoId.
      state.discos = state.discos.filter(d => d.id !== discoId)
    }
  },
  actions: {
    save_artista({ commit }, artista) {
      commit('add_mut_artista', artista)
    },
    update_artista({ commit }, artista) {
      commit('update_mut_artista', artista)
    },
    delete_artista({ commit }, artistaId) {
      commit('delete_mut_artista', artistaId)
    },
    save_disco({ commit }, disco) {
      commit('add_mut_disco', disco)
    },
    update_disco({ commit }, disco) {
      commit('update_mut_disco', disco)
    },
    delete_disco({ commit }, discoId) {
      commit('delete_mut_disco', discoId)
    }
  }
})

