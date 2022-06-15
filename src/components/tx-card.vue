<template>
    <div class="">

        <span v-if="!props.call_only" >
            <span v-if="!props.button_only" @click="toggleShowLess"
                :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']" class="clickable "
            >
                <div v-if="!!props.title" class="tx-xs "> {{props.title}} </div>
            </span>
        </span>

        <div v-if="togglers.show_more" >

            <div v-if="togglers.advanced" class=" pa-2 mt-1 border-r-5">
                <div v-if="!props.abi"> Contract abi: </div>

                <div v-if="props.abi"  class="tx-sm">
                    <span>ABI functions: {{props.abi.length}}</span>
                </div>
                <div v-if="props.address" style="max-width: 200px;" class="tx-sm">
                    <span>Contract Address:</span>
                    <div class="py-2" style="overflow-x: scroll;"> <small class="tx-xs">{{props.address}}</small> </div>
                </div>
                <div v-if="props.function" class="tx-xs my-2">
                    <span>method:</span>
                    <small class="ml-2">{{props.function}}</small>
                </div>
            </div>

            <div v-if="!props.abi || !props.address || !props.function" class="flex-wrap mt-3  pa-2 mt-1 border-r-5">
                <div class="flex-center">
                    <input v-if="!props.abi" style="max-width: 40px;" type="text" v-model="form.contractAbi"       class=" tx-primary n-inset noborder pa-1 ma-3" placeholder="abi">
                    <input v-if="!props.address" style="width: 120px" type="text" v-model="form.contractAddress"   class=" tx-primary n-inset noborder pa-1 " placeholder="address">
                </div>
                <input v-if="!props.function" style="width: 80px" type="text" v-model="form.functionName"      class=" tx-primary n-inset noborder pa-1 " placeholder="function">
            </div>

        </div>
        
        <span v-if="props.call_only" class=" flex-column" >
            <div v-if="!!props.title"  @click="toggleShowLess"
                :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']" class="tx-xs clickable "
            >
                {{props.title}}
            </div>
            <div v-if="!props.title"> Response </div>

            <span v-if="theResult" class="mx-2">{{_parsedResult}}</span>
            
        </span>

        <div v-if="togglers.show_more" >
            <div v-if="_formArgKeys.length && !props.button_only" class="flex-column n-flat pa-2 mt-1 border-r-5">
                <template v-for="arg in _formArgKeys">
                    
                    <div v-if="props.form_args[arg].type == 'address'" class="tx-xs ">
                        {{shortAddressSpaced(props.form_args[arg].value)}}
                    </div>
                    <div class="flex" v-if="true">
                        <div v-if="togglers.advanced && props.form_args[arg].label" class="tx-xs "> {{props.form_args[arg].label}} </div>
                        <input type="text" v-model="props.form_args[arg].value"
                            :class="[props.form_args[arg].type == 'address' ? 'tx-xs mb-2' : '']"
                            class=" tx-primary n-inset noborder pa-1 flex-1" :placeholder="'arg #'+arg"
                        >
                    </div>
                </template>
            </div>
        </div>

        <div v-if="togglers.show_more" class=" pa-2 mt-1 border-r-5">

            <div class="pa-2 ma-2 mb-0 tx-sm flex" :class="[_valid ? 'n-flat opacity-hover-75 clickable border-r-15' : 'border-r-5 noclick nocursor n-flat-disabled']" @click="execute">
                <div v-if="loading">
                    <!-- <i class="fas fa-sync tx-success spin-spin" ></i> -->
                    <div v-if="props.call_only">
                        <i class="fas fa-cloud-download-alt hover-hover tx-tertiary"></i>
                    </div>
                    <div v-if="!props.call_only">
                        <i class="fas fa-file-signature shake-shake tx-secondary"></i>
                    </div>
                    <!-- <div v-if="!props.button_only">
                        <i class="fas fa-ellipsis-h spin-spin"></i>
                    </div> -->
                </div>
                <div v-if="!loading">
                    <span v-if="props.call_only">
                        <span v-if="!props.button_only">get</span>
                        <span v-if="props.button_only"><i class="fa fa-redo"></i></span>
                    </span>
                    <span v-if="!props.call_only">
                        <span v-if="props.button_only" :class="[!_valid ? 'opacity-75 tx-error' : 'n-tx-s tx-success']">
                            <div v-if="!!props.title" class="tx-xs" > {{props.title}} </div>
                        </span>
                        <span v-if="!props.button_only">
                            <div v-if="!!props.title" class="tx-xs"> send </div>
                        </span>
                    </span>
                </div>
            </div>

            <div  v-if="props.advanced" class="flex-center">
                <span @click="toggleAdvanced" class=" clickable letter-s-3  opacity-hover-50 tx-center pa-2 flex tx-xs">
                    <span v-if="!togglers.advanced" class="tx-tertiary">Show more</span>
                    <span v-if="togglers.advanced" class="tx-sm opacity-50">Show less</span>
                </span>
            </div>

        </div>
    </div>
