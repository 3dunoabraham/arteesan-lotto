<template>
        
    <div class="flex-column " >

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
        
        <tx-card v-show="false" ref="ref_randomResultBlock"
            :props="
                {
                    title: 'getDeadline ',
                    form_args: form.form_getProposalPropertyResultBlock,
                    abi: ABIS.LOTTO,
                    address: CURRENT_NETWORK.LOTTO_ADDRESS,
                    function: 'gameRounds',
                    res_type: 'struct.randomResultBlock.uint',
                    call_only: true,
                }"
        />
        <tx-card v-show="false" ref="accountVoteIndex"
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
        <tx-card  v-show="false" ref="ref_getVoterRefAmount"
            :props="
                {
                    title: 'tokens required',
                    form_args: form.form_getVoterRefAmount,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'getVoterRefAmount',
                    res_type: 'uint256',
                    call_only: true,
                    DEBUG: true,
                }"
        />
        <tx-card v-show="false" ref="ticketLength"
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
        <tx-card v-show="false" ref="ref_buyTicket"  class=" flex-column tx-xl  px-8 py-2" 
            :props="
                {
                    title: LANG.buyTicket,
                    form_args: form.voteOnProposal,
                    abi: ABIS.DAO,
                    address: CURRENT_NETWORK.DAO_ADDRESS,
                    function: 'voteOnProposal',
                    DEBUG: true,
                }"
        />




        <div id="award" style="position: absolute; top: 0; left: 0"></div>
        <div class="py-8" > </div>

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
            <lotto-current-round ref="currentRound" 
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

                <div class="flex-column  n-flat border-r-25 mx-8 pa-2 pos-relative" style="z-index: 2" > <!-- Buy Ticket -->

                    <!-- <h5 class="tx-ls-5 my-2 tx-center opacity-50">OPEN LOTTO </h5>
                    <hr class="w-100 opacity-10 "> -->
                    <div class="show-lg_x  n-tx-s tx-xl"  style="color: #0b85ff; position: absolute; top: -55px;"><i class="fa fa-store"></i></div>

                    <h5 class="tx-ls-5 my-2 tx-center opacity-50"> {{LANG.myTicket.toUpperCase() }} </h5>

                    <hr class="w-100 opacity-10 ">

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

                    <div v-if="!!values.accountVoteIndex" class="flex-column">
                        <div class="flex">
                            <div v-if="values.accountVoteIndex == 1" class="flex-column">
                                <span class="tx-xs">Ticket Number: </span>
                                <span class="tx-xl">1</span>
                            </div>
                            <div v-if="values.accountVoteIndex > 1" class="flex-column">
                                <span class="tx-xs">Ticket Pack Number: </span>
                                <span class="tx-xl">{{values.accountVoteIndex}}</span>
                            </div>

                            <div v-if="dark_mode" style="height: 70px; width: 2px; background: white; display: block;" class="mx-3 mb-3 opacity-10"></div>
                            <div v-if="!dark_mode" style="height: 70px; width: 2px; background: black; display: block;" class="mx-3 mb-3 opacity-10"></div>

                            <div v-if="values.accountVoteLength > 0" class="flex-column">
                                <span class="tx-xs">Ticket Length: </span>
                                <span class="tx-xl">{{values.accountVoteLength}}</span>
                            </div>
                        </div>
                    </div>

                <!-- <template > -->

                    <div class="w-100 flex-between " v-if="values.dai_dao_allowance > 0">
                        <div></div>
                        <div class="flex-column " v-if="togglers.buy_advanced3" style="position: absolute; right: 15px; top: 40px">
                            <div @click="togglers.buy_advanced3 = !togglers.buy_advanced3"
                                class=" clickable pa-2  px-3 border-r-50 n-conve"
                            >
                                <i :class="[togglers.buy_advanced3 ? 'fa-times' : 'fa-plus']" class="fa"></i>
                            </div>
                        </div>
                    </div>
                    <template v-if="values.dai_dao_allowance > 0 && !loadings.daiBalanceOfAndAllowance && !loadings.currentRoundAndLastTicket" >

                        <div v-if="!values.accountVoteIndex" class="  flex-column tx-sm w-100" >
                            <div class="" v-if="!values.val_randomResultBlock" >

                                <div class="flex-row n-inset border-r-25 " v-if="!togglers.buy_advanced3">
                                    <div @click="togglers.buy_advanced3 = true"  
                                        class="pt- pa-3 px-1 clickable opacity-hover-75 border-r-15    mb-6 mx-5"
                                    >
                                        <div v-if="loadings.buyTicket" class="flex-column opacity-75 mb-1">
                                            <i class="fas fa-circle-notch spin-nback"></i>
                                            <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                                        </div>
                                        <div class="flex-row tx-xl flex-column ">
                                            <div class="pr-1 tx-lg n-tx-3d tx-ls-3">{{LANG.buy}}</div>
                                            <!-- <div v-if="!!form.form_buyTicketAmount" class="mx-2 tx-lg">{{form.form_buyTicketAmount}}</div> -->
                                            <div class="n-tx-3d tx-ls-">Ticket 
                                                <!-- <span v-if="form.form_buyTicketAmount > 1">(s)</span> -->
                                            </div>
                                            <div class="n-tx-3d hover-hover"><i class=" fa fa-hand-pointer"></i></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="opacity-50 tx-xs my-5" v-if="!!values.val_randomResultBlock">
                                Round Done
                            </div>
                        </div>
                        <div class="  flex-column tx-sm w-100" >
                            <div class="flex-column " v-show="togglers.buy_advanced3">

                                <div class="flex-column my-2">
                                    <div class="flex-between">
                                        <div @click="form.form_buyTicketAmount = form.form_buyTicketAmount <= 1 ? 1 : parseInt(form.form_buyTicketAmount)-1" class=" clickable pa-2 opacity-hover-50 n-border-primary-1 n-flat border-r-50 " >  <i class="fa fa-minus"></i> </div>
                                        <div class="ml-1  flex-column mb-3">
                                            <span class="tx-xs tx-ls-3">{{LANG.amount.toUpperCase()}}</span>
                                            <input type="number" name="" min="0" v-model="form.form_buyTicketAmount" class="n-inset tx-primary noborder pa-2 ma-1 border-r-10 n-tx tx-bold tx-lg" style="width: 100px">
                                        </div>
                                        <div @click="form.form_buyTicketAmount = parseInt(form.form_buyTicketAmount)+1" class=" clickable pa-2 opacity-hover-50 n-border-primary-1 n-flat border-r-50 " >  <i class="fa fa-plus"></i> </div>
                                    </div>
                                    <div class="flex-between">
                                        <button @click="form.form_buyTicketAmount = parseInt(form.form_buyTicketAmount) + 1" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+1</button>

                                        <button @click="form.form_buyTicketAmount = parseInt(form.form_buyTicketAmount) + 10" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+10</button>

                                        <button @click="form.form_buyTicketAmount = parseInt(form.form_buyTicketAmount) + 50" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+50</button>

                                        <button @click="form.form_buyTicketAmount = parseInt(form.form_buyTicketAmount) + 100" class="n-btn pa-2 ma-1 border-r-10 tx-secondary n-border-secondary-1 n-flat">+100</button>
                                    </div>

                                    <div class="flex-row mt-2 n-flat px-2 border-r-15">
                                        <div @click="execute_buyTicket"  style="color: white" 
                                            class="n-flat pa-3  clickable bg-secondary opacity-hover-75 border-r-15    my-2"
                                        >
                                            <div v-if="loadings.buyTicket" class="flex-column opacity-75 mb-1">
                                                <i class="fas fa-circle-notch spin-nback"></i>
                                                <span class="opacity-75  tx-center mt-1">{{LANG.loading}} <br> {{LANG.tx}}</span>
                                            </div>
                                            <div class="flex-row">
                                                <div class="pr-1">{{LANG.buybuy}}</div>
                                                <div v-if= "!!form.form_buyTicketAmount" class="mx-2 tx-lg">{{form.form_buyTicketAmount}}</div>
                                                <div>TICKET <span v-if="form.form_buyTicketAmount > 1">(s)</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex-column " v-show="togglers.buy_advanced2 && togglers.buy_advanced3">

                                <div class="flex-column mt-2">
                                    <div class="flex">
                                        <span class="pr-1">Ref:</span>
                                        <span>{{shortAddress(form.form_buyTicketRef)}}</span>
                                    </div>
                                    <input type="text" name="" v-model="form.form_buyTicketRef" style="width: 260px" class="n-inset noborder pa-2 my-2 border-r-5 tx-xs n-tx" >
                                </div>

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
                        </div>
                        <!-- <span class="opacity-50 tx-xs">no ticket yet</span> -->
                    </template>
                <!-- </template> -->

                
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

        </div>
        <!-- <div class="show-xs_md my-8"></div> -->
        <div id="user"></div>

        <div v-if="dark_mode" style="width: 2px; background: white;" class="py-100 block opacity-10 show-xs_md" > </div>
        <div v-if="!dark_mode" style="width: 2px; background: black;" class="py-100 block opacity-10 show-xs_md" > </div>

        <div style="height: 80px" class="show-md_lg"> </div>

        <lotto-my-account ref="myAccount" @update_myAccount="update_myAccount" :update_loading="update_loading"/>

        <lotto-bottom-menu />

        <div class="flex-column " v-show="false">
            <div v-show="true" v-if="values.dai_dao_allowance > 0">
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
            <div v-show="false" >
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
                <tx-card v-show="false"  ref="targetAllowance"  class=" flex-column  " 
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
            </div>
        </div>

        <div v-show="false">
            <div class="flex-row">
                <tx-card  class=" flex-column  " v-show="false" 
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
            </div>
            <div class="flex-row">
                <tx-card  class=" flex-column  " 
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
                <tx-card  class=" flex-column  " 
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



            <hr class="w-50 opacity-10">
            <div class="flex-row">
                <tx-card  class=" flex-column  " 
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
                <tx-card  class=" flex-column  " 
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
                <tx-card  class=" flex-column  " 
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
                <tx-card  class=" flex-column  " 
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
        </div>



        <div class="flex-column n-flat mx-2 pa-2" v-if="false">  <!--CONTRACT -->
            <h4 class="tx-ls-3 my-2 tx-center">CONTRACT </h4>
            <hr class="w-50 opacity-10">
            <div class="flex-row">
                <tx-card  class=" flex-column  " 
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
            <div class="flex-column ">
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
            </div>
            <hr class="w-50 opacity-10">
            <div class="flex-wrap ">
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
    import lottoCurrentRound from "./lotto/lotto-current-round.vue";

    export default {
        name: 'lotto',     
        components: {
            txCard,

            lottoBottomMenu,
            lottoMyAccount,
            lottoCurrentRound,
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

                    approveCard: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.CONTROLLER_ADDRESS`,value: CURRENT_NETWORK.CONTROLLER_ADDRESS, }, 
                        "1": {placeholder:"",label:`value: "",`,value: "", },
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
                    getVoterAmountOfVotes: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    form_getVoterRefAmount: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
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
                    getVoterVoteIndex: {                        
                        "0": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        // 
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"",label:`value: "",`,value: "", type: "address" },
                    },
                    transferOwnership: {                        
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                    },
                    getProposalPropertyResult: {                        
                        "0": {placeholder:"",label:`value: '',`,value: '', type: "uint" },
                    },
                    form_getProposalPropertyResultBlock: {                        
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
                    addFullTargetAllowance: {
                        "0": {placeholder:"",label:`value: CURRENT_NETWORK.DAO_ADDRESS`,value: CURRENT_NETWORK.DAO_ADDRESS, type: "address" },
                        
                        "1": {placeholder:"amount",label:`value: '',`,value: '9999999999', type: "uint256" },
                    },
                    voteOnProposal: {
                        "0": {placeholder:"Round",label:`value: "",`,value: "", type: "uint" },
                        
                        "1": {placeholder:"Amount of Votes",label:`value: '',`,value: '', type: "uint" },
                        "2": {placeholder:"Refferal",label:`value: "",`,value: "", type: "address" },
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

            this.form.registeredFunds["0"].value = this.first_acc.address
            this.form.lastResultOf["0"].value = this.first_acc.address
            this.form.DAIBalanceOf["0"].value = this.first_acc.address
            this.form.getVoterAmountOfVotes["1"].value = this.first_acc.address
            this.form.getVoterVoteIndex["1"].value = this.first_acc.address
            this.form.form_getVoterRefAmount["1"].value = this.first_acc.address
            this.form.getVoteResult["2"].value = this.first_acc.address
            this.form.withdrawAll["2"].value = this.first_acc.address
            this.form.getVoteResultMulticall["2"].value = this.first_acc.address
            this.form.withdrawAmount["2"].value = this.first_acc.address
            this.form.voteOnProposal["2"].value = this.first_acc.address
            this.form.form_buyTicketRef = this.first_acc.address

            // await this.trigger_daiBalanceOfAndAllowance()
            
            // await this.trigger_currentRoundAndLastTicket()

        },
        methods: {
            parseDecimals,
            shortAddress,
            trigger_currentRoundAndLastTicket()
            {
                if (this.loadings.currentRoundAndLastTicket) return

                return new Promise(async (resolve,reject) =>
                {
                    this.loadings.currentRoundAndLastTicket = true

                    await this.$refs.currentRound.execute()
                    // console.log("this.values.current_round",this.$refs.currentRound._parsedResult)
                    this.values.current_round = this.$refs.currentRound._parsedResult

                    if (this.values.current_round == 0) return this.loadings.currentRoundAndLastTicket = false

                    this.form.getProposalPropertyAmountVotes["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.lastTicketNumber.execute()

                    this.form.amountOfTokensRequired["0"].value = (parseInt(this.values.current_round) - 1)+""
                    this.form.getProposalPropertyAmount["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.prizePool.execute()
                    this.values.prize_pool = parseDecimals(parseFloat(this.$refs.prizePool._parsedResult))

                    this.form.voteOnProposal["0"].value = (parseInt(this.values.current_round) - 1)+""

                    this.form.getProposalPropertyDeadline["0"].value = (parseInt(this.values.current_round) - 1)+""
                    await this.$refs.deadline.execute()
                    this.values.deadline = this.$refs.deadline._parsedResult

                    try {
                        this.form.getVoterVoteIndex["0"].value = (parseInt(this.values.current_round) - 1)+""
                        await this.$refs.accountVoteIndex.execute()
                        this.values.accountVoteIndex = this.$refs.accountVoteIndex._parsedResult

                        this.form.getVoterAmountOfVotes["0"].value = (parseInt(this.values.current_round) - 1)+""
                        await this.$refs.ticketLength.execute()
                        this.values.accountVoteLength = this.$refs.ticketLength._parsedResult

                        this.form.form_multiCallResultsStart = this.$refs.accountVoteIndex._parsedResult
                        this.form.form_multiCallResultsEnd = this.$refs.accountVoteIndex._parsedResult+this.values.accountVoteLength

                        try {
                            this.form.form_getVoterRefAmount["0"].value = (parseInt(this.values.current_round) - 1)+""
                            await this.$refs.ref_getVoterRefAmount.execute()
                            this.values.val_getVoterRefAmount = this.$refs.ref_getVoterRefAmount._parsedResult

                            this.form.withdrawRefBonus["0"].value = (parseInt(this.values.current_round) - 1)+""
                        } catch (error) {
                        }

                        this.form.form_getProposalPropertyResultBlock["0"].value = (parseInt(this.values.current_round) - 1)+""
                        await this.$refs.ref_randomResultBlock.execute()
                        this.values.val_randomResultBlock = this.$refs.ref_randomResultBlock._parsedResult
                        // randomResultBlock

                        this.form.form_getVoteScratchedNumberMulticall["0"].value = (parseInt(this.values.current_round) - 1)+""

                    } catch (error) {
                        this.values.accountVoteIndex = 0
                    }

                    // ticketLength
                    

                    this.loadings.currentRoundAndLastTicket = false

                    resolve(true)
                })
            },
            update_loading(msg)
            {
                this.loadings[msg.key] = msg.value
            },
            async update_myAccount(msg)
            {
                console.log("update_myAccount",msg)
                this.values.dai_balance_of = msg.data.dai_balance_of
                this.values.dai_dao_allowance = msg.data.dai_dao_allowance

                // await this.trigger_currentRoundAndLastTicket()
            },
            async update_currentRound(msg)
            {
                console.log("update_currentRound",msg)
                this.values.current_round = msg.data.current_round
                this.values.prize_pool = msg.data.prize_pool

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
            async execute_buyTicket()
            {
                if (this.loadings.buyTicket) return
                this.loadings.buyTicket = true

                try {
                    console.log("this.form.form_buyTicketAmount, this.form.form_buyTicketRef")
                    console.log(this.form.form_buyTicketAmount.toString(), this.form.form_buyTicketRef)
                    this.form.voteOnProposal ["1"].value = this.form.form_buyTicketAmount+""
                    if (this.first_acc.address != this.form.form_buyTicketRef)
                    {
                        this.form.voteOnProposal ["2"].value = this.form.form_buyTicketRef
                    }

                    await this.$refs.ref_buyTicket.execute()
                    // await this.$refs.targetAllowance.execute()
                    // this.values.dai_dao_allowance = this.$refs.targetAllowance._parsedResult
                } catch (error) {
                    this.$refs.ref_buyTicket.loading = false
                    console.log("failed call")
                }

                    console.log("buyTicket")
                this.loadings.buyTicket = false
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