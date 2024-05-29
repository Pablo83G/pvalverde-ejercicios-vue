<template>
    <v-container class="fondo_container">

        <v-row class="titulo">
            <img class="imagen" src="../assets/headersdnd.jpg" >
        </v-row>

        <v-card class="carrusel mx-auto" elevation="24" max-width="400">
            <v-carousel :continuous="true" :show-arrows="true" delimiter-icon="mdi-square" height="370">
                <v-carousel-item v-for="(clase, key) in clases" :key="key">

                    <ClasesDDComp class="columnas" :name="clase.name" :index="clase.index" :url="clase.url" />

                </v-carousel-item>
            </v-carousel>
        </v-card>

    </v-container>
</template>

<script>
import ClasesDDComp from '../components/compDD/ClasesDDComp.vue'
//instalar axios = npm install axios
//importar
import axios from 'axios'

const url_base = 'https://www.dnd5eapi.co/api/classes'

export default {
    name: 'ClasesDD_E2',

    data() {
        return {

            clases: [

            ],
        }
    },

    components: {
        ClasesDDComp
    },

    methods: {
        getClases() {
            //Ejecutando una petición GET con axios
            axios.get(url_base)
                .then(response => {
                    // manejar respuesta exitosa   
                    let { data: { results } } = response
                    this.clases = results

                    console.log(response);
                })
                //manejar error
                .catch((error) => {
                    console.log(error)
                })
        }
    },

    mounted() {
        this.getClases()
    },

}
</script>

<style>
.titulo {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.imagen {
    height: 100%;
    width: 100%;
    display: flex;
}

.fondo_container {
    background-color: rgb(17, 16, 16);
}

.columnas {
    margin: 20px;
    padding: 10px;
    display: block;
}

.carrusel {
    background-color: rgb(29, 28, 25) !important;
    margin-top: 40px;
}
</style>