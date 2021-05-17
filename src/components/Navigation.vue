<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-container>
            <b-navbar-brand href="/">Musical Hendrix</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="/">Home</b-nav-item>
                    <router-link to="#productos-info" class="nav-link">Productos</router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navigation'
    }
</script>