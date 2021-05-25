<template>
    <b-card header="Formulario" footer-tag="footer">
        <b-form @submit="onSave" @reset="onReset" id="form-instrumento">
            <b-row>
                <b-col md="12" class="mb-3">
                    <b-form-input v-model="formInstance.instrumento" type="text" placeholder="Instrumento"></b-form-input>
                </b-col>
                <b-col md="6">
                    <b-form-input v-model="formInstance.marca" type="text" placeholder="Marca"></b-form-input>
                </b-col>
                <b-col md="6">
                    <b-form-input v-model="formInstance.modelo" type="text" placeholder="Modelo"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col md="4">
                    <b-form-input v-model="formInstance.precio" type="number"></b-form-input>
                    <b-form-text>Precio</b-form-text>
                </b-col>
                <b-col md="4">
                    <b-form-input v-model="formInstance.cantidadVendida" type="number"></b-form-input>
                    <b-form-text>Cant. vendida</b-form-text>
                </b-col>
                <b-col md="4">
                    <b-form-input v-model="formInstance.costoEnvio" type="number"></b-form-input>
                    <b-form-text>Costo Envio</b-form-text>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-textarea v-model="formInstance.descripcion" placeholder="Descripcion" rows="3" max-rows="6"></b-form-textarea>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col>
                    <b-form-file v-model="file" plain></b-form-file>
                </b-col>
            </b-row>
        </b-form>
        <template #footer>
            <div class="d-grid gap-1">
                <button class="btn btn-primary" type="submit" form="form-instrumento">Enviar</button>
                <button class="btn btn-outline-danger" type="reset" form="form-instrumento">Limpiar</button>
            </div>
        </template>
    </b-card>
</template>

<script>
export default {
    name:"cardForm",
    data: function() {
        return {
            file: null
        }
    },
    methods: {
        onSave: async function(e) {
            e.preventDefault();
            let datos = {...this.$store.state.formValue};

            if ( this.file ) {
                let formData = new FormData();
                for (const key in datos) {
                    if (Object.hasOwnProperty.call(datos, key)) {
                        formData.append(key,datos[key]);
                    }
                }
                formData.append('img',this.file);

                if(datos.id) {
                    let response = await fetch(`http://localhost:8080/api/v1/crud/instrumento/editar-con-foto/${datos.id}`,{
                    method:'PUT',
                    body: formData
                    });
                } else {
                    let response = await fetch('http://localhost:8080/api/v1/crud/instrumento/crear-con-foto/',{
                    method:'POST',
                    body: formData
                    });
                }
            } else {
                if(datos.id) {
                    let response = await fetch(`http://localhost:8080/api/v1/crud/instrumento/${datos.id}`, {
                        method:'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(datos)
                    });
                } else {
                    let response = await fetch('http://localhost:8080/api/v1/crud/instrumento/',{
                        method:'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(datos)
                    });
                }
            }
        },
        onReset: function() {
            this.formInstance = {
                instrumento: "",
                marca: "",
                modelo: "",
                precio: 0,
                costoEnvio: 0,
                cantidadVendida: 0,
                descripcion: "",
                id: 0
            },
            this.file = null;
        }
    },
    computed: {
        formInstance() {
            return this.$store.state.formValue;
        }
    }
}
</script>