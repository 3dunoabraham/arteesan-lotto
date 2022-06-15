<template>
    <div class="flex-column ">
        <div class="flex-wrap  " >
            <!-- <tx-card  class=" flex-column pa-2 border-r-15 " 
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
            />  -->
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'DAI Allowance to TargetContract',
                        form_args: form.targetAllowance,
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'allowance',
                        res_type: 'uint256',
                        button_only: true,
                        call_only: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'proposalCount',
                        form_args: {},
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'numProposals',
                        res_type: 'uint',
                        button_only: true,
                        call_only: true,
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'getDeadline ',
                        form_args: form.getProposalPropertyDeadline,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.deadline.timestamp',
                        call_only: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'get randomResult ',
                        form_args: form.getProposalPropertyResult,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'gameRounds',
                        res_type: 'struct.randomResult.uint',
                        call_only: true,
                    }"
            />
        </div>
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'amountOf tokens ',
                        form_args: form.getProposalPropertyAmount,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfTokens.uint256',
                        call_only: true,
                    }"
            />
            /
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'amountOf tokens required',
                        form_args: form.amountOfTokensRequired,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfTokensRequired.uint256',
                        call_only: true,
                    }"
            />
            |
        </div>
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'amountOf votes ',
                        form_args: form.getProposalPropertyAmountVotes,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfVotes.uint',
                        call_only: true,
                    }"
            />
            /
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'amountOfvotes required',
                        form_args: form.getProposalPropertyAmountRequired,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'proposals',
                        res_type: 'struct.amountOfVotesRequired.uint',
                        call_only: true,
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'Add DAI Allowance to target',
                        form_args: form.addTargetAllowance,
                        abi: ABIS.ERC20,
                        address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                        function: 'approve',
                        res_type: 'uint256',
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'transferOwnership to dao',
                        form_args: form.transferOwnership,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'transferOwnership',
                        res_type: 'uint256',
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'make action',
                        form_args: form.createProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'createProposal',
                    }"
            />
            <!-- <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'get votes',
                        form_args: form.createProposal,
                        abi: ['function createProposal(uint256 _amount) returns (uint256)'],
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'createProposal',
                    }"
            /> -->
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'voteOnProposal',
                        form_args: form.voteOnProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'voteOnProposal',
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'withdrawFrom failed Proposal',
                        form_args: form.withdrawFromProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'withdrawFromFailedProposal',
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'execute proposal',
                        form_args: form.executeProposal,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'executeProposal',
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'requestResolveRound',
                        form_args: form.requestResolveRound,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'requestResolveRound',
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'resolveBet',
                        form_args: form.resolveBet,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'resolveBet',
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'get randomRequests',
                        form_args: form.randomRequests,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'randomRequests',
                        res_type: 'uint',
                        call_only: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'get Requester',
                        form_args: {},
                        abi: ABIS.RESOLVER,
                        address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                        function: 'requester',
                        res_type: 'address',
                        button_only: true,
                        call_only: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'set Requester',
                        form_args: form.setRequester,
                        abi: ABIS.RESOLVER,
                        address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                        function: 'setRequester',
                    }"
            />
            <br>
            <hr>
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 's_randomWords',
                        form_args: form.randomWords,
                        abi: ABIS.RESOLVER,
                        address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                        function: 's_randomWords',
                        res_type: 'word',
                        DEBUG: true,
                        call_only: true,
                    }"
            />
        </div>
        <hr class="w-50 opacity-10">
        <div class="flex-wrap ">
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'getVoterVoteIndex',
                        form_args: form.getVoterVoteIndex,
                        abi: ABIS.DAO,
                        address: CURRENT_NETWORK.DAO_ADDRESS,
                        function: 'getVoterVoteIndex',
                        DEBUG: true,
                        call_only: true,
                        res_type: 'uint',
                        advanced: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'getVoteResult',
                        form_args: form.getVoteResult,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getVoteResult',
                        DEBUG: true,
                        res_type: 'uint',
                        advanced: true,
                    }"
            />
            <tx-card  class=" flex-column pa-2 border-r-15 " 
                :props="
                    {
                        title: 'getVoteRedeemd',
                        form_args: form.getVoteRedeemd,
                        abi: ABIS.LOTTO,
                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                        function: 'getVoteRedeemd',
                        DEBUG: true,
                        res_type: 'word',
                        call_only: true,
                    }"
            />
        </div>
    </div>
