<template>
    <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx" >

        <!-- <template v-if="!dark_mode">
            <img class="show-xs_md" src="./../../public/res/Untitl222ed.png" style=" position: fixed; width: 100%">
            <img class="show-md_x" src="./../../public/res/Untitl333ed.png" style=" position: fixed; min-width: 100vw">
        </template> -->
<!--         <template v-if="!dark_mode" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="position: fixed; top: 0"><path fill="#e64c6e" fill-opacity="1" d="M0,160L24,133.3C48,107,96,53,144,53.3C192,53,240,107,288,149.3C336,192,384,224,432,245.3C480,267,528,277,576,245.3C624,213,672,139,720,96C768,53,816,43,864,37.3C912,32,960,32,1008,69.3C1056,107,1104,181,1152,192C1200,203,1248,149,1296,160C1344,171,1392,245,1416,282.7L1440,320L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
        </template>
        <div v-if="dark_mode" style="background: #25272c; height: 1vh; position: fixed; top: 0; width: 100%">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="width: 100%"><path fill="#25272c" fill-opacity="1" d="M0,160L24,133.3C48,107,96,53,144,53.3C192,53,240,107,288,149.3C336,192,384,224,432,245.3C480,267,528,277,576,245.3C624,213,672,139,720,96C768,53,816,43,864,37.3C912,32,960,32,1008,69.3C1056,107,1104,181,1152,192C1200,203,1248,149,1296,160C1344,171,1392,245,1416,282.7L1440,320L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
        </div> -->
        <template v-if="dark_mode">
            <div style="position: fixed; top: 0; width: 100vw">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#25272c" fill-opacity="1" d="M0,160L120,138.7C240,117,480,75,720,80C960,85,1200,139,1320,165.3L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
            </div>
        </template>
        <template v-if="!dark_mode">
            <div style="position: fixed; top: 0; width: 100vw">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,160L120,138.7C240,117,480,75,720,80C960,85,1200,139,1320,165.3L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
            </div>
        </template>

        <main-menu />
        
        <div style="height: 80px">
        </div>

        <home-page v-if="is_metaMask" />
        <div v-else>
            <h1>Please, install or login Metamask.</h1>
        </div>

        <!-- <bottom-menu v-if="accs_length" /> -->

        <template v-if="dark_mode">
            <div style=" width: 100vw">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#25272c" fill-opacity="1" d="M0,192L120,213.3C240,235,480,277,720,282.7C960,288,1200,256,1320,240L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
            </div>
        </template>
        <template v-if="!dark_mode">
            <div style=" width: 100vw">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,192L120,213.3C240,235,480,277,720,282.7C960,288,1200,256,1320,240L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
            </div>
        </template>

    </div>
</template>
<script>
    import homePage from "./pages/home-page.vue";
    
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