<template>
<div>

    <div class="flex-column ">
        <tx-card ref="addTargetAllowance" :props="forms.addTargetAllowance" />
        <tx-card :props="forms.createProposal" />
    </div>

    <hr class="w-50 opacity-10">

    <div class="flex-column ">
        <tx-card :props="forms.executeProposal" />
        <tx-card :props="forms.requestResolveRound" />
        <tx-card :props="forms.resolveBet" />
        <tx-card :props="forms.withdrawFromProposal" />
    </div>

    <hr class="w-50 opacity-10">

    <div class="flex-column ">
        <tx-card :props="forms.transferOwnership"/>
        <tx-card :props="forms.setRequester" />
        <tx-card :props="forms.setLotto" />
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
                    transferOwnership: {
                        title: 'transferOwnership to dao',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'transferOwnership',
                        res_type: 'uint256',
                        form_args: {                        
                            "0": {
                                placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,
                                value: CURRENT_NETWORK.DAO_ADDRESS, type: "address"
                            },
                        },
                    },
                    addTargetAllowance: {
                        title: 'Set  DAI Allowance to target',
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'approve',
                        res_type: 'uint256',
                        form_args:  {
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                            
                            "1": {placeholder:"amount",label:`value: '',`,value: '', type: "uint256" },
                        },
                    },
                    createProposal: {
                        title: 'Make a proposal',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'createProposal',
                        form_args: {
                            "0": { placeholder: "Votes", value: "", type: "uint" },
                            "1": { placeholder: "Deadline", value: "", type: "uint" },
                        },
                    },

                    executeProposal: {
                        title: 'execute proposal',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'executeProposal',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    resolveBet: {
                        title: 'resolveBet',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'resolveBet',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    requestResolveRound: {
                        title: 'requestResolveRound',
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'requestResolveRound',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    withdrawFromProposal: {
                        title: 'Withdraw from Proposal',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'withdrawFromFailedProposal',
                        form_args: {
                            "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        },
                    },
                    setRequester: {            
                        title: 'set Requester',
                        abi: ABIS.RESOLVER,
                        address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                        function: 'setRequester',            
                        form_args: {
                            "0": {placeholder:"",label:`value: `,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
                        },
                    },
                    setLotto: {    
                        title: 'set Lotto',
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'setLotto',                    
                        form_args: {
                            "0": {placeholder:"",label:`value:.LOTTO_ADDRESS`,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
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