</template>
<script>
    import txCard from "../components/tx-card.vue";

    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    export default {
        name: 'lotto',     
        components: {
            txCard,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                form: {
                    createProposal: {"0": { value: "", type: "uint" }, },

                    approveCard: {"0": { label:`value: CURRENT_NETWORK.CONTROLLER_ADDRESS`,value: CURRENT_NETWORK.CONTROLLER_ADDRESS, }, "1": { label:`value: "",`,value: "", }, },
                    withdrawFromProposal: {"0": { label:`value: "",`,value: "", type: "uint" }, },
                    requestResolveRound: {"0": { label:`value: "",`,value: "", type: "uint" }, },
                    randomRequests: {"0": { label:`value: "",`,value: "", type: "uint" }, },
                    resolveBet: {"0": { label:`value: "",`,value: "", type: "uint" }, },
                    executeProposal: {"0": { label:`value: "",`,value: "", type: "uint" }, },
                    increaseFunds: {"0": { label:`value: "",`,value: "", type: "uint256" }, },
                    registeredFunds: {"0": { label:`value: "",`,value: "", type: "address" }, },
                    lastResultOf: {"0": { label:`value: "",`,value: "", type: "address" }, },
                    randomWords: {"0": { label:`value: "",`,value: "", type: "uint" }, },
                    setRequester: {
                        "0": { label:`value: CURRENT_NETWORK.LOTTO_ADDRESS`,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
                    },
                    getVoteRedeemd: {
                        "0": { label:`value: "",`,value: "", type: "uint" },
                        "1": { label:`value: "",`,value: "", type: "uint" },
                    },
                    getVoteResult: {
                        "0": { label:`value: "",`,value: "", type: "uint" },
                        "1": { label:`value: "",`,value: "", type: "uint" },
                        "2": { label:`value: "",`,value: "", type: "address" },
                    },
                    getVoterVoteIndex: {
                        "0": { label:`value: "",`,value: "", type: "uint" },
                        // "1": { label:`value: "",`,value: "", type: "uint" },
                        "1": { label:`value: "",`,value: "", type: "address" },
                    },
                    targetAllowance: {
                        "0": { label:`value: "",`,value: "", type: "address" },
                        "1": { label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                    },
                    transferOwnership: {
                        "0": { label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                    },
                    getProposalPropertyResult: {
                        "0": { label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyDeadline: {
                        "0": { label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmount: {
                        "0": { label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmountVotes: {
                        "0": { label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmountRequired: {
                        "0": { label:`value: '',`,value: '', type: "uint" },
                    },
                    amountOfTokensRequired: {
                        "0": { label:`value: '',`,value: '', type: "uint" },
                    },
                    addTargetAllowance: {
                        "0": { label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        "1": { label:`value: '',`,value: '', type: "uint256" },
                    },
                    placeBet: {
                        "0": { label:`value: "",`,value: "", type: "uint" },
                        "1": { label:`value: '',`,value: '', type: "uint256" },
                    },
                    betBulk: {
                        "0": { label:`value: "",`,value: "", type: "uint" },
                        "1": { label:`value: '',`,value: '', type: "uint256" },
                    },
                    voteOnProposal: {
                        "0": { label:`value: "",`,value: "", type: "uint" },
                        "1": { label:`value: '',`,value: '', type: "uint" },
                    },
                    DAIBalanceOf: {"0": { label:`value: "",`,value: "", type: "address" }, },
                    getPair: {
                        "0": { label:`value: "",`,value: "", type: "address" },
                        "1": { label:`value: "",`,value: "", type: "address" },
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
            this.form.targetAllowance["0"].value = this.first_acc.address
            this.form.lastResultOf["0"].value = this.first_acc.address
            // this.form.targetAllowance["1"].value = '0xfab5299d486725319aae4d02ee48500affa2d418'
            // this.form.addRouletteAllowance["1"].value = '0xfab5299d486725319aae4d02ee48500affa2d418'
            this.form.DAIBalanceOf["0"].value = this.first_acc.address
            this.form.getVoterVoteIndex["1"].value = this.first_acc.address
            this.form.getVoteResult["2"].value = this.first_acc.address
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
