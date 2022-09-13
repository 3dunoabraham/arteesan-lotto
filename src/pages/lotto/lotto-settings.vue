<template>
    <div class="n-flat pa-2 border-r-5">
        <div class="flex-column ">
            <tx-card class=" flex-column" :props="forms.transferOwnership"/>
            <tx-card ref="addTargetAllowance" :props="forms.addTargetAllowance" />
        </div>
        <div class="flex-column ">
            <tx-card  class=" flex-column  mt-3" 
                :props="
                    {
                        title: 'Make a proposal',
                        form_args: forms.createProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'createProposal',
                    }"
            />
        </div>
        <div class="flex-column ">
            <tx-card  class=" flex-column  " 
                :props="
                    {
                        title: 'execute proposal',
                        form_args: forms.executeProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'executeProposal',
                    }"
            />
            <tx-card  class=" flex-column  " 
                :props="
                    {
                        title: 'requestResolveRound',
                        form_args: forms.requestResolveRound,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'requestResolveRound',
                    }"
            />
            <tx-card  class=" flex-column  " 
                :props="
                    {
                        title: 'resolveBet',
                        form_args: forms.resolveBet,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'resolveBet',
                    }"
            />
            <tx-card  class=" flex-column  " 
                :props="
                    {
                        title: 'Withdraw from Proposal',
                        form_args: forms.withdrawFromProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'withdrawFromFailedProposal',
                    }"
            />
            <hr class="w-50 opacity-10">
            <tx-card  class=" flex-column  " 
                            :props="
                                {
                                    title: 'set Requester',
                                    form_args: forms.setRequester,
                                    abi: ABIS.RESOLVER,
                                    address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                                    function: 'setRequester',
                                }"
                        />
            <tx-card  class=" flex-column  " 
                            :props="
                                {
                                    title: 'set Lotto',
                                    form_args: forms.setLotto,
                                    abi: ABIS.DAO,
                                    address: CURRENT_NETWORK.DAO_ADDRESS,
                                    function: 'setLotto',
                                }"
                        />
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
                            "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
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
                        "0": { placeholder: "Votes", value: "", type: "uint" },
                        "1": { placeholder: "Deadline", value: "", type: "uint" },
                    },

                    executeProposal: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    resolveBet: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    requestResolveRound: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    withdrawFromProposal: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    setRequester: {                        
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.LOTTO_ADDRESS`,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
                    },
                    setLotto: {                        
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.LOTTO_ADDRESS`,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
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
