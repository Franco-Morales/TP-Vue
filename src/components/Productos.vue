<template>
    <b-card no-body class="overflow-hidden mt-3">
        <b-row no-gutters>
            <b-col md="6">
                <b-card-img :src="urlImgPath" alt="Image" class="rounded-0" v-on:click="redirect(product.id,$event)"></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body :title="product.instrumento">
                    <b-card-text class="font-weight-bold">
                        {{product.precio}}$
                    </b-card-text>
                    <template v-if="product.costoEnvio">
                        <p class="text-warning">Costo de Envio Interior de Argentina : {{product.costoEnvio}}$</p>
                    </template>
                    <template v-else>
                        <div class="wrap">
                            <img src="/images/camion.png" alt="Camión Icono"/>
                            <p class="text-success icon"> Envio Gratis a todo el pais</p>
                        </div>
                    </template>
                    <b-card-text>
                        {{product.cantidadVendida}} vendidos
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    export default {
        name: 'Productos',
        props: ["product"],
        data() {
            return {
                urlImgPath: 'images/notImg.png'
            };
        },
        mounted() {
            this.getImageById(this.product.id);
        },
        methods: {
            redirect: function(id, event) {
                event.preventDefault();
                this.$router.push(`instrumento/${id}`);
            },
            getImageById: function(id) {
                fetch(`http://localhost:8080/api/v1/crud/instrumento/uploads/img/${id}`)
                    .then( response => {
                        if(response.status !== 500) this.urlImgPath = response.url;
                    })
                    .catch(e => console.error('error',e));
            }
        }
    }
</script>

<style scoped>
    div.card {
        max-width: 600px;
    }

    div.card .col-md-4 {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card img#img-product{
        width: 90%;
        height: 90%;
        margin: auto;
    }

    div.card div.wrap  {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .wrap > p {
        margin: unset;
    }
</style>