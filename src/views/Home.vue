<template>
  <b-container>
    <b-row class="my-5">
      <b-col cols='12'>
        <b-jumbotron header="Bienvenidos">
        <p>Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las mejores elecciones para tu compra musical.</p>
      </b-jumbotron>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols='12'>
        <h3 class="text-center" id="ubicacion">¿Donde estamos?</h3>
      </b-col>
      <b-col cols='12'>
        <Mapa />
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col cols='12'>
        <h3 class="text-center" id="productos-info">Productos</h3>
      </b-col>
      <b-col cols='12'>
        <div 
          v-for="elemento in instrumentos"
          :key="elemento.id"
        >
          <card-producto :product="elemento" />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Mapa from "@/components/Mapa";
import Productos from "@/components/Productos";

export default {
  name: 'Home',
  components: {
    Mapa,
    "card-producto": Productos
  },
  mounted() {
    this.getAllInstrumentos();
  },
  data() {
    return {
      instrumentos: []
    };
  },
  methods: {
    async getAllInstrumentos() {
      try {
        const response = await fetch("http://localhost:8080/api/v1/crud/instrumento/");
        let data = await response.json();
        this.instrumentos = data;
      } catch (error) {
        console.error(error);
      }
    }
  } 
}
</script>

<style scoped>
</style>