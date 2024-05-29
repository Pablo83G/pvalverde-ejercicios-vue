<template>
  <v-card class="tarjeta">

    <v-card-text class="tarjeta_text">

      <v-row class="indice medievalsharp-regular texto_claro">Index: {{ index }}</v-row>

      <v-row class="nombre medievalsharp-regular letrasAmarillas ">{{ name }}</v-row>

      <v-row class="url medievalsharp-regular texto_claro">URL: {{ url }}</v-row>

    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: 'ClasesDDComp',

  props: {
    index: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

  },

}

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Jacquard+12+Charted&family=MedievalSharp&display=swap');
</style>
<style>
.tarjeta {
  background-color:  rgb(29, 28, 25) !important;
  height: 50px;
  width: 200px;
  display: block;
  margin: 20px;
  /* border-color: antiquewhite; */
}

.tarjeta_text {
  background-color: #141312;
  box-shadow: 0px 1px 10px 10px rgb(133, 133, 134);
  height: 250px;
  width: 200px;
  margin: 2px 5px 0px 70px;
}

.tarjeta_text:hover {
  opacity: 0.9;
}

.texto_claro {
  color: rgb(221, 213, 200)
}

.indice {
  font-weight: bold;
  font-size: medium;
  height: 40px;
  background-color: #242525;
  padding: 10px 2px 1px 3px;
}

.nombre {
  height: 160px;
  padding: 30px 2px 1px 3px;
  background-color: #4e5153;
}

.url {
  height: 5px;
  padding: 10px 2px 1px 3px;
}

.letrasAmarillas {
  font-size: xx-large;
  text-shadow: 0px 1px 10px 1px rgb(167, 167, 173);
  color: rgb(226, 176, 9);
  -webkit-text-stroke-width: 0.7px;
  -webkit-text-stroke-color: black
}

.medievalsharp-regular {
  font-family: "MedievalSharp", cursive;
  font-weight: 400;
  font-style: normal;


}
</style>