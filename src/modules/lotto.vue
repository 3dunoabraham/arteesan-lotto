<template>
        
    <div class="flex-column ">
        <div class="flex-column flex-xl2x-row">
            <div class="flex-column ">
                <div class="flex-column n-flat mx-2 pa-2">
                    <h4 class="tx-ls-3 my-2 tx-center">DAO </h4>
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
                    <div class="flex-wrap ">
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'make a proposal',
                                    form_args: form.createProposal,
                                    abi: ABIS.DAO,
                                    address: CURRENT_NETWORK.DAO_ADDRESS,
                                    function: 'createProposal',
                                    DEBUG: true,
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
                    </div>
                </div>
                <div class="flex-column n-flat mx-2 pa-2">
                    <h4 class="tx-ls-3 my-2 tx-center">CONTRACT </h4>
                    <hr class="w-50 opacity-10">
                    <div class="flex-row">
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
                    <div class="flex-wrap ">
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
                    </div>
                    <hr class="w-50 opacity-10">
                    <div class="flex-wrap ">
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
                </div>
            </div>
            <div class="flex-column flex-lg2x-row">
                <div class="flex-column n-flat mx-2 pa-2">
                    <h4 class="tx-ls-3 my-2 tx-center">READ PROPOSAL </h4>

                    <small class="tx-xs mb-1 tx-ls-1">setProposalIndexInRead</small>
                    <div class="flex-row nowrap">
                        <input type="text" name="" v-model="form.proposalIndexRead" class="n-flat noborder pa-2 n-tx" style="width: 60px">
                        <div class="clickable n-flat pa-2"
                            @click="setProposalIndexInRead"
                        >
                            set
                        </div>
                    </div>
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
                    <hr class="w-50 opacity-10">
                    <div class="flex-row">
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
                                    title: 'tokens required',
                                    form_args: form.amountOfTokensRequired,
                                    abi: ABIS.DAO,
                                    address: CURRENT_NETWORK.DAO_ADDRESS,
                                    function: 'proposals',
                                    res_type: 'struct.amountOfTokensRequired.uint256',
                                    call_only: true,
                                }"
                        />
                    </div>
                    <div class="flex-row">
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'get randomResult  ',
                                    form_args: form.getProposalPropertyResult,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'gameRounds',
                                    res_type: 'struct.randomResult.uint',
                                    call_only: true,
                                }"
                        />
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
                    </div>
                    <div class="flex-row">
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
                    <div class="flex-row">
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'user vote index',
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
                                    title: 'user votes',
                                    form_args: form.getVoterAmountOfVotes,
                                    abi: ABIS.DAO,
                                    address: CURRENT_NETWORK.DAO_ADDRESS,
                                    function: 'getVoterAmountOfVotes',
                                    DEBUG: true,
                                    res_type: 'uint',
                                    call_only: true,
                                }"
                        />
                    </div>
                    <hr class="w-50 opacity-10">
                    <small class="tx-xs mb-1 tx-ls-1">setVotePos</small>
                    <div class="flex-row nowrap">
                        <input type="text" name="" v-model="form.votePos" class="n-flat noborder pa-2 n-tx" style="width: 60px">
                        <div class="clickable n-flat pa-2"
                            @click="setVotePos"
                        >
                            set
                        </div>
                    </div>
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'getVoteRedeemd',
                                    form_args: form.getVoteRedeemd,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getVoteRedeemd',
                                    DEBUG: true,
                                    res_type: 'uint',
                                    call_only: true,
                                }"
                        />
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'getVoteScratchedNumber',
                                    form_args: form.getVoteScratchedNumber,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getVoteScratchedNumber',
                                    DEBUG: true,
                                    res_type: 'uint',
                                    call_only: true,
                                }"
                        />
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'getVoteScratchedNumberMulticall',
                                    form_args: form.getVoteScratchedNumberMulticall,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getVoteScratchedNumber',
                                    DEBUG: true,
                                    res_type: 'uint',
                                    call_only: true,
                                    make_multicall: true,
                                }"
                        />
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'wonAmount',
                                    form_args: form.wonAmount,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getWonAmount',
                                    DEBUG: true,
                                    res_type: 'uint256',
                                    call_only: true,
                                }"
                        />
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'getWonAmountMulticall',
                                    form_args: form.getWonAmountMulticall,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getWonAmount',
                                    DEBUG: true,
                                    res_type: 'uint256',
                                    call_only: true,
                                    make_multicall: true,
                                }"
                        />
                        <tx-card  class=" flex-column pa-2 border-r-15 " 
                            :props="
                                {
                                    title: 'withdrawAmount',
                                    form_args: form.withdrawAmount,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'withdrawAmount',
                                    DEBUG: true,
                                    res_type: 'uint256',
                                }"
                        />
                </div>
                <div class="flex-column  n-flat mx-2 pa-2">
                    <h4 class="tx-ls-3 my-2 tx-center">ACT ON PROPOSAL </h4>
                    <small class="tx-xs mb-1 tx-ls-1">setProposalIndexInAct</small>
                    <div class="flex-row nowrap">
                        <input type="text" name="" v-model="form.proposalIndexAct" class="n-flat noborder pa-2 n-tx" style="width: 60px">
                        <div class="clickable n-flat pa-2"
                            @click="setProposalIndexInAct"
                        >
                            set
                        </div>
                    </div>
                    <hr class="w-50 opacity-10">

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
                    <div class="flex-column n-flat">
                        <div class="flex-column ">
                            make_multicall
                            <tx-card  class=" flex-column pa-2 border-r-15 " 
                                :props="
                                    {
                                        title: 'getVoteResultMulticall',
                                        form_args: form.getVoteResultMulticall,
                                        abi: ABIS.LOTTO,
                                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                        function: 'getVoteResult',
                                        DEBUG: true,
                                        res_type: 'uint',
                                        advanced: true,
                                        make_multicall: true,
                                    }"
                            />
                        </div>
                        <div class="flex-column ">
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
                                    }"
                            />
                        </div>
                        <div class="flex-column ">
                            <tx-card  class=" flex-column pa-2 border-r-15 " 
                                :props="
                                    {
                                        title: 'withdrawAll',
                                        form_args: form.withdrawAll,
                                        abi: ABIS.LOTTO,
                                        address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                        function: 'withdrawAll',
                                        DEBUG: true,
                                        res_type: 'uint',
                                    }"
                            />
                        </div>
                    </div>

                    <hr class="w-50 opacity-10">
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
                    <hr class="w-50 opacity-10">

                    <div class="flex-wrap ">
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
                    </div>
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
            </div>
        </div>
    </div>
