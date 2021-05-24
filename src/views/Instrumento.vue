<template>
    <b-container class="mt-5">
        <b-row>
            <b-col xs lg="8">
                <img :src="imgPath" alt="Imagen Producto" />
                <h4>Descripción</h4>
                <p>{{instrumento.descripcion}}</p>
            </b-col>
            <b-col xs lg="4">
                <p className="text-muted">{{instrumento.cantidadVendida}} vendidos</p>
                <h4>{{instrumento.instrumento}}</h4>
                <p className="display-4">{{instrumento.precio}}$</p>
                <p>Marca: {{instrumento.marca}}</p>
                <p>Modelo: {{instrumento.modelo}}</p>
                <template v-if="instrumento.costoEnvio !== 'G'">
                    <p class="text-warning">Costo de Envio Interior de Argentina : {{instrumento.costoEnvio}}$</p>
                </template>
                <template v-else>
                    <div class="wrap">
                        <img src="/images/camion.png" alt="Camión Icono"/>
                        <p class="text-success icon"> Envio Gratis a todo el pais</p>
                    </div>
                </template>
                <b-btn variant="outline-primary" className="mt-5">Agregar al carrito</b-btn>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'Instrumento',
        mounted() {
            this.getOneInstrumento();
        },
        data() {
            return {
                instrumento: {},
                imgPath: "images/notImg.png"
            };
        },
        methods: {
            async getOneInstrumento() {
                let { id } = this.$route.params;

                const response = await fetch(`http://localhost:8080/api/v1/crud/instrumento/${id}`);
                let dataInstrumento = await response.json();
                this.instrumento = dataInstrumento;

                const responseImg = await fetch(`http://localhost:8080/api/v1/crud/instrumento/uploads/img/${id}`);
                let dataIImgPath = responseImg.url;
                this.imgPath = dataIImgPath;
            }
        }
    }
</script>

<style scoped>
    div.col-lg-8{
        border-right: 1px solid gray;
    }
    div.col-lg-8 > img {
        display: block;
        width: 40%;
        margin: auto 30%;
    }

    div.col-lg-4  div.wrap  {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .wrap > p {
        margin: unset;
    }
</style>