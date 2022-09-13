// import 
import * as TheOpenLottoDAO from './ABIS/TheOpenLottoDAO.json';
import * as TheOpenLotto from './ABIS/TheOpenLotto.json';
import * as VRFv2Consumer from './ABIS/VRFv2Consumer.json';

export const ABIS = {
  DAO: TheOpenLottoDAO.abi,
  LOTTO: TheOpenLotto.abi,
  RESOLVER: VRFv2Consumer.abi,

  ERC20: [
    'function owner() external view returns (address)',
    'function transfer(address to, uint value) external returns (bool)',
    'function balanceOf(address account) external pure returns (uint256)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint)',
  ],
};

// https://docs.chain.link/docs/matic-addresses/
export const polygonNetwork = {
  SCANNER_URL: 'https://polygonscan.com',
  RPC_URL: 'https://rpc-mainnet.matic.quiknode.pro',

  BASE_TOKEN: 'MATIC',
  WETH_ADDRESS: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',

  BASE_USD_ID: 'USD (DAI)',
  BASE_USD_ADDRESS: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',

  RESOLVER_ADDRESS: '0x4C5f09D239E11896ed4B21e5BEba0DE9D777eEbD',
  LOTTO_ADDRESS: '0xF250a014CE4f238936b295892BA172941AaA084e',
  DAO_ADDRESS: '0xF8D30959e33E4BF4424868b94d2015e2643eca60',
};

// export const CURRENT_NETWORK = localNetwork;
// export const CURRENT_NETWORK = bscNetwork;
// export const CURRENT_NETWORK = ftmNetwork;
// export const CURRENT_NETWORK = maticNetwork;
export const CURRENT_NETWORK = polygonNetwork;
