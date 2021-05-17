<template>
    <b-card no-body class="overflow-hidden mt-3">
        <b-row no-gutters>
            <b-col md="6">
                <b-card-img :src="'/images/'+product.imagen" alt="Image" class="rounded-0" v-on:click="redirect(product.id,$event)"></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body :title="product.instrumento">
                    <b-card-text class="font-weight-bold">
                        {{product.precio}}$
                    </b-card-text>
                    <template v-if="product.costoEnvio !== 'G'">
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
        methods: {
            redirect: function(id, event) {
                event.preventDefault();
                this.$router.push(`instrumento/${id}`);
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