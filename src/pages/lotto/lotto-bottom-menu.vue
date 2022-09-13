<template>
    <div class="flex-column w-100 pos-fixed bottom-0 show-xs_md"
        style="z-index: 1999; background: linear-gradient(180deg, #00000000 0%, #00000033 80%, #00000000 100%)"
    >
        <div class="flex-center tx-lg" >
            <a  href="#award" class="n-flat pos-relative  n-tx px-4 py-2 border-r-l-15 flex-column tx-sm nodeco"  style="z-index: 2000">
                <i class="fa fa-award"></i>
                <small class="pt-1 tx-xs nodeco">{{LANG.prizePool}}</small>
            </a>
            <a  href="#store" class="n-flat pos-relative  n-tx px-4 py-2  flex-column tx-sm nodeco"  style="z-index: 2000">
                <i class="fa fa-store"></i>
                <small class="pt-1 tx-xs nodeco">{{LANG.buyTicket}}</small>
            </a>
            <a  href="#user" class="n-flat  pos-relative n-tx px-4 py-2 border-r-r-15 flex-column tx-sm nodeco"  style="z-index: 2000">
                <i class="fa fa-user"></i>
                <small class="pt-1 tx-xs nodeco">{{LANG.myAccount}}</small>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lotto-bottom-menu',     
        computed: {
            LANG() { return this.$store.getters.LANG },
        },
    }
</script>