</template>
<script>
    import { ethers, Contract }  from 'ethers';
    import { ABIS, CURRENT_NETWORK } from '../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress, shortAddressSpaced } from '../store/helpers';
    import newItem from "../components/new-item.vue";
    import farmItem from "../components/farm-item.vue";

	export default {   
        name: 'tx-maker',     
        props: ["props"],
        data()
        {
            return {
                ABIS,
                CURRENT_NETWORK,

                loading: false,
                loadings: {},

                theResult: null,

                togglers: {
                    advanced: false,
                    contractAbiAdvanced: false,
                    hideFilledArgs: false,
                    show_more: false,
                },
                theAllowanceNumber: "",
                form: {
                    tokenOfallowance: "",
                    allowanceAddress: "",
                    poolLpInputs: {},
                    newFarm: "",
                    newFarmAlloc: "",

                    contractAbi: "",
                    contractAddress: "",
                    functionName: "",

                    arg1: "",
                    arg2: "",
                    arg3: "",

                    args: {},
                },
            }
        },
        components: {
            newItem,
            farmItem,
        },
	    computed: {
            LANG()                  { return this.$store.getters.LANG },
            first_acc()             { return this.$store.getters.first_acc },
            accs_length()           { return this.$store.getters.accs_length },
            BASE_TOKEN()            { return this.$store.getters.BASE_TOKEN },

            articles()              { return this.$store.getters.articles },
            token_list()            { return this.$store.getters.token_list },
            pools()                 { return this.$store.getters.pools },
            pools_length()          { return this.$store.getters.pools_length },
            retrieved_pool_length() { return this.$store.getters.retrieved_pool_length },

            _formArgKeys()          { return Object.keys(this.form.args) },
            _valid()
            {
                if (this.loading) return false
                for (var i = 0; i < this._formArgKeys.length; i++) {
                    if (!this.form.args[i].value || this.form.args[i].value == "") return false
                }
                return true
            },
            _parsedArgs()
            {
                let args = []
                for (var i = 0; i < this._formArgKeys.length; i++) {
                    if (this.form.args[i].type == "uint256")
                    {
                        args.push(ethers.utils.parseEther(parseFloat(this.form.args[i].value).toFixed(17)))
                    } else {
                        args.push(this.form.args[i].value)
                    }
                }
                return args
            },
            _parsedResult()
            {
                let altResult = { ...this.theResult }
                let altResType = this.props.res_type

                if (this.props.res_type.indexOf("struct") >= 0)
                {
                    if (this.props.DEBUG) { console.log(`found a struct`, altResult) }
                    altResult = {...this.theResult[this.props.res_type.split(".")[1]]}
                    altResType = this.props.res_type.split(".")[2]
                    if (this.props.DEBUG)
                    {
                        console.log(`getting ${this.props.res_type.split(".")[1]} | type ${altResType}`)
                    }
                }
                if (altResType == "uint256")
                {
                    return parseDecimals(parseFloat(ethers.utils.formatEther(altResult)))
                }
                if (altResType == "uint")
                {
                    return parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString()))
                }
                if (altResType == "address")
                {
                    // if (this.props.DEBUG) { console.log(`found an address`, altResult) }
                    return this.theResult
                }
                if (altResType == "word")
                {
                    // if (this.props.DEBUG) { console.log(`found an address`, altResult) }
                    console.log(altResult, "ethers.utils.formatEther(altResult) % 1443", parseFloat(ethers.utils.formatEther(altResult)) % 1443)
                    console.log(ethers.utils.parseEther(ethers.utils.formatEther(altResult).toString()).mod(1443).toString())
                    console.log(ethers.utils.parseEther(ethers.utils.formatEther(altResult).toString()).mod(1443).toString())
                    return ethers.utils.formatEther(altResult) % 1443
                }
                if (altResType == "timestamp")
                {
                    if (this.props.DEBUG)
                    {
                        console.log("timestamp", ethers.utils.formatEther(altResult), parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString())))
                    }
                    return new Date(1000*parseInt(10**18*parseFloat(ethers.utils.formatEther(altResult).toString()))).toLocaleString("en-US")
                }

                return altResult
            },
		},
        mounted()
        {
            this.form.contractAbi = this.props.abi ? this.props.abi : [this.form.contractAbi]
            this.form.contractAddress = this.props.address ? this.props.address : ""
            this.form.functionName = this.props.function ? this.props.function : ""
            this.form.args = {...this.props.form_args}
        },
		methods: {
            shortAddress,
            shortAddressSpaced,
            parseDecimals,

            toggleShowLess()
            {
                console.log("this.togglers.show_more", this.togglers.show_more)
                this.togglers.show_more = !this.togglers.show_more
                console.log("this.togglers.show_more", this.togglers.show_more)
                if (this.togglers.show_more)
                {
                    if (this._valid) this.execute()
                }
            },

            isFarmStake(poolLp)
            {
                return CURRENT_NETWORK.FRUIT_ADDRESS.toUpperCase() == this.pools[poolLp].lpToken.toUpperCase()
            },
            toggleAdvanced()
            {
                this.togglers.advanced = !this.togglers.advanced
                // if (this.togglers.advanced)
                // {
                //     this.getFarmsData()
                // }
            },
            toggleAbiAdvanced()
            {
                this.togglers.contractAbiAdvanced = !this.togglers.contractAbiAdvanced
            },
            async execute()
            {
                if (this.loading) return
                this.loading = true

                try
                {
                    if (this.props.call_only)
                    {
                        this.theResult = await this.call()
                    } else {
                        this.theResult = await this.tx()
                    }
                } catch (error)
                {
                    console.log("catched executing (error)")
                    if (this.props.DEBUG) { console.log(error) }
                }

                this.loading = false
            },
            async tx()
            {
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                // console.log("contractAddress",  this.form.contractAddress)
                const theContract = new Contract(this.form.contractAddress, this.form.contractAbi, USER_WALLET)

                return new Promise(async (resolve, reject) => {
                    try {
                        let response = {}

                        // console.log ("this._parsedArgs")
                        // console.log (this._parsedArgs)
                        let aTx = await theContract[this.form.functionName].apply(this, this._parsedArgs)
                        let aResult = await aTx.wait()
                        resolve(aResult)
                    } catch (error)
                    {
                        reject(error)
                    }
                })
            },
            async call()
            {
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                // console.log(this.form.functionName, this.form.contractAddress, this.form.contractAbi, BLOCKCHAIN)

                const theContract = new Contract(this.form.contractAddress, this.form.contractAbi, BLOCKCHAIN)
                // if (this.props.DEBUG) { console.table(this.form.contractAbi) }

                return new Promise(async (resolve, reject) => {
                    try {
                        if (this.props.DEBUG) { console.log(`calling ${this.form.functionName} | args:`, this._parsedArgs) }
                        let aTx = await theContract[this.form.functionName].apply(this, this._parsedArgs)
                        resolve(aTx)
                    } catch (error)
                    {
                        reject(error)
                    }
                })
            },
            
		},
	}
</script>
