<template>
    <div class="flex-column ">
        <div class="flex-wrap  " >
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'Registered Funds',
                        form_args: form.registeredFunds,
                        abi: ['function registeredFunds(address account) external pure returns (uint256)'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'registeredFunds',
                        res_type: 'uint256',
                        button_only: true,
                        call_only: true,
                    }"
            />
            <tx-card  class=" flex-column pa-5 ma-2" 
                :props="
                    {
                        title: 'DAI balanceOf',
                        form_args: form.DAIBalanceOf,
                        abi: ABIS.ERC20,
                        address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
                        function: 'balanceOf',
                        res_type: 'uint256',
                        button_only: true,
                        call_only: true,
                    }"
            /> 
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'DAI Allowance to Roulette',
                        form_args: form.rouletteAllowance,
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'allowance',
                        res_type: 'uint256',
                        button_only: true,
                        call_only: true,
                    }"
            />
        </div>
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'Add DAI Allowance to Roulette',
                        form_args: form.addRouletteAllowance,
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'approve',
                        res_type: 'uint256',
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'Increase Funds',
                        form_args: form.increaseFunds,
                        abi: ['function increaseFunds(uint256 amount) external'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'increaseFunds',
                        res_type: 'uint256',
                    }"
            /> 
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'placeBet',
                        form_args: form.placeBet,
                        abi: ['function placeBet(uint8 userNumber, uint256 betAmount) external'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'placeBet',
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'betBulk',
                        form_args: form.betBulk,
                        abi: ['function betBulk(uint8 bulkOption, uint256 betAmount) external'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'betBulk',
                    }"
            />
        </div>
        <!-- resolver = 0xd92d48E79Bb31E1de9BeA06611E60Ecd97A04cEA -->
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'requestResolveBet',
                        form_args: form.requestResolveBet,
                        abi: ['function requestResolveBet() external'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'requestResolveBet',
                        button_only: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'resolveBet',
                        form_args: form.resolveBet,
                        abi: ['function resolveBet(address userAddress) external returns (bool)'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'resolveBet',
                        button_only: true,
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-5 ma-2" 
                :props="
                    {
                        title: 'lastResultOf',
                        form_args: form.lastResultOf,
                        abi: ['function lastResultOf(address userAddress) public view returns (uint8)'],
                        address: '0xfab5299d486725319aae4d02ee48500affa2d418',
                        function: 'lastResultOf',
                        res_type: 'uint',
                        call_only: true,
                    }"
            /> 
        </div>
        <!-- <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'Get Pair',
                        abi: ABIS.FACTORY,
                        form_args: form.getPair,
                        function: 'getPair',
                        call_only: true,
                    }"
            /> 
        </div> -->
    </div>
</template>
<script>
    import txCard from "../components/tx-card.vue";

    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    export default {
        name: 'roulette',     
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                form: {
                    approveCard: {"0": { value: CURRENT_NETWORK.CONTROLLER_ADDRESS, }, "1": { value: "", }, },
                    requestResolveBet: {},
                    resolveBet: {"0": { value: "", type: "address" }, },
                    increaseFunds: {"0": { value: "", type: "uint256" }, },
                    registeredFunds: {"0": { value: "", type: "address" }, },
                    lastResultOf: {"0": { value: "", type: "address" }, },
                    rouletteAllowance: {"0": { value: "", type: "address" }, "1": { value: '0xfab5299d486725319aae4d02ee48500affa2d418', type: "address" }, },
                    addRouletteAllowance: {
                        "0": { value: "0xfab5299d486725319aae4d02ee48500affa2d418", type: "address" },
                        "1": { value: '', type: "uint256" },
                    },
                    placeBet: {
                        "0": { value: "", type: "uint" },
                        "1": { value: '', type: "uint256" },
                    },
                    betBulk: {
                        "0": { value: "", type: "uint" },
                        "1": { value: '', type: "uint256" },
                    },
                    DAIBalanceOf: {"0": { value: "", type: "address" }, },
                    getPair: {
                        "0": { value: "", type: "address" },
                        "1": { value: "", type: "address" },
                    },
                },
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            
        },
        mounted()
        {
            this.form.registeredFunds["0"].value = this.first_acc.address
            this.form.rouletteAllowance["0"].value = this.first_acc.address
            // this.form.lastResultOf["0"].value = this.first_acc.address
            // this.form.rouletteAllowance["1"].value = '0xfab5299d486725319aae4d02ee48500affa2d418'
            // this.form.addRouletteAllowance["1"].value = '0xfab5299d486725319aae4d02ee48500affa2d418'
            this.form.DAIBalanceOf["0"].value = this.first_acc.address
            this.form.resolveBet["0"].value = this.first_acc.address
        },
        methods: {
            async connectWallet() {
                await this.$store.dispatch("connectWallet")
                // this.$refs.exchange.getTradeData(true)
                // this.$refs.exchange.getAccountBalances(true)
            },
        },
    }
</script>
