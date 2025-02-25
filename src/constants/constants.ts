import { PublicKey } from "@solana/web3.js";

// Replace with your Program ID
export const PRESALE_PROGRAM_PUBKEY = new PublicKey(
  "EmBRByj9Kioe1ETCvqFJ55PE6HDKBGgtneiz3NgqQkru"
);

// Replace with your presale authority 
export const PRESALE_AUTHORITY = new PublicKey(
  "69kTFh6Vztc95fu2qQHqu6nrkMRybXiaXbSkzzrqmRHW"
);

export const SOL_ADDRESS = "So11111111111111111111111111111111111111112";

//** Toknes on Devnet */
// Test LING Token Mint address, Decimal 9
export const TOKEN_PUBKEY = new PublicKey(
  "AANc4rB8rWNSPNcLTMYrnvh3zuPH6PTHSSGY2dvPzYFG"
);

// Test USDC Mint address on Devnet: decimal 6
export const USDC_ADDRESS = "9fGXzMAL81zfyjqxbSGRfHmqNtBbbiBMbZ7x9qb1d7VV";

// Test USDC Mint address on Devnet: decimal 6
export const USDT_ADDRESS = "66HM9nWRtM85XPdybjUkZdhdCKpHCxxJBgky6Ztdt5jv"

// Owner
export const OWNER_WALLET = new PublicKey(
  "6MtdVSsYroHykPrLjRkShJ5uCCkon8VVkLVQAGTzi9YV"
);

export const DEFAULT_PUBKEY = new PublicKey(
  "11111111111111111111111111111111"
)

export const PRESALE_SEED = "MONKYLAND_PRESALE_SEED";
export const VESTING_SEED = "MONKYLAND_VESTING_SEED";
export const PRESALE_RESERVE_SEED = "MONKYLAND_PRESALE_RESERVE_SEED"
export const USER_SEED = "MONKYLAND_USER_SEED";
export const ESCROW_SEED = "MONKYLAND_ESCROW_SEED";
export const REFFERAL_SEED = "MONKYLAND_REFFERAL_INFO_SEED";

export const SALE_CAP_DECIMAL = 9;
export const SOL_DECIMALS = 9;
export const TOKEN_DECIMAL = 6;
export const BUY_MIN_IN_USD = 50;
// USDC TOKEN DECIMAL
export const USDC_USDT_DECIMAL = 6;
export const SOL_USDC_RATE = 200;
export const TOKEN_PRICE_DECIMALS = 10000;
export const LISTING_PRICE = 0.006
export const BONUS_PERCENTAGE = [0, 3, 5, 7, 10]