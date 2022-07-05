<template>
    <div style="position: fixed; bottom: 0; left: 0 z-index: 999; background: linear-gradient(180deg,#00000000,#00000033)" class="w-100">
        <div class="flex-between flex-align-start "> 
            <div class="flex show-xs_lg">
            </div>
            <div class="flex-row flex-lg2x-column flex-align-start">
                <a :class="[current_page == 'exchange' ? 'tx-success' : '']"
                    class="nodeco letter-s-3 noborder n-tx  n-flat clickable flex-column"
                    @click="setPage('exchange')"
                >
                    <span class="px-5 pb-4 pt-3 opacity-hover-50 flex-column">
                        <!-- <i class="fas fa-external-link-alt"></i> --> <small class="tx-xs">Exchange</small>
                    </span>
                </a>
                <!-- <a :class="[current_page == 'roulette' ? 'tx-success' : '']"
                    class="nodeco letter-s-3 noborder n-tx  n-flat clickable flex-column"
                    @click="setPage('roulette')"
                >
                    <span class="px-5 pb-4 pt-3 opacity-hover-50 flex-column">
                         <small class="tx-xs">Roulette</small>
                    </span>
                </a> -->
                <a :class="[current_page == 'lottery' ? 'tx-success' : '']"
                    class="nodeco letter-s-3 noborder n-tx  n-flat clickable flex-column"
                    @click="setPage('lottery')"
                >
                    <span class="px-5 pb-4 pt-3 opacity-hover-50 flex-column">
                        <!-- <i class="fas fa-external-link-alt"></i> --> <small class="tx-xs">Lottery</small>
                    </span>
                </a>
            </div>
            <div class="flex show-xs_lg">
            </div>
        </div>
    </div>
</template>
<script>
    import socialMedia from '../components/social-media.vue';
    export default {
        name: 'main-menu',    
        components: {
            socialMedia, 
        },
        computed: {
	        dark_mode()            { return this.$store.getters.dark_mode },
	        english_mode()         { return this.$store.getters.english_mode },
	        LANG()                 { return this.$store.getters.LANG },
	        first_acc()            { return this.$store.getters.first_acc },
	        accs_length()          { return this.$store.getters.accs_length },

            current_page()         { return this.$store.getters.current_page },
        },
        created() {
            // let darkMode = JSON.parse(localStorage.getItem("darkMode"))
            // console.log(darkMode)
            // let englishMode = JSON.parse(localStorage.getItem("englishMode"))
            // console.log(englishMode)
            // if (darkMode != null) { this.$store.dispatch("setDarkMode", darkMode) }
            // if (englishMode != null) { this.$store.dispatch("setEnglishMode", englishMode) }
        },
        methods: {
            setPage(_page) {
                console.log("setPage(_page)", _page)
                this.$store.commit("setCurrentPseudoPage", _page)
            },
            // changeEnglishMode() {
            //     let newMode = !this.english_mode
            //     localStorage.setItem("englishMode", JSON.stringify(newMode));
            //     this.$store.dispatch("setEnglishMode", newMode)
            // },
        },
    }
</script>
