<template>
    <div  v-if="_formArgKeys.length" class="">

        <div v-if="!!props.title">
            {{props.title}}
        </div>
        <div v-if="togglers.advanced">
            <div v-if="props.address" style="max-width: 200px;" class="">
                <span>Contract Address:</span>
                <div class="py-2" style="overflow-x: scroll;">
                    <small class="tx-xs">{{props.address}}</small>
                </div>
            </div>
            <div v-if="!props.address">
                Contract Address:
            </div>

            <!-- <div v-if="props.abi" style="max-width: 200px;" class="">
                <span>Contract abi:</span>
                <div class="py-2" style="overflow-x: scroll;">
                    <small class="tx-xs">{{props.abi}}</small>
                </div>
            </div> -->
            <div v-if="!props.abi">
                Contract abi:
            </div>

            <div v-if="props.function" style="max-width: 200px;" class="tx-xs my-2">
                <span>Contract function:</span>
                <!-- <div class="py-2" style="overflow-x: scroll;"> -->
                    <small class="ml-2">{{props.function}}</small>
                <!-- </div> -->
            </div>
            <div v-if="!props.function">
                Contract function:
            </div>
        </div>
        <div class="flex-wrap mt-3">
            <div class="flex-center">
                <input v-if="!props.abi" style="max-width: 40px;" type="text" v-model="form.contractAbi"       class=" tx-primary n-flat ma-3" placeholder="abi">
                <input v-if="!props.address" style="width: 120px" type="text" v-model="form.contractAddress"   class=" tx-primary n-flat " placeholder="address">
            </div>
            <input v-if="!props.function" style="width: 80px" type="text" v-model="form.functionName"      class=" tx-primary n-flat " placeholder="function">
        </div>
        <div class="flex-column">
            <template v-for="arg in _formArgKeys">
                <input type="text" v-model="props.form_args[arg].value"              class=" tx-primary n-flat flex-1" :placeholder="'arg #'+arg">
            </template>
        </div>
        <!-- {{_valid}} -->
        <div class="pa-2 my-2 tx-sm" :class="[_valid ? 'n-flat opacity-hover-75 clickable border-r-15' : 'border-r-5 noclick n-flat-disabled']" @click="tx">
            send tx
        </div>
        <div  v-if="props.advanced" class="flex-center">
            <span @click="toggleAdvanced" class=" clickable letter-s-3 tx-tertiary opacity-hover-50 tx-center pa-2 flex">
                <span v-if="!togglers.advanced">Show more</span>
                <span class="tx-sm" v-if="togglers.advanced">Show less</span>
            </span>
        </div>
    </div>
