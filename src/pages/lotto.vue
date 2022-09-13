<template>
    <div class="flex-column " >


        <div class="flex-column" style="z-index: 2" > <!-- Buy Ticket -->

            <div v-if="loadings.daiBalanceOfAndAllowance" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.walletInfo}}</span>
            </div>

            <div v-if="loadings.currentRoundAndLastTicket" class="flex-column opacity-75">
                <i class="fas fa-circle-notch spin-nback"></i>
                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.roundInfo}}</span>
            </div>
            <div v-if="!loadings.daiBalanceOfAndAllowance && !loadings.currentRoundAndLastTicket">
                <div @click="execute_addFullTargetAllowance"  v-if="values.dai_dao_allowance < 999999999"  
                    class="n-flat pa-2 clickable opacity-hover-50 mb-5 mt-3 border-r-25"
                >
                    <div v-if="loadings.signup" class="flex-column opacity-75">
                        <i class="fas fa-circle-notch spin-nback"></i>
                        <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                    </div>
                    {{LANG.signup}} 
                </div>
            </div>

        
            <template v-if="values.dai_dao_allowance > 0 && !!values.accountVoteIndex" >
                <div class="flex-column" v-show="togglers.buy_advanced2 ">
                    <div class="flex-column  n-conve my-2 border-r-25 mx-8 pa-2 px-5 " > <!-- Results -->
                        <div class="flex-column " >
                            <div class="tx-xs">
                                Referral Bonus:
                            </div>
                            <div class="tx-secondary">
                                ${{values.val_getVoterRefAmount}}
                            </div>

                            <div @click="execute_withdrawBonus"  v-if="values.val_getVoterRefAmount > 0"
                                class="n-flat pa-2 clickable opacity-hover-75 border-r-25   tx-xs mt-2"
                            >
                                <div v-if="loadings.withdrawBonus" class="flex-column opacity-75 mb-1">
                                    <i class="fas fa-circle-notch spin-nback"></i>
                                    <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                                </div>
                                Withdraw Bonus
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="w-100 flex-between tx-sm" v-if="values.dai_dao_allowance > 0 && togglers.buy_advanced3">
                <div></div>
                <div @click="togglers.buy_advanced2 = !togglers.buy_advanced2"
                :class="[togglers.buy_advanced2 ? 'n-inset' : 'n-flat']"
                    class=" clickable pa-2 opacity-hover-50 border-r-50"
                >
                    <i :class="[togglers.buy_advanced2 ? 'fa-minus' : 'fa-plus']" class="fa"></i>
                </div>
            </div>

        </div>

        <tx-card v-show="false" ref="addFullTargetAllowance" 
            :props="
                {
                    title: 'Add FULL DAI Allowance to target',
                    form_args: form.addFullTargetAllowance,
                    abi: ABIS.ERC20,
                    address: CURRENT_NETWORK.BASE_USD_ADDRESS,
                    function: 'approve',
                    res_type: 'uint256',
                    button_only: true,
                }"
        />
        <tx-card v-show="false" ref="ref_getVoteScratchedNumberMulticall" 
            :props="
                {
                    title: 'form_getVoteScratchedNumberMulticall',
                    form_args: form.form_getVoteScratchedNumberMulticall,
                    abi: ABIS.LOTTO,
                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                    function: 'getVoteScratchedNumber',
                    DEBUG: true,
                    res_type: 'uint',
                    call_only: true,
                    make_multicall: true,
                }"
        />
        <tx-card   v-show="false" ref="ref_withdrawBonus" 
            :props="
                {
                    title: 'withdrawAll',
                    form_args: form.withdrawRefBonus,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'withdrawRefBonus',
                    DEBUG: true,
                    res_type: 'uint',
                }"
        />

        <div id="award" style="position: absolute; top: 0; left: 0"></div>
        <div class="py-8" > </div>

        <div v-if="values.dai_dao_allowance > 0" v-show="pro_mode">
            <div class="flex-column ">
                <tx-card  class=" flex-column  " 
                    :props="
                        {
                            title: 'execute proposal',
                            form_args: form.executeProposal,
                            abi: ABIS.DAO,
                            address: CURRENT_NETWORK.DAO_ADDRESS,
                            function: 'executeProposal',
                        }"
                />
                <tx-card  class=" flex-column  " 
                    :props="
                        {
                            title: 'requestResolveRound',
                            form_args: form.requestResolveRound,
                            abi: ABIS.LOTTO,
                            address: CURRENT_NETWORK.LOTTO_ADDRESS,
                            function: 'requestResolveRound',
                        }"
                />
                <tx-card  class=" flex-column  " 
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

        <div v-if="values.dai_dao_allowance > 0 && !!values.accountVoteIndex" v-show="pro_mode">
            <div  style="z-index: 50">
                <div class="flex-column" >
                    <div class="flex-column  n-conve my-2 border-r-25 mx-8 pa-2 px-5 " > <!-- Results -->
                        Results:

                        
                        <div class="opacity-50 tx-xs my-2" v-if="!!values.val_randomResultBlock" >
                            <!-- <span class="tx-sm mb-2 flex-row">Block: {{values.val_randomResultBlock}}</span> -->

                            <div v-if="loadings.resultsMulticall" class="flex-column opacity-75 tx-lg">
                                <i class="fas fa-circle-notch spin-nback"></i>
                                <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> Winning Tickets</span>
                            </div>
                            <div class="tx-center">
                                Scratch:
                                <input type="text" name="" v-model="form.form_multiCallResultsStart" class="n-flat noborder px-2 py-1 tx-right n-tx" style="width: 30px">
                                <!-- {{form.form_multiCallResultsStart}} -->
                                ,
                                {{form.form_multiCallResultsEnd}}
                            </div>
                                
                            <div class="flex-row nowrap">
                                
                                <input type="range" name="" :max="values.accountVoteIndex + values.accountVoteLength" 
                                :min="form.form_multiCallResultsStart"
                                 v-model="form.form_multiCallResultsEnd" class="n-flat noborder pa-2 n-tx" style="width: 60px">

                                <div class="clickable n-flat pa-2"
                                    @click="getResultsMulticall"
                                >
                                    Get Results
                                </div>
                            </div>
                            <div v-if="Object.keys(values.val_results) == 0" >
                                <div class="py-4 tx-center opacity-50">
                                    No Winning Tickets Yet
                                </div>
                            </div>
                            <div v-if="Object.keys(values.val_results) != 0" >
                                <div style="max-height: 100px; overflow-y: scroll;" class="py-2 n-inset">
                                    
                                    <div v-for="(item,index) in Object.keys(values.val_results)" class="flex-column w-100">
                                        <div class="flex-row py-1">
                                            <div class="pr-2">
                                                <!-- {{index}} -->
                                                Ticket:
                                            </div>
                                            <div>
                                                # {{item}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="opacity-50 tx-xs my-5" v-if="!values.val_randomResultBlock">
                            Not Done
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-if="values.dai_dao_allowance > 0" v-show="pro_mode">
            <div class="flex-wrap ">
                <tx-card  class=" flex-column  mt-3" 
                    :props="
                        {
                            title: 'Make a proposal',
                            form_args: form.createProposal,
                            abi: ABIS.DAO,
                            address: CURRENT_NETWORK.DAO_ADDRESS,
                            function: 'createProposal',
                        }"
                />
            </div>

            <div class="flex-wrap ">
                <tx-card  class=" flex-column  " 
                    :props="
                        {
                            title: 'Withdraw from Proposal',
                            form_args: form.withdrawFromProposal,
                            abi: ABIS.DAO,
                            address: CURRENT_NETWORK.DAO_ADDRESS,
                            function: 'withdrawFromFailedProposal',
                        }"
                />
            </div>
            <div class="py-4" > </div>
        </div>

        <div class="flex-column flex-lg_x-row pt-8">
            <lotto-current-round ref="currentRound" @update_loading="update_loading"
                @update_currentRound="update_currentRound" :_loadings="loadings" :_values="values"
            />

            <div class="flex-column flex-md_x-row" >

                <div @click="execute_addFullTargetAllowance"  v-if="values.dai_dao_allowance < 999999999" 
                    class="n-flat pa-5 clickable opacity-hover-75 mt-3 border-r-25 show-xs_md tx-xl mb-8"
                >
                    <div v-if="loadings.signup" class="flex-column opacity-75">
                        <i class="fas fa-circle-notch spin-nback"></i>
                        <span class="opacity-75 tx-xs tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                    </div>
                    {{LANG.signup}} 
                </div>

                <div id="store"></div>


                <div v-if="dark_mode" style="height: 200px; width: 2px; background: white; display: block;" class="opacity-10 show-xs_md" > </div>
                <div v-if="!dark_mode" style="height: 200px; width: 2px; background: black; display: block;" class="opacity-10 show-xs_md" > </div>

                <lotto-current-ticket ref="currentTicket" v-if="values.current_round > 0" @signup="execute_addFullTargetAllowance"
                    @update_currentTicket="update_currentTicket" :_loadings="loadings" :_values="values" @update_loading="update_loading"
                />

            </div>
            <!-- <div class="show-xs_md my-8"></div> -->
            <div id="user"></div>

            <div v-if="dark_mode" style="width: 2px; background: white;" class="py-100 block opacity-10 show-xs_md" > </div>
            <div v-if="!dark_mode" style="width: 2px; background: black;" class="py-100 block opacity-10 show-xs_md" > </div>

            <div style="height: 80px" class="show-md_lg"> </div>

            <lotto-my-account ref="myAccount" @update_myAccount="update_myAccount" @update_loading="update_loading"/>

            <lotto-bottom-menu />

            <div class="flex-column " v-show="false">
                <div v-if="values.dai_dao_allowance > 0">
                        <tx-card  class=" flex-column  " 
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
                        <tx-card class=" flex-column  " 
                            :props="
                                {
                                    title: 'form_getVoteScratchedNumberMulticall',
                                    form_args: form.form_getVoteScratchedNumberMulticall,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getVoteScratchedNumber',
                                    DEBUG: true,
                                    res_type: 'uint',
                                    call_only: true,
                                    make_multicall: true,
                                }"
                        />
                        <tx-card  class=" flex-column  " 
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
                        <tx-card  class=" flex-column  " 
                            :props="
                                {
                                    title: 'getWinner',
                                    form_args: form.getWinner,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'getWinner',
                                    DEBUG: true,
                                    res_type: 'uint',
                                    call_only: true,
                                }"
                        />
                        <tx-card  class=" flex-column  " 
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
                        <tx-card  class=" flex-column  " 
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
            </div>

        <div v-show="false">
            <div class="flex-column ">
                <tx-card  class=" flex-column  " 
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
            <div class="flex-row">
                <tx-card  class=" flex-column  " 
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
                <tx-card  class=" flex-column  " 
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
        </div>



        <div class="flex-column n-flat mx-2 pa-2" v-if="false">  <!--CONTRACT -->
            <h4 class="tx-ls-3 my-2 tx-center">CONTRACT </h4>
            <hr class="w-50 opacity-10">
            <div class="flex-wrap ">
                <tx-card  class=" flex-column  " 
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
                <tx-card  class=" flex-column  " 
                    :props="
                        {
                            title: 'set Requester',
                            form_args: form.setRequester,
                            abi: ABIS.RESOLVER,
                            address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                            function: 'setRequester',
                        }"
                />
                <tx-card  class=" flex-column  " 
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
</template>

                        

