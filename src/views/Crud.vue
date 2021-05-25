<template>
    <b-container>
        <b-row class="my-5">
            <b-col xs="12" lg="8">

                <b-table-simple>
                    <thead class="table-dark text-center">
                        <b-tr>
                            <b-th>ID</b-th>
                            <b-th>Instrumento</b-th>
                            <b-th>Marca</b-th>
                            <b-th>Modelo</b-th>
                            <b-th>Precio</b-th>
                            <b-th>Actions</b-th>
                        </b-tr>
                    </thead>
                    <b-tbody>
                        <b-tr v-for="item in instrumentos" :key="item.id">
                            <b-td> {{item.id}} </b-td>
                            <b-td> {{item.instrumento}} </b-td>
                            <b-td> {{item.marca}} </b-td>
                            <b-td> {{item.modelo}} </b-td>
                            <b-td> {{item.precio}} </b-td>
                            <b-td>
                                <b-button variant="warning" class="mx-5" v-on:click="onEdit($event,item)">Edit</b-button>
                                <b-button variant="danger" v-on:click="onDelete($event,item.id)">Delete</b-button>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                    
            </b-col>
            <b-col xs="12" lg="4">
                <card-form></card-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import CardForm from "../components/CardForm";

export default {
    name: 'Crud',
    components: {
        "card-form": CardForm
    },
    mounted() {
        this.$store.dispatch('getInstrumentos');
    },
    computed: {
        instrumentos() {
            return this.$store.state.instrumentos;
        }
    },
    methods: {
        onEdit: function(event,item) {
            event.preventDefault();
            this.$store.dispatch('updateFormValue',item);
        },
        onDelete: async (event,id) => {
            event.preventDefault();
            let r = confirm("¿Desea eliminar el rgistro?");
            if( r ) {
                fetch(`http://localhost:8080/api/v1/crud/instrumento/${id}`, { method:'DELETE' })
                    .then( response => response.json() )
                    .then( data => alert(data) )
                    .catch( e => console.error(e) );
            }
        }
    }
}
</script>