<template>
    <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx" >

        <main-menu />
        
        <div style="height: 80px">
        </div>

        <home-page v-if="is_metaMask" />
        <div v-else>
            <h1>Please, install or login Metamask.</h1>
        </div>

        <bottom-menu v-if="accs_length" />

    </div>
</template>
<script>
    import homePage from "./modules/home-page.vue";
    import mainMenu from "./modules/main-menu.vue";
    import bottomMenu from "./modules/bottom-menu.vue";

    export default {
        name: 'App',    
        components: {
            homePage,
            mainMenu,
            bottomMenu,
        },
        computed: {
            dark_mode()     { return this.$store.getters.dark_mode },
            is_metaMask()   { return this.$store.getters.is_metaMask },
            accs_length()           { return this.$store.getters.accs_length },
        }, 
    }
</script>

<style>
</style>