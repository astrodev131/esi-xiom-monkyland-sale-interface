import { PublicKey, Connection } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { config } from "@/config";

// Solana RPC URL (Use mainnet or your preferred RPC provider)
const SOLANA_RPC_URL = config.rpcUrl;
export const connection = new Connection(SOLANA_RPC_URL, "confirmed");

export function isAddress(address: string) {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}

function rot13(s: string) {
  return s.replace(
    /[A-Z]/gi,
    (c) =>
      "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm"[
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".indexOf(c)
      ]
  );
}

export async function getTokenBalance(walletAddress: PublicKey, mintAddress: PublicKey) {
  try {
    const tokenAccount = await getAssociatedTokenAddress(mintAddress, walletAddress);
    const tokenAccountInfo = await getAccount(connection, tokenAccount);
    return Number(tokenAccountInfo.amount) / 1e6; // Convert from smallest unit (decimals=6)
  } catch (error) {
    return 0; // Token account might not exist
  }
}

export default rot13;