<script>
    import {
      Multicall,
    } from 'ethereum-multicall';
    import { ethers } from 'ethers';

    import { ABIS, CURRENT_NETWORK } from '../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../store/helpers';
    
    import txCard from "../components/tx-card.vue";
    import lottoBottomMenu from "./lotto/lotto-bottom-menu.vue";
    import lottoMyAccount from "./lotto/lotto-my-account.vue";
    import lottoCurrentTicket from "./lotto/lotto-current-ticket.vue";
    import lottoCurrentRound from "./lotto/lotto-current-round.vue";

    export default {
        name: 'lotto',     
        components: {
            txCard,

            lottoBottomMenu,
            lottoMyAccount,
            lottoCurrentRound,
            lottoCurrentTicket,
        },
        data() {
            return {
                CURRENT_NETWORK,
                ABIS,

                loading: false,
                values: {
                    dai_balance_of: null,
                    dai_dao_allowance: null,
                    current_round: null,
                    prize_pool: null,
                    accountVoteIndex: null,
                    deadline: null,
                    accountVoteLength: null,
                    val_getVoterRefAmount: null,
                    val_randomResultBlock: null,

                    val_results: {},
                },
                loadings: {
                    resultsMulticall: false,
                    daiBalanceOfAndAllowance: false,
                    currentRoundAndLastTicket: false,
                    withdrawBonus: false,
                    buyTicket: false,
                },
                togglers: {
                    results_advanced: false,
                    buy_advanced1: false,
                    buy_advanced2: false,
                    buy_advanced3: false,
                },
                form: {
                    form_buyTicketRef: "",
                    form_buyTicketAmount: 0,
                    form_multiCallResults: "",
                    form_multiCallResultsStart: "",
                    form_multiCallResultsEnd: "",
                    proposalIndexAct: "",
                    proposalIndexRead: "",
                    votePos: "",

                    createProposal: {
                        "0": { placeholder: "Votes", value: "", type: "uint" },
                        "1": { placeholder: "Deadline", value: "", type: "uint" },
                    },

                    withdrawFromProposal: {
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                    },
                    withdrawRefBonus: {
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
                    getWinner: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                    },
                    wonAmount: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                    },
                    getVoteScratchedNumber: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                    },
                    withdrawAll: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "uint" },
                        
                        "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                        "3": {placeholder:"vote distance",label:`value: "",`,value: "", type: "uint" },
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
                    form_getVoteScratchedNumberMulticall: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        
                        // "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    getWonAmountMulticall: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"vote number",label:`value: "",`,value: "", type: "range:uint" },
                        
                        // "2": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    transferOwnership: {                        
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                    },
                    getProposalPropertyResult: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    addTargetAllowance: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        
                        "1": {placeholder:"amount",label:`value: '',`,value: '', type: "uint256" },
                    },
                    addFullTargetAllowance: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        
                        "1": {placeholder:"amount",label:`value: '',`,value: '9999999999', type: "uint256" },
                    },
                },
            };
        }, 
        computed: {
            LANG()                  { return this.$store.getters.LANG },
            accs_length()           { return this.$store.getters.accs_length },
            first_acc()             { return this.$store.getters.first_acc },
            dark_mode()             { return this.$store.getters.dark_mode },
            pro_mode()              { return this.$store.getters.pro_mode },

        },
        async mounted()
        {
            var url_string = window.location.href
            var url = new URL(url_string);
            console.log(url_string, url);
            var c = url.searchParams.get("round");
            console.log(c);

            // this.form.getVoterAmountOfVotes["1"].value = this.first_acc.address
            // this.form.getVoteResult["2"].value = this.first_acc.address
            this.form.withdrawAll["2"].value = this.first_acc.address
            this.form.getVoteResultMulticall["2"].value = this.first_acc.address
            this.form.withdrawAmount["2"].value = this.first_acc.address
            // this.form.voteOnProposal["2"].value = this.first_acc.address
            // this.form.form_buyTicketRef = this.first_acc.address

            // await this.trigger_daiBalanceOfAndAllowance()
            
            // await this.trigger_currentRoundAndLastTicket()

        },
        methods: {
            parseDecimals,
            shortAddress,
            update_loading(msg)
            {
                this.loadings[msg.key] = msg.value
            },
            async update_myAccount(msg)
            {
                // console.log("update_myAccount",msg)
                this.values.dai_balance_of = msg.data.dai_balance_of
                this.values.dai_dao_allowance = msg.data.dai_dao_allowance

                // await this.trigger_currentRoundAndLastTicket()
            },
            async update_currentRound(msg)
            {
                // console.log("update_currentRound",msg)
                this.values.current_round = msg.data.current_round
                this.values.prize_pool = msg.data.prize_pool
                this.values.val_randomResultBlock = msg.data.val_randomResultBlock
                this.values.deadline = msg.data.deadline

                // await this.trigger_currentRoundAndLastTicket()
            },
            async update_currentTicket(msg)
            {
                // console.log("update_currentTicket",msg)
                this.values.accountVoteIndex = msg.data.accountVoteIndex
                // this.values.prize_pool = msg.data.prize_pool

                // await this.trigger_currentRoundAndLastTicket()
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
            
            async getResultsMulticall()
            {
                if (this.loadings.resultsMulticall) return
                this.loadings.resultsMulticall = true

                try {
                    // this.form.form_multiCallResultsStart = this.values.accountVoteIndex
                    // this.form.form_getVoteScratchedNumberMulticall["0"].value = (parseInt(this.values.current_round) - 1)+""
                    this.form.form_getVoteScratchedNumberMulticall["1"].value =
                        `${this.form.form_multiCallResultsStart},${this.form.form_multiCallResultsEnd}`

                    let asd = await this.$refs.ref_getVoteScratchedNumberMulticall.execute()
                    console.log("asd", asd)
                    console.log("this.$refs.targetAllowance.theResult.filter((o) => o != 0)")
                    console.log(asd.filter((o) => o != 0))
                    this.values.val_results = asd.filter((o) => o != 0).reduce((o, key) => Object.assign(o, {[key]: "whatever"}), {})
                    // console.log("asd", this.$refs.ref_getVoteScratchedNumberMulticall)
                    // console.log("asd", this.$refs.ref_getVoteScratchedNumberMulticall.theResult)

                    // yourArray.reduce((o, key) => Object.assign(o, {[key]: whatever}), {})
                    // console.log("this.$refs.targetAllowance.theResult.filter((o) => o != 0)")
                    // console.log(this.$refs.ref_getVoteScratchedNumberMulticall)
                    // console.log(asd.filter((o) => o != 0))
                    // this.values.val_results = this.$refs.ref_getVoteScratchedNumberMulticall.theResult.filter((o) => o != 0).reduce((o, key) => Object.assign(o, {[key]: "whatever"}), {})


                    // await this.$refs.targetAllowance.execute()
                } catch (error) {
                    console.log("failed call")
                }

                this.loadings.resultsMulticall = false
            },
            async execute_withdrawBonus()
            {
                if (this.loadings.withdrawBonus) return
                this.loadings.withdrawBonus = true

                try {
                    await this.$refs.ref_withdrawBonus.execute()
                    // await this.$refs.targetAllowance.execute()
                    // this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult
                } catch (error) {
                    console.log("failed call")
                }

                    console.log("withdrawBonus")
                this.loadings.withdrawBonus = false
            },
            async execute_addFullTargetAllowance()
            {
                if (this.loadings.signup) return
                this.loadings.signup = true

                try {
                    await this.$refs.addFullTargetAllowance.execute()
                    await this.$refs.targetAllowance.execute()
                    this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult
                } catch (error) {
                    console.log("failed call")
                }

                this.loadings.signup = false
            },
            async execute_set0TargetAllowance()
            {
                if (this.loadings.signup) return
                this.loadings.signup = true

                try {
                    this.form.addFullTargetAllowance ["1"].value = "0"
                    await this.$refs.addFullTargetAllowance.execute()
                    await this.$refs.targetAllowance.execute()
                    this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult
                } catch (error) {
                    console.log("failed call")
                }

                this.loadings.signup = false
            },
        },
    }
</script>


                                <!-- make_multicall -->
                            <!-- <div class="flex-column ">
                                <tx-card  class=" flex-column  " 
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
                                <tx-card  class=" flex-column  " 
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
                            </div> -->


                        <!-- <tx-card  class=" flex-column  " 
                            :props="
                                {
                                    title: 'set Requester',
                                    form_args: form.setRequester,
                                    abi: ABIS.RESOLVER,
                                    address: CURRENT_NETWORK.RESOLVER_ADDRESS,
                                    function: 'setRequester',
                                }"
                        /> -->

             <!--            <tx-card  class=" flex-column  " 
                            :props="
                                {
                                    title: 'transferOwnership to dao',
                                    form_args: form.transferOwnership,
                                    abi: ABIS.LOTTO,
                                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                                    function: 'transferOwnership',
                                    res_type: 'uint256',
                                }"
                        /> -->