</template>
<script>
    import txCard from "../components/tx-card.vue";

    import { ABIS, CURRENT_NETWORK } from '../store/constants';

    import {
      Multicall,
    } from 'ethereum-multicall';
    import { ethers } from 'ethers';


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
                    proposalIndexAct: "",
                    proposalIndexRead: "",
                    votePos: "",

                    createProposal: {
                        "0": { placeholder: "min. votes", value: "", type: "uint" },
                        "1": { placeholder: "minutes", value: "", type: "uint" },
                    },

                    approveCard: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.CONTROLLER_ADDRESS`,value: CURRENT_NETWORK.CONTROLLER_ADDRESS, }, 
                        "1": {placeholder:"",label:`value: "",`,value: "", },
                    },
                    withdrawFromProposal: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    requestResolveRound: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    randomRequests: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    resolveBet: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    executeProposal: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    increaseFunds: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint256" },
                    },
                    registeredFunds: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    lastResultOf: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    randomWords: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    setRequester: {                        
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.LOTTO_ADDRESS`,value: CURRENT_NETWORK.LOTTO_ADDRESS, type: "address" },
                    },
                    withdrawAmount: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        "2": {placeholder:"voter address",label:`value: "",`,value: "", type: "address" },
                    },
                    wonAmount: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                    },
                    getVoteScratchedNumber: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                    },
                    getVoteRedeemd: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                    },
                    getVoterAmountOfVotes: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    withdrawAll: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        
                        "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getVoteResult: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        
                        "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getVoteResultMulticall: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        
                        "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getVoteScratchedNumberMulticall: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        
                        // "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getWonAmountMulticall: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        
                        // "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getVoterVoteIndex: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        // 
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    targetAllowance: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        
                        "1": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                    },
                    transferOwnership: {                        
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                    },
                    getProposalPropertyResult: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyDeadline: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmount: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmountVotes: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    getProposalPropertyAmountRequired: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    amountOfTokensRequired: {
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    addTargetAllowance: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        
                        "1": {placeholder:"amount",label:`value: '',`,value: '', type: "uint256" },
                    },
                    voteOnProposal: {
                        "0": {placeholder:"index",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote amount",label:`value: '',`,value: '', type: "uint" },
                    },
                    DAIBalanceOf: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getPair: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
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
            this.form.getVoterAmountOfVotes["1"].value = this.first_acc.address
            this.form.getVoterVoteIndex["1"].value = this.first_acc.address
            this.form.getVoteResult["2"].value = this.first_acc.address
            this.form.withdrawAll["2"].value = this.first_acc.address
            this.form.getVoteResultMulticall["2"].value = this.first_acc.address
            this.form.withdrawAmount["2"].value = this.first_acc.address
        },
        methods: {
            rangeGetVoteResult()
            {
                return []
            },
            async makeMultiCall()
            {

                let provider = ethers.getDefaultProvider();

                // you can use any ethers provider context here this example is
                // just shows passing in a default provider, ethers hold providers in
                // other context like wallet, signer etc all can be passed in as well.
                const multicall = new Multicall({ ethersProvider: provider, tryAggregate: true });

                const contractCallContext = [
                    {
                        reference: 'testContract',
                        contractAddress: '0x6795b15f3b16Cf8fB3E56499bbC07F6261e9b0C3',
                        abi: [ { name: 'foo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256' }] } ],
                        calls: [{ reference: 'fooCall', methodName: 'foo', methodParameters: [42] }]
                    },
                    {
                        reference: 'testContract2',
                        contractAddress: '0x66BF8e2E890eA0392e158e77C6381b34E0771318',
                        abi: [ { name: 'fooTwo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256', name: "path", "type": "address[]" }] } ],
                        calls: [{ reference: 'fooTwoCall', methodName: 'fooTwo', methodParameters: [42] }]
                    }
                ];

                const results = await multicall.call(contractCallContext);
                console.log(results);

                // results:
                // {
                //   results: {
                //       testContract: {
                //           originalContractCallContext:  {
                //             reference: 'testContract',
                //             contractAddress: '0x6795b15f3b16Cf8fB3E56499bbC07F6261e9b0C3',
                //             abi: [ { name: 'foo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256' }] } ],
                //             calls: [{ reference: 'fooCall', methodName: 'foo', methodParameters: [42] }]
                //           },
                //           callsReturnContext: [{
                //               returnValues: [{ amounts: BigNumber }],
                //               decoded: true,
                //               reference: 'fooCall',
                //               methodName: 'foo',
                //               methodParameters: [42],
                //               success: true
                //           }]
                //       },
                //       testContract2: {
                //           originalContractCallContext:  {
                //             reference: 'testContract2',
                //             contractAddress: '0x66BF8e2E890eA0392e158e77C6381b34E0771318',
                //             abi: [ { name: 'fooTwo', type: 'function', inputs: [ { name: 'example', type: 'uint256' } ], outputs: [ { name: 'amounts', type: 'uint256[]' ] } ],
                //             calls: [{ reference: 'fooTwoCall', methodName: 'fooTwo', methodParameters: [42] }]
                //           },
                //           callsReturnContext: [{
                //               returnValues: [{ amounts: [BigNumber, BigNumber, BigNumber] }],
                //               decoded: true,
                //               reference: 'fooCall',
                //               methodName: 'foo',
                //               methodParameters: [42],
                //               success: true
                //           }]
                //       }
                //   },
                //   blockNumber: 10994677
                // }

            },
            async connectWallet() {
                await this.$store.dispatch("connectWallet")
                // this.$refs.exchange.getTradeData(true)
                // this.$refs.exchange.getAccountBalances(true)
            },
            setProposalIndexInRead() {
                this.form.getProposalPropertyDeadline ["0"].value = this.form.proposalIndexRead
                this.form.getProposalPropertyResult ["0"].value = this.form.proposalIndexRead
                this.form.randomRequests ["0"].value = this.form.proposalIndexRead
                this.form.getProposalPropertyAmount ["0"].value = this.form.proposalIndexRead
                this.form.amountOfTokensRequired ["0"].value = this.form.proposalIndexRead
                this.form.getProposalPropertyAmountVotes ["0"].value = this.form.proposalIndexRead
                this.form.getProposalPropertyAmountRequired ["0"].value = this.form.proposalIndexRead
                this.form.getVoterVoteIndex ["0"].value = this.form.proposalIndexRead
                this.form.getVoteRedeemd ["0"].value = this.form.proposalIndexRead
                this.form.getVoteScratchedNumberMulticall ["0"].value = this.form.proposalIndexRead
                this.form.getVoteScratchedNumber ["0"].value = this.form.proposalIndexRead
                this.form.wonAmount ["0"].value = this.form.proposalIndexRead
                this.form.getWonAmountMulticall ["0"].value = this.form.proposalIndexRead
                this.form.getVoterAmountOfVotes ["0"].value = this.form.proposalIndexRead
                this.form.withdrawAmount["0"].value = this.form.proposalIndexRead
            },
            setVotePos() {
                this.form.wonAmount["1"].value = this.form.votePos
                // this.form.getWonAmountMulticall["1"].value = this.form.votePos
                // this.form.getVoteScratchedNumberMulticall["1"].value = this.form.votePos
                this.form.getVoteScratchedNumber["1"].value = this.form.votePos
                this.form.getVoteRedeemd["1"].value = this.form.votePos
                this.form.withdrawAmount["1"].value = this.form.votePos
            },
            setProposalIndexInAct() {
                this.form.voteOnProposal ["0"].value = this.form.proposalIndexAct
                this.form.getVoteResult ["0"].value = this.form.proposalIndexAct
                this.form.withdrawAll ["0"].value = this.form.proposalIndexAct

                this.form.getVoteResultMulticall ["0"].value = this.form.proposalIndexAct

                this.form.withdrawFromProposal ["0"].value = this.form.proposalIndexAct

                this.form.executeProposal ["0"].value = this.form.proposalIndexAct
                this.form.requestResolveRound ["0"].value = this.form.proposalIndexAct
                this.form.resolveBet ["0"].value = this.form.proposalIndexAct
            },
        },
    }
</script>
