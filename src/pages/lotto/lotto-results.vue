<template>
<div>

    <div class="flex-column ">
        <tx-card :props="forms.getVoteScratchedNumber" />
        <tx-card :props="forms.wonAmount" />
        <tx-card :props="forms.getWinner" />
        <tx-card :props="forms.getWonAmountMulticall"/>
    </div>

    <hr class="w-50 opacity-10">

    <div class="flex-column ">
        <tx-card :props="forms.withdrawAmount" />
        <tx-card :props="forms.withdrawAll" />
    </div>

</div>
</template>
<script>
    import { ABIS, CURRENT_NETWORK } from '../../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../../store/helpers';

    import txCard from "../../components/tx-card.vue";

    export default {
        name: 'lotto-settings',   
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                loadings: {
                },
                togglers: {
                },
                forms: {
                    
                    getVoteScratchedNumber: {                        
                        title: 'getVoteScratchedNumber',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getVoteScratchedNumber',
                        DEBUG: true,
                        res_type: 'uint',
                        call_only: true,
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    wonAmount: {      
                        title: 'wonAmount',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getWonAmount',
                        DEBUG: true,
                        res_type: 'uint256',
                        call_only: true,                  
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    getWinner: {    
                        title: 'getWinner',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getWinner',
                        DEBUG: true,
                        res_type: 'uint',
                        call_only: true,                    
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    getWonAmountMulticall: {   
                        title: 'getWonAmountMulticall',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getWonAmount',
                        DEBUG: true,
                        res_type: 'uint256',
                        call_only: true,
                        make_multicall: true,                     
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        },  
                    },
                    withdrawAmount: {     
                        title: 'withdrawAmount',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'withdrawAmount',
                        DEBUG: true,
                        res_type: 'uint256',                   
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                            "2": {placeholder:"voter address",label:`value: "",`,value: "", type: "address" },
                        },
                    },
                    withdrawAll: {                        
                        title: 'withdrawAll',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'withdrawAll',
                        DEBUG: true,
                        res_type: 'uint',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                            
                            "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                            
                            "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                            "3": {placeholder:"vote distance",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                },  
                values: {
                },  
            }
        },
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            first_acc()             { return this.$store.getters.first_acc },
            pro_mode()              { return this.$store.getters.pro_mode },
            dark_mode()             { return this.$store.getters.dark_mode },
        },
        async mounted()
        {
        },
        methods: {
            parseDecimals,
            shortAddress,
        },
    }
</script>
