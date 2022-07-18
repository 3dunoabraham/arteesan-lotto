<template>
    <div :class="!!dark_mode ? 'dark-theme' : 'light-theme'" class="main-body n-bg n-tx" style="width: 100%">

        <!-- <template v-if="!dark_mode">
            <img class="show-xs_md" src="./../../public/res/Untitl222ed.png" style=" position: fixed; width: 100%">
            <img class="show-md_x" src="./../../public/res/Untitl333ed.png" style=" position: fixed; min-width: 100vw">
        </template> -->
<!--         <template v-if="!dark_mode" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="position: fixed; top: 0"><path fill="#e64c6e" fill-opacity="1" d="M0,160L24,133.3C48,107,96,53,144,53.3C192,53,240,107,288,149.3C336,192,384,224,432,245.3C480,267,528,277,576,245.3C624,213,672,139,720,96C768,53,816,43,864,37.3C912,32,960,32,1008,69.3C1056,107,1104,181,1152,192C1200,203,1248,149,1296,160C1344,171,1392,245,1416,282.7L1440,320L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
        </template>
        <div v-if="dark_mode" style="background: #282b2f; height: 1vh; position: fixed; top: 0; width: 100%">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="width: 100%"><path fill="#282b2f" fill-opacity="1" d="M0,160L24,133.3C48,107,96,53,144,53.3C192,53,240,107,288,149.3C336,192,384,224,432,245.3C480,267,528,277,576,245.3C624,213,672,139,720,96C768,53,816,43,864,37.3C912,32,960,32,1008,69.3C1056,107,1104,181,1152,192C1200,203,1248,149,1296,160C1344,171,1392,245,1416,282.7L1440,320L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path></svg>
        </div> -->
        
        


        <template v-if="dark_mode">
            <div style="position: fixed; top: 0; width: 100%; height: 100vh" class="flex-column flex-between">
                <!-- <div class="show-xs_md pt-6"  >
                </div> -->
                <!-- <div class="show-xs_md "  >
                </div> -->

                <svg class="show-md_x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#282b2f" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

                <svg class="show-xs_md pt-8 mt-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#282b2f" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#282b2f" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> -->
                <!-- <div>asd</div> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#282b2f" fill-opacity="1" d="M0,128L48,154.7C96,181,192,235,288,224C384,213,480,139,576,128C672,117,768,171,864,170.7C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#282b2f" fill-opacity="1" d="M0,288L48,256C96,224,192,160,288,144C384,128,480,160,576,176C672,192,768,192,864,202.7C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
        </template>

        <template v-if="!dark_mode">
            <div style="position: fixed; top: 0; width: 100%; height: 100vh" class="flex-column flex-between">
                <!-- <div class="show-xs_md pt-6"  >
                </div> -->
                <!-- <div class="show-xs_md "  >
                </div> -->

                <svg class="show-md_x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

                <svg class="show-xs_md pt-8 mt-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,154.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> -->
                <!-- <div>asd</div> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,128L48,154.7C96,181,192,235,288,224C384,213,480,139,576,128C672,117,768,171,864,170.7C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,288L48,256C96,224,192,160,288,144C384,128,480,160,576,176C672,192,768,192,864,202.7C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
        </template>

        <main-menu />
        
        <div style="height: 80px">
        </div>

        <home-page v-if="is_metaMask" />
        <div v-else>
            <h1>Please, install or login Metamask.</h1>
        </div>

        <div style="height: 80px" class="show-xs_md"> </div>



        <!-- <bottom-menu v-if="accs_length" /> -->

<!--          <template v-if="dark_mode">
            <div style=" width: 100%">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#282b2f" fill-opacity="1" d="M0,192L120,213.3C240,235,480,277,720,282.7C960,288,1200,256,1320,240L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
            </div>
        </template>
        <template v-if="!dark_mode">
            <div style=" width: 100%">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d6d6d6" fill-opacity="1" d="M0,192L120,213.3C240,235,480,277,720,282.7C960,288,1200,256,1320,240L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
            </div>
        </template>  -->

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