</template>
<script>
    import { ethers, Contract }  from 'ethers';
    import { ABIS, CURRENT_NETWORK } from '../store/constants';
    import { parseDecimals, ERROR_HELPER, shortAddress } from '../store/helpers';
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

                togglers: {
                    advanced: false,
                    contractAbiAdvanced: false,
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
                for (var i = 0; i < this._formArgKeys.length; i++) {
                    if (!this.form.args[i].value || this.form.args[i].value == "") return false
                }
                return true
            },
		},
        mounted()
        {
            this.form.args = {...this.props.form_args}
        },
		methods: {
            parseDecimals,
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
            async getFarmsData()
            {
                this.loading = true
                await this.$store.dispatch("refreshFarms")
                this.loading = false
            },
            async giveAllowance()
            {


                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                let giverAddress = this.form.tokenOfallowance
                const tokenContract = new Contract(giverAddress, ABIS.FRUIT, USER_WALLET)

                console.log("giveAllowance . . .")
                try {
                    let transaction = await tokenContract.approve(this.form.allowanceAddress, ethers.constants.MaxUint256.toString())
                    // let transaction = await fruitContract[this.form.functionName](this.form.arg1, ethers.constants.MaxUint256.toString())
                    await transaction.wait()
                    alert("done")
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            async getAllowance()
            {
                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                console.log("getAllowance . . .")
                console.log(this.form.tokenOfallowance, this.form.allowanceAddress)

                let giverAddress = this.form.tokenOfallowance
                const tokenContract = new Contract(giverAddress, ABIS.FRUIT, USER_WALLET)

                try {
                    let getbalance = await tokenContract.balanceOf(firstAddress)
                    console.log("ethers.utils.formatEther(getbalance)", ethers.utils.formatEther(getbalance))
                    let transaction = await tokenContract.allowance(firstAddress, this.form.allowanceAddress)
                    // let transaction = await fruitContract[this.form.functionName](this.form.arg1, ethers.constants.MaxUint256.toString())
                    // await transaction.wait()
                    let allowanceNumber = ethers.utils.formatEther(transaction)
                    this.theAllowanceNumber = allowanceNumber
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            async addFarm()
            {
                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                const chefContract = new Contract(CURRENT_NETWORK.MASTERCHEF_ADDRESS, ABIS.MASTERCHEF, USER_WALLET)

                console.log("asd")
                try {
                    let transaction = await chefContract.add(this.form.newFarmAlloc, this.form.newFarm, true)
                    // let transaction = await fruitContract[this.form.functionName](this.form.arg1, ethers.constants.MaxUint256.toString())
                    await transaction.wait()
                    alert("done")
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            async transferOwnershipCash()
            {
                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                const tokenContract = new Contract(CURRENT_NETWORK.CASH_ADDRESS, ABIS.FRUIT, USER_WALLET)

                console.log(CURRENT_NETWORK.CASH_ADDRESS, "transferOwnershipCash", CURRENT_NETWORK.PRINTER_ADDRESS, tokenContract.transferOwnership)
                try {
                    // let owner = await tokenContract.owner()
                    // console.log("owner: ", owner)
                    let transaction = await tokenContract.transferOwnership(CURRENT_NETWORK.PRINTER_ADDRESS)
                    // let transaction = await fruitContract[this.form.functionName](this.form.arg1, ethers.constants.MaxUint256.toString())
                    await transaction.wait()
                    alert("done")
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            async transferOwnershipBond()
            {
                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                const tokenContract = new Contract(CURRENT_NETWORK.BOND_ADDRESS, ABIS.FRUIT, USER_WALLET)

                console.log(CURRENT_NETWORK.BOND_ADDRESS, "transferOwnershipBond", CURRENT_NETWORK.PRINTER_ADDRESS)
                try {
                    let owner = await tokenContract.owner()
                    console.log("owner: ", owner)
                    let transaction = await tokenContract.transferOwnership(CURRENT_NETWORK.PRINTER_ADDRESS)
                    // let transaction = await fruitContract[this.form.functionName](this.form.arg1, ethers.constants.MaxUint256.toString())
                    await transaction.wait()
                    alert("done")
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            async tx()
            {
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                const fruitContract = new Contract(this.form.contractAddress, ABIS[this.form.contractAbi], USER_WALLET)
                console.log("asd")
                try {
                    let transaction = await fruitContract[this.form.functionName](this.form.arg1)
                    // let transaction = await fruitContract[this.form.functionName](this.form.arg1, ethers.constants.MaxUint256.toString())
                    await transaction.wait()
                    alert("done")
                    // const allowanceTx = await fruitContract.allowance(firstAddress, CURRENT_NETWORK.ROUTER_ADDRESS)
                    // let parsedAllowanceTx = parseDecimals(parseFloat(ethers.utils.formatEther(allowanceTx)))
                    // context.commit(
                    //     "updateAccountAllowance",
                    //     {
                    //     address: firstAddress,
                    //     tokenAddress: tokenAddress,
                    //     allowance: parsedAllowanceTx,
                    //     }
                    // )
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            async call()
            {
                if (!this.first_acc) return

                let firstAddress = this.first_acc.address
                const BLOCKCHAIN = this.$store.getters.newProvider
                const USER_WALLET = await BLOCKCHAIN.getSigner()
                const fruitContract = new Contract(this.form.contractAddress, ABIS[this.form.contractAbi], USER_WALLET)
                try {
                    let transaction = await fruitContract[this.form.functionName](this.form.arg1)
                    console.log(transaction)
                    // await transaction.wait()
                    // alert("done")
                    // const allowanceTx = await fruitContract.allowance(firstAddress, CURRENT_NETWORK.ROUTER_ADDRESS)
                    // let parsedAllowanceTx = parseDecimals(parseFloat(ethers.utils.formatEther(allowanceTx)))
                    // context.commit(
                    //     "updateAccountAllowance",
                    //     {
                    //     address: firstAddress,
                    //     tokenAddress: tokenAddress,
                    //     allowance: parsedAllowanceTx,
                    //     }
                    // )
                } catch (error)
                {
                    console.log("***error!!!")
                    console.log(error)
                }
            },
            
		},
	}
</script>
