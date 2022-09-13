import { createStore } from 'vuex';
import { ethers, Contract }  from 'ethers';

import { CONTRACT_HELPER, isMetaMaskInstalled, parseDecimals, parseTradeDataTokenAmounts, formatTradeDataTokenAmounts, fixBTCDecimalsMul, fixBTCDecimalsDiv } from './helpers';
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
      SCANNER: CURRENT_NETWORK.SCANNER_URL,
      BASE_TOKEN: CURRENT_NETWORK.BASE_TOKEN,
      BASE_USD_ID: CURRENT_NETWORK.BASE_USD_ID,

      lps: {},
      pools: {},
      retrieved_pool_length: 0,
      tokens: CURRENT_NETWORK.TOKEN_LIST.slice(0, 2),
      token_list: CURRENT_NETWORK.TOKEN_LIST,

      accounts: {},
    };
  },
  mutations: {

    updateTokenPriceAt(state, tokenData) {
      state.token_list[tokenData.index].price = tokenData.price
    },

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
    setToken(state, tokenData) {
      state.tokens[tokenData.index] = tokenData.token
    },
    reverseToken(state) {
      state.tokens = [state.tokens[1], state.tokens[0]]
    },
    addLp(state, lpData) {
      state.lps[lpData.token0+lpData.token1] = lpData
    },
    addPool(state, poolData) {
      state.pools[poolData.lpToken] = poolData
    },
    refreshPool(state, poolData) {
      state.pools[poolData.lpToken] = {
        ...state.pools[poolData.lpToken],
        ...poolData,
      }
    },
    update_retrieved_pools_length(state, length) {
      state.retrieved_pool_length = length
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

    addLp(context, lpData) {
      context.commit('addLp', lpData);
    },
    reverseToken(context) {
      context.commit('reverseToken')
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


    token_list(state) {
      return state.token_list;
    },
    token_listAt(state) {
      return (tokenId) => {
        return state.token_list.find((token) => token.id === tokenId);
      };
    },
    token(state) {
      return (tokenId) => {
        return state.tokens.find((token) => token.id === tokenId);
      };
    },
    tokens(state) {
      return state.tokens;
    },
    tokenAt(state) {
      return (index) => {
        return state.tokens[index];
      };
    },

    lps(state) {
      return state.lps;
    },
    lpAt(state) {
      return (key) => {
        return state.lps[key];
      };
    },

    retrieved_pool_length(state) {
      return state.retrieved_pool_length - 1
    },
    pools_length(state) {
      return Object.keys(state.pools).length
    },
    pools(state) {
      const theLength = Object.keys(state.pools).length
      if (theLength == 0) return {}
      if (theLength == 1) return {}
      const newPools = {...state.pools} 
      delete newPools[Object.keys(state.pools)[0]]
      return newPools
    },
    poolAt(state) {
      return (key) => {
        return state.pools[key]
      };
    },

    BASE_TOKEN(state) {
      return state.BASE_TOKEN
    },
    BASE_USD_ID(state) {
      return state.BASE_USD_ID
    },
    SCANNER(state) {
      return state.SCANNER
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