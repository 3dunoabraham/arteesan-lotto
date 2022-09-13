import { createStore } from 'vuex';
import { ethers, Contract }  from 'ethers';

import { isMetaMaskInstalled } from './helpers';
import { ABIS, CURRENT_NETWORK } from './constants';
import { LANG } from './lang';

const store = createStore({
  state() {
    return {
      LANG,
      main_togglers: {},
      currentPseudoPage: "lottery",
      darkMode: true,
      proMode: false,
      englishMode: true,

      ethereum: window.ethereum,
      isMetaMaskInstalled: isMetaMaskInstalled(),
      BASE_TOKEN: CURRENT_NETWORK.BASE_TOKEN,
      BASE_USD_ID: CURRENT_NETWORK.BASE_USD_ID,

      lps: {},
      pools: {},
      retrieved_pool_length: 0,

      accounts: {},
    };
  },
  mutations: {
    setDarkMode(state, mode) {
      state.darkMode = mode
    },
    setProMode(state, mode) {
      state.proMode = mode
    },

    setCurrentPseudoPage(state, _page) {
      state.currentPseudoPage = _page
    },
    setEnglishMode(state, mode) {
      state.englishMode = mode
    },

    addAccount(state, accountData) {
      const newAccounts = {
        [accountData]: {
          address: accountData,
          balance: 0,
          balances: {},
          allowances: {},
        },
      };

      state.accounts = {...state.accounts, ...newAccounts}
    },
    updateAccountAllowance(state, allowanceData) {
      let newAllowance = {
        [allowanceData.tokenAddress]: allowanceData.allowance
      }
      state.accounts[allowanceData.address].allowances = {
        ...state.accounts[allowanceData.address].allowances,
        ...newAllowance,
      }
    },
    updateAccountBalance(state, balanceData) {
      let newBalance = {
        [balanceData.tokenId]: balanceData.balance
      }
      if (CURRENT_NETWORK.BASE_TOKEN == balanceData.tokenId)
      {
        state.accounts[balanceData.address].balance = balanceData.balance
      }
      state.accounts[balanceData.address].balances = {
        ...state.accounts[balanceData.address].balances,
        ...newBalance,
      }
    },
    updateAccount(state, accountData) {
      state.accounts[accountData.address] = {
                          ...state.accounts[accountData.address],
                          ...accountData.account
                        }
    },
  },
  actions: {

    setProMode(context, mode) {
      context.commit('setProMode', mode);
    },
    setDarkMode(context, mode) {
      context.commit('setDarkMode', mode);
    },
    setEnglishMode(context, mode) {
      context.commit('setEnglishMode', mode);
    },

    connectWallet: async (context) => {
      if (!context.getters.is_metaMask) { alert("Please, Install Metamask.") }
      let accs = await context.getters.eth.request({ method: 'eth_requestAccounts' }).catch((err) => {
        if (err.code == -32002)
        {
          alert("Unlock or Connect your Wallet and\ntry Again...")
        }
      })
      if(typeof accs == "undefined") { console.log("Unlock or Connect Wallet and try Again...")}
      for (var i = 0; i < accs.length; i++) {
        context.commit('addAccount', accs[i]);
      }
    },

  },
  getters: {
    LANG(state) {
      return state.LANG[state.englishMode ? "EN" : "ES"];
    },

    dark_mode(state) {
      return state.darkMode
    },
    pro_mode(state) {
      return state.proMode
    },
    current_page(state) {
      return state.currentPseudoPage
    },
    english_mode(state) {
      return state.englishMode
    },


    eth(state) {
      return state.ethereum
    },
    newProvider(state) {
      return new ethers.providers.Web3Provider(state.ethereum)
    },
    is_metaMask(state) {
      return state.isMetaMaskInstalled;
    },

    BASE_TOKEN(state) {
      return state.BASE_TOKEN
    },
    BASE_USD_ID(state) {
      return state.BASE_USD_ID
    },

    accs_length(state) {
      return Object.keys(state.accounts).length;
    },
    accounts(state) {
      return state.accounts;
    },
    first_acc(state) {
      if (Object.keys(state.accounts) == 0) return null
      let firstAccAddress = Object.keys(state.accounts)[0]

      return state.accounts[firstAccAddress];
    },
    account(state) {
      return (address) => {
        return state.accounts[address];
      };
    },


  },
});

export default store;