import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";

import * as anchor from "@project-serum/anchor";

import { IDL } from "../idl/token_presale";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  PRESALE_AUTHORITY,
  PRESALE_PROGRAM_PUBKEY,
  PRESALE_SEED,
  PRESALE_RESERVE_SEED,
  VESTING_SEED,
  TOKEN_DECIMAL,
  TOKEN_PUBKEY,
  USER_SEED,
  ESCROW_SEED,
  SOL_ADDRESS,
  OWNER_WALLET,
  USDC_ADDRESS,
  USDT_ADDRESS,
  USDC_USDT_DECIMAL,
  SALE_CAP_DECIMAL,
  REFFERAL_SEED,
  SOL_DECIMALS,
  DEFAULT_PUBKEY,
} from "@/constants/constants";
import { toast } from "react-toastify";
import { SystemProgram, PublicKey, Keypair } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import {
  ASSOCIATED_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@project-serum/anchor/dist/cjs/utils/token";
import { PresaleInfoProps } from "@/pages/presale";
import Cookies from "universal-cookie";
import rot13, { isAddress } from "@/utils/solWeb3";

const cookies = new Cookies();

interface ReferralInfoProps {
  referralsCount: number;
  referredSolAmount: number;
  referredUsdcAmount: number;
  referredUsdtAmount: number;
  claimedSolAmount: number;
  claimedUsdcAmount: number;
  claimedUsdtAmount: number;
}

interface UserInfoProps {
  buyQuoteAmount: number;
  buyTokenAmount: number;
  claimedTokenAmount: number;
  roundAmounts: number[];
  roundClaimed: number[];
}

export default function usePresale() {
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [transactionPending, setTransactionPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);
  const [totalQuoteAmount, setTotalQuoteAmount] = useState(0);
  const [entireBuyAmount, setEntireBuyAmount] = useState(0);
  const [presale_id, setPresaleid] = useState(140);
  const [stageNumber, setStageNumber] = useState(0);
  const [price_per_token, setPricePerToken] = useState(20); // 1500000
  const [next_price_per_token, setNextPricePerToken] = useState(25); // 1500000

  const [stage_hardcap, setStageHardcap] = useState(0);
  const [totalHardCap, setTotalHardCap] = useState(0);
  const [totalSoftCap, setTotalSoftCap] = useState(0);
  const [minTokenBalancePerWallet, setMinTokenBalancePerWallet] = useState(0);
  const [maxTokenBalancePerWallet, setMaxTokenBalancePerWallet] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stagePurchasedAmount, setStagePurchasedAmount] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [referralInfo, setReferralInfo] = useState<ReferralInfoProps>({
    referralsCount: 0,
    referredSolAmount: 0,
    referredUsdcAmount: 0,
    referredUsdtAmount: 0,
    claimedSolAmount: 0,
    claimedUsdcAmount: 0,
    claimedUsdtAmount: 0,
  });
  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    buyQuoteAmount: 0,
    buyTokenAmount: 0,
    claimedTokenAmount: 0,
    roundAmounts: [],
    roundClaimed: [],
  });

  const program = useMemo(() => {
    // const wallet = new Wallet(new Keypair());
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  // Create a dummy read-only wallet (to avoid null issues)
const dummyWallet = {
  publicKey: PublicKey.default,
  signAllTransactions: async (txs: anchor.web3.Transaction[]) => txs,
  signTransaction: async (tx: anchor.web3.Transaction) => tx,
};

  const programRead = useMemo(() => {
    // const wallet = new Wallet(new Keypair());
      const provider = new anchor.AnchorProvider(
        connection,
        dummyWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
  }, [connection]);

  useEffect(() => {
    const getPresaleInfo = async () => {
      if (programRead && !transactionPending) {
        try {
          setLoading(true);
          const [presale_info, presale_bump] = findProgramAddressSync(
            [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
            programRead.programId
          );

          // @ts-ignore
          const info = await programRead.account.presaleInfo.fetch(presale_info);
          console.log(
            "debug info::",
            info.startTime.toNumber(),
            info.endTime.toNumber()
          );
          setPricePerToken(Number(info.pricePerToken));
          setNextPricePerToken(Number(info.nextPricePerToken));
          setStageNumber(info.stage);
          setStartTime(info.startTime.toNumber());
          setEndTime(info.endTime.toNumber());
          setTotalBuyAmount(Number(info.soldTokenAmount));
          setTotalQuoteAmount(Number(info.soldQuoteAmount) / 10 ** 9);
          setStageHardcap(Number(info.stagehardcapAmount) / 10 ** 9);
          setEntireBuyAmount(Number(info.soldQuoteAmount) / 10 ** 9);
          setStagePurchasedAmount(Number(info.stagePurchasedAmount) / 10 ** 9);
          setTotalHardCap(Number(info.hardcapAmount) / 10 ** 9);
          setTotalSoftCap(Number(info.softcapAmount) / 10 ** 9);
          setMaxTokenBalancePerWallet(
            Number(info.maxTokenAmountPerAddress) / 10 ** 9
          );
          setMinTokenBalancePerWallet(
            Number(info.minTokenAmountPerAddress) / 10 ** 9
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const getUserInfo = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [userInfo, userBump] = findProgramAddressSync(
            [
              utf8.encode(USER_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              publicKey.toBuffer(),
            ],
            program.programId
          );
          const balance = await connection.getBalance(publicKey);
          setBalance(balance);
          // @ts-ignore
          const info = await program.account.userInfo.fetch(userInfo);
          const nRoundAmounts: number[] = info.roundAmounts.map(
            (bnAmount: anchor.BN) => Number(bnAmount) / 10 ** TOKEN_DECIMAL
          );
          const nRoundClaimed: number[] = info.roundClaimed.map(
            (bnClaimed: anchor.BN) => Number(bnClaimed) / 10 ** TOKEN_DECIMAL
          );
          const totalBuyAmount = nRoundAmounts.reduce(
            (acc, value) => acc + value,
            0
          );
          const totalClaimed = nRoundClaimed.reduce(
            (acc, value) => acc + value,
            0
          );
          setBuyAmount(totalBuyAmount);
          setQuoteAmount(Number(info.buyQuoteAmount));
          setUserInfo({
            buyQuoteAmount:
              Number(info.buyQuoteAmount) / 10 ** SALE_CAP_DECIMAL,
            buyTokenAmount: totalBuyAmount,
            claimedTokenAmount: totalClaimed,
            roundAmounts: nRoundAmounts,
            roundClaimed: nRoundClaimed,
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const getReferralInfo = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [referral_info, referralBump] = findProgramAddressSync(
            [
              utf8.encode(REFFERAL_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              publicKey.toBuffer(),
            ],
            program.programId
          );
          // @ts-ignore
          const info = await program.account.referralInfo.fetch(referral_info);
          setReferralInfo({
            referralsCount: Number(info.referralsCount),
            referredSolAmount: Number(info.referredSolAmount),
            referredUsdcAmount: Number(info.referredUsdcAmount),
            referredUsdtAmount: Number(info.referredUsdtAmount),
            claimedSolAmount: Number(info.claimedSolAmount),
            claimedUsdcAmount: Number(info.claimedUsdcAmount),
            claimedUsdtAmount: Number(info.claimedUsdtAmount),
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getPresaleInfo();
    getUserInfo();
    getReferralInfo();
  }, [publicKey, transactionPending, program, programRead]);

  useEffect(() => {
    if (program && publicKey) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [publicKey, program]);

  const createPresale = async (presaleInfo: PresaleInfoProps) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );

        const bigIntBuyerHardcap = BigInt(
          Number(presaleInfo.maxTokenPer * 10 ** TOKEN_DECIMAL).toFixed(0)
        );
        const bigIntBuyerSoftcap = BigInt(
          Number(presaleInfo.minTokenPer * 10 ** TOKEN_DECIMAL).toFixed(0)
        );
        // In sale program
        // quote_amount != (token_amount / presale_info.price_per_token)
        const tokenPrice = presaleInfo.tokenPrice;
        const nextTokenPrice = presaleInfo.nextTokenPrice;
        console.log(
          "debug creat sale::",
          presaleInfo.startTime,
          presaleInfo.endTime,
          presale_info
        );
        const tx = await program.methods
          .createPresale(
            TOKEN_PUBKEY,
            new PublicKey(SOL_ADDRESS),
            new PublicKey(USDC_ADDRESS),
            new PublicKey(USDT_ADDRESS),
            new anchor.BN(presaleInfo.softcap * 10 ** SALE_CAP_DECIMAL), // softcap  1000 in USDC
            new anchor.BN(presaleInfo.hardcap * 10 ** SALE_CAP_DECIMAL), // hardcap  10000 in USDC
            new anchor.BN(presaleInfo.stagecap * 10 ** SALE_CAP_DECIMAL), // stage hard cap 1000 in USDC
            new anchor.BN(bigIntBuyerHardcap.toString()), // maxTokenAmountPerAddress
            new anchor.BN(bigIntBuyerSoftcap.toString()), // minTokenAmountPerAddress
            new anchor.BN(tokenPrice), // price per token
            new anchor.BN(nextTokenPrice), // price per token
            new anchor.BN(presaleInfo.startTime), // start time
            new anchor.BN(presaleInfo.endTime), // end time
            new anchor.BN(presale_id) // presale id
          )
          .accounts({
            presaleInfo: presale_info,
            presaleReservePda: presaleReserve,
            authority: PRESALE_AUTHORITY,
            // baseAccount: BASE_ACCOUNT,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        toast.success("Successfully created presale.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const nextPresale = async (presaleInfo: PresaleInfoProps) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        // const tokenPrice = price_per_token * 10 ** TOKEN_DECIMAL;
        const tokenPrice = presaleInfo.tokenPrice;
        const nextTokenPrice = presaleInfo.nextTokenPrice;
        const tx = await program.methods
          .updatePresale(
            new anchor.BN(tokenPrice), // price per token
            new anchor.BN(nextTokenPrice), // price per token
            new anchor.BN(presaleInfo.stagecap * 10 ** TOKEN_DECIMAL), //stage hard cap in USDC
            new anchor.BN(presaleInfo.startTime), // start time
            new anchor.BN(presaleInfo.endTime), // end time
            new anchor.BN(stageNumber) //stage
          )
          .accounts({
            presaleInfo: presale_info,
            presaleReservePda: presaleReserve,
            authority: PRESALE_AUTHORITY,
            // baseAccount: BASE_ACCOUNT,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        toast.success("Successfully updated presale.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const updateStagePresale = async (presaleInfo: PresaleInfoProps) => {
    console.log("debug update stage sale");
  };

  // const updateStagePresale = async (presaleInfo: PresaleInfoProps) => {
  //   if (program && publicKey) {
  //     try {
  //       setTransactionPending(true);
  //       const [presale_info, presale_bump] = findProgramAddressSync(
  //         [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
  //         program.programId
  //       );
  //       const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
  //         [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
  //         program.programId
  //       );
  //       const tokenPrice = presaleInfo.tokenPrice;
  //       const nextTokenPrice = presaleInfo.tokenPrice;
  //       console.log("debug update stage presale::", stageNumber);
  //       const tx = await program.methods
  //         .updateStagesale(
  //           new anchor.BN(tokenPrice), // price per token
  //           new anchor.BN(nextTokenPrice), // price per token
  //           new anchor.BN(presaleInfo.stagecap * 10 ** TOKEN_DECIMAL), //stage hard cap in USDC
  //           new anchor.BN(presaleInfo.startTime), // start time
  //           new anchor.BN(presaleInfo.endTime), // end time
  //           new anchor.BN(presale_id), // presale id
  //           new anchor.BN(stageNumber) //stage
  //         )
  //         .accounts({
  //           presaleInfo: presale_info,
  //           presaleReservePda: presaleReserve,
  //           presaleAuthority: publicKey,
  //           systemProgram: SystemProgram.programId,
  //         })
  //         .rpc();
  //       toast.success("Successfully updated presale.");
  //       return false;
  //     } catch (error: any) {
  //       console.log(error);
  //       toast.error(error.toString());
  //       return false;
  //     } finally {
  //       setTransactionPending(false);
  //     }
  //   }
  // };

  const depositToken = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const fromAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        const [toAssociatedTokenAccount, presaleToAssociatedTokenAccount] =
          findProgramAddressSync(
            [utf8.encode(ESCROW_SEED), presale_info.toBuffer()],
            program.programId
          );
        // const toAssociatedTokenAccount = await anchor.utils.token.associatedAddress({
        //   mint: TOKEN_PUBKEY,
        //   owner: presale_info,
        // });

        // Use BigInt for large number calculations
        const depositAmount = BigInt(Number(totalBuyAmount).toFixed(0));
        const tx = await program.methods
          .depositToken
          // new anchor.BN(depositAmount.toString()), // deposit amount
          // presale_id // presale id
          ()
          .accounts({
            mintAccount: TOKEN_PUBKEY,
            fromAssociatedTokenAccount,
            fromAuthority: publicKey,
            toAssociatedTokenAccount,
            presaleInfo: presale_info,
            payer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Successfully deposited token.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const withdrawSol = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );

        const fromAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        const toAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: presale_info,
          });

        // Use BigInt for large number calculations
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(PRESALE_PROGRAM_PUBKEY)
        );

        const tx = await program.methods
          .withdrawSol()
          .accounts({
            presaleInfo: presale_info,
            presaleReservePda: presaleReserve,
            presaleAuthority: PRESALE_AUTHORITY,
            authority: OWNER_WALLET,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Successfully withdrawed sol.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const buyTokenWithSol = async (solBalance: number, tokenBalance: number) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );

        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [userInfo, userBump] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
          ],
          program.programId
        );
        let referrer = publicKey;
        try {
          if (cookies.get("ref")) {
            if (isAddress(rot13(cookies.get("ref")))) {
              const ref = rot13(cookies.get("ref"));
              referrer = new PublicKey(ref);
            }
          }
          // @ts-ignore
          const _fUserInfo = await program.account.userInfo.fetch(userInfo);
          if (
            _fUserInfo.referrer.toBase58() !== DEFAULT_PUBKEY.toBase58() &&
            _fUserInfo.referrer.toBase58() !== publicKey.toBase58()
          ) {
            console.log(
              "SOL userinfo referrer::",
              _fUserInfo.referrer.toBase58()
            );
            referrer = _fUserInfo.referrer;
          }
        } catch (error) {
          // console.log("debug fetching usdc referrera::", error);
        }

        const [referralInfo, referralBump] = findProgramAddressSync(
          [
            utf8.encode(REFFERAL_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            referrer.toBuffer(),
          ],
          program.programId
        );
        // Use BigInt for large number calculations
        const bigIntTokenAmount = BigInt(
          Number(tokenBalance * 10 ** TOKEN_DECIMAL).toFixed(0)
        );

        const bigIntSolAmount = BigInt(
          Number(solBalance * 10 ** SOL_DECIMALS).toFixed(0)
        );
        const tx = await program.methods
          .buyTokenWithsol(
            new anchor.BN(bigIntTokenAmount.toString()), // token amount
            new anchor.BN(bigIntSolAmount.toString()), // sol amount = token amount * pricePerToken
            stageNumber
          )
          .accounts({
            presaleInfo,
            presaleReservePda: presaleReserve,
            presaleAuthority: PRESALE_AUTHORITY,
            userInfo,
            referralInfo,
            referrerAccount: referrer,
            // baseAccount: BASE_ACCOUNT,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Token purchase was successful.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const buyTokenWithUsdc = async (
    quoteBalance: number,
    tokenBalance: number
  ) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );

        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [userInfo, userBump] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
          ],
          program.programId
        );

        let referrer = publicKey;
        try {
          if (cookies.get("ref")) {
            if (isAddress(rot13(cookies.get("ref")))) {
              const ref = rot13(cookies.get("ref"));
              referrer = new PublicKey(ref);
            }
          }
          // @ts-ignore
          const _fUserInfo = await program.account.userInfo.fetch(userInfo);
          if (
            _fUserInfo.referrer.toBase58() !== DEFAULT_PUBKEY.toBase58() &&
            _fUserInfo.referrer.toBase58() !== publicKey.toBase58()
          ) {
            console.log(
              "SOL userinfo referrer::",
              _fUserInfo.referrer.toBase58()
            );
            referrer = _fUserInfo.referrer;
          }
        } catch (error) {
          // console.log("debug fetching usdc referrera::", error);
        }
        const [referralInfo, referralBump] = findProgramAddressSync(
          [
            utf8.encode(REFFERAL_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            referrer.toBuffer(),
          ],
          program.programId
        );

        const buyerUsdcTokenAccunt = await anchor.utils.token.associatedAddress(
          {
            mint: new PublicKey(USDC_ADDRESS),
            owner: publicKey,
          }
        );

        const presaleUsdcTokenAccunt =
          await anchor.utils.token.associatedAddress({
            mint: new PublicKey(USDC_ADDRESS),
            owner: presaleInfo,
          });

        // Use BigInt for large number calculations
        const bigIntTokenAmount = BigInt(
          Number(tokenBalance * 10 ** TOKEN_DECIMAL).toFixed(0)
        );

        const bigIntQuoteAmount = BigInt(
          Number(quoteBalance * 10 ** USDC_USDT_DECIMAL).toFixed(0)
        );
        const tx = await program.methods
          .buyTokenWithusdc(
            new anchor.BN(bigIntTokenAmount.toString()), // token amount
            new anchor.BN(bigIntQuoteAmount.toString()), // sol amount = token amount * pricePerToken
            stageNumber
          )
          .accounts({
            presaleInfo,
            presaleAuthority: PRESALE_AUTHORITY,
            buyerUsdcTokenAccount: buyerUsdcTokenAccunt,
            usdcToken: new PublicKey(USDC_ADDRESS),
            presaleUsdcTokenAccount: presaleUsdcTokenAccunt,
            userInfo,
            // baseAccount: BASE_ACCOUNT,
            referralInfo,
            referrerAccount: referrer,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Token purchase was successful.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const buyTokenWithUsdt = async (
    quoteBalance: number,
    tokenBalance: number
  ) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );

        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [userInfo, userBump] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
          ],
          program.programId
        );
        let referrer = publicKey;
        try {
          if (cookies.get("ref")) {
            if (isAddress(rot13(cookies.get("ref")))) {
              const ref = rot13(cookies.get("ref"));
              referrer = new PublicKey(ref);
            }
          }
          // @ts-ignore
          const _fUserInfo = await program.account.userInfo.fetch(userInfo);
          if (
            _fUserInfo.referrer.toBase58() !== DEFAULT_PUBKEY.toBase58() &&
            _fUserInfo.referrer.toBase58() !== publicKey.toBase58()
          ) {
            console.log(
              "SOL userinfo referrer::",
              _fUserInfo.referrer.toBase58()
            );
            referrer = _fUserInfo.referrer;
          }
        } catch (error) {
          // console.log("debug fetching usdc referrera::", error);
        }
        const [referralInfo, referralBump] = findProgramAddressSync(
          [
            utf8.encode(REFFERAL_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            referrer.toBuffer(),
          ],
          program.programId
        );
        const buyerUsdtTokenAccunt = await anchor.utils.token.associatedAddress(
          {
            mint: new PublicKey(USDT_ADDRESS),
            owner: publicKey,
          }
        );

        const presaleUsdtTokenAccunt =
          await anchor.utils.token.associatedAddress({
            mint: new PublicKey(USDT_ADDRESS),
            owner: presaleInfo,
          });

        // Use BigInt for large number calculations
        const bigIntTokenAmount = BigInt(
          Number(tokenBalance * 10 ** TOKEN_DECIMAL).toFixed(0)
        );

        const bigIntQuoteAmount = BigInt(
          Number(quoteBalance * 10 ** USDC_USDT_DECIMAL).toFixed(0)
        );
        console.log(
          "buy with USDT::",
          bigIntTokenAmount.toString(),
          bigIntQuoteAmount.toString()
        );
        const tx = await program.methods
          .buyTokenWithusdt(
            new anchor.BN(bigIntTokenAmount.toString()), // token amount
            new anchor.BN(bigIntQuoteAmount.toString()), // quote amount = token amount * pricePerToken
            stageNumber
          )
          .accounts({
            presaleInfo,
            presaleAuthority: PRESALE_AUTHORITY,
            buyerUsdtTokenAccount: buyerUsdtTokenAccunt,
            usdtToken: new PublicKey(USDT_ADDRESS),
            presaleUsdtTokenAccount: presaleUsdtTokenAccunt,
            userInfo,
            // baseAccount: BASE_ACCOUNT,
            referralInfo,
            referrerAccount: referrer,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Token purchase was successful.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const claimSOL = async () => {
    console.log("debug claim sol::");
  };

  // const claimSOL = async () => {
  //   if (program && publicKey) {
  //     try {
  //       setTransactionPending(true);
  //       const [presaleInfo, presaleBump] = findProgramAddressSync(
  //         [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
  //         program.programId
  //       );
  //       const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
  //         [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
  //         program.programId
  //       );
  //       const [userInfo, userBump] = findProgramAddressSync(
  //         [
  //           utf8.encode(USER_SEED),
  //           PRESALE_AUTHORITY.toBuffer(),
  //           publicKey.toBuffer(),
  //         ],
  //         program.programId
  //       );

  //       const buyer_presale_token_associated_token_account =
  //         await anchor.utils.token.associatedAddress({
  //           mint: TOKEN_PUBKEY,
  //           owner: publicKey,
  //         });

  //       const presale_presale_token_associated_token_account =
  //         await anchor.utils.token.associatedAddress({
  //           mint: TOKEN_PUBKEY,
  //           owner: presaleInfo,
  //         });

  //       const tx = await program.methods
  //         .claimSol(buyPresaleId)
  //         .accounts({
  //           presaleInfo,
  //           presaleReservePda: presaleReserve,
  //           presaleAuthority: PRESALE_AUTHORITY,
  //           buyerAuthority: publicKey,
  //           buyer: publicKey,
  //           userInfo,
  //           rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //           tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
  //           associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //         })
  //         .rpc();
  //       toast.success("SOL claim was successful.");
  //       return false;
  //     } catch (error: any) {
  //       console.log(error);
  //       toast.error(error.toString());
  //       return false;
  //     } finally {
  //       setTransactionPending(false);
  //     }
  //   }
  // };

  const claimToken = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo, presaleBump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [vestingConfig, vestingBump] = findProgramAddressSync(
          [utf8.encode(VESTING_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [userInfo, userBump] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
          ],
          program.programId
        );
        // const userInfo = new PublicKey("CedV6aTBxof9mykbR79eZ1NB2DV9mCz4zvprHfv1QkLq")
        console.log("user info::", userInfo.toBase58());
        const buyerAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: publicKey,
          });

        let referrer = publicKey;
        // @ts-ignore
        const _fUserInfo = await program.account.userInfo.fetch(userInfo);
        if (
          _fUserInfo.referrer.toBase58() !== DEFAULT_PUBKEY.toBase58() &&
          _fUserInfo.referrer.toBase58() !== publicKey.toBase58()
        ) {
          console.log(
            "SOL userinfo referrer::",
            _fUserInfo.referrer.toBase58()
          );
          referrer = _fUserInfo.referrer;
        }
        console.log("debug referer::", referrer.toBase58());
        const [referralInfo, referralBump] = findProgramAddressSync(
          [
            utf8.encode(REFFERAL_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            referrer.toBuffer(),
          ],
          program.programId
        );

        const referrerAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: referrer,
          });

        const presaleAssociatedTokenAccount =
          await anchor.utils.token.associatedAddress({
            mint: TOKEN_PUBKEY,
            owner: presaleInfo,
          });

        console.log(
          "deubg claim Token::",
          buyerAssociatedTokenAccount.toBase58(),
          referrerAssociatedTokenAccount.toBase58(),
          presaleAssociatedTokenAccount.toBase58(),
          userInfo.toBase58(),
          referrer.toBase58(),
          referralInfo.toBase58()
        );
        const tx = await program.methods
          .claimToken()
          .accounts({
            presaleTokenMintAccount: TOKEN_PUBKEY,
            buyerPresaleTokenAssociatedTokenAccount:
              buyerAssociatedTokenAccount,
            presalePresaleTokenAssociatedTokenAccount:
              presaleAssociatedTokenAccount,
            userInfo,
            presaleInfo,
            vestingConfig,
            presaleAuthority: PRESALE_AUTHORITY,
            buyerAuthority: publicKey,
            buyer: publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Token claim was successful.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const withdrawToken = async () => {};

  const referrerClaim = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presale_info, presale_bump] = findProgramAddressSync(
          [utf8.encode(PRESALE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );
        const [presaleReserve, presaleBumpReserve] = findProgramAddressSync(
          [utf8.encode(PRESALE_RESERVE_SEED), PRESALE_AUTHORITY.toBuffer()],
          program.programId
        );

        let referrer = publicKey;
        try {
          if (cookies.get("ref")) {
            if (isAddress(rot13(cookies.get("ref")))) {
              const ref = rot13(cookies.get("ref"));
              referrer = new PublicKey(ref);
            }
          }
          // @ts-ignore
          const _fUserInfo = await program.account.userInfo.fetch(userInfo);
          if (
            _fUserInfo.referrer.toBase58() !== DEFAULT_PUBKEY.toBase58() &&
            _fUserInfo.referrer.toBase58() !== publicKey.toBase58()
          ) {
            console.log(
              "SOL userinfo referrer::",
              _fUserInfo.referrer.toBase58()
            );
            referrer = _fUserInfo.referrer;
          }
        } catch (error) {
          // console.log("debug fetching usdc referrera::", error);
        }

        const [referralInfo, referralBump] = findProgramAddressSync(
          [
            utf8.encode(REFFERAL_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            referrer.toBuffer(),
          ],
          program.programId
        );

        const PUBKEY_USDC = new PublicKey(USDC_ADDRESS);
        const PUBKEY_USDT = new PublicKey(USDT_ADDRESS);
        const [presaleUsdcTokenAccount, presaleUsdcTokenAccountBump] =
          findProgramAddressSync(
            [
              presale_info.toBuffer(),
              TOKEN_PROGRAM_ID.toBuffer(),
              PUBKEY_USDC.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID
          );

        const [referrerUsdcTokenAccount, referrerUsdcTokenAccountBump] =
          findProgramAddressSync(
            [
              referrer.toBuffer(),
              TOKEN_PROGRAM_ID.toBuffer(),
              PUBKEY_USDC.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID
          );

        const [presaleUsdtTokenAccount, presaleUsdtTokenAccountBump] =
          findProgramAddressSync(
            [
              presale_info.toBuffer(),
              TOKEN_PROGRAM_ID.toBuffer(),
              PUBKEY_USDT.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID
          );

        const [referrerUsdtTokenAccount, referrerUsdtTokenAccountBump] =
          findProgramAddressSync(
            [
              referrer.toBuffer(),
              TOKEN_PROGRAM_ID.toBuffer(),
              PUBKEY_USDT.toBuffer(),
            ],
            ASSOCIATED_PROGRAM_ID
          );

        const tx = await program.methods
          .referrerClaim()
          .accounts({
            presaleInfo: presale_info,
            presaleReservePda: presaleReserve,
            presaleAuthority: PRESALE_AUTHORITY,
            usdcTokenMint: PUBKEY_USDC,
            presaleUsdcTokenAccount: presaleUsdcTokenAccount,
            referrerUsdcAccount: referrerUsdcTokenAccount,
            usdtTokenMint: PUBKEY_USDT,
            presaleUsdtTokenAccount: presaleUsdtTokenAccount,
            referrerUsdtAccount: referrerUsdtTokenAccount,
            referralInfo: referralInfo,
            referrer: referrer,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
        toast.success("Successfully withdrawed sol.");
        return false;
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  // const withdrawToken = async () => {
  //   if (program && publicKey) {
  //     try {
  //       setTransactionPending(true);
  //       const [presaleInfo, presaleBump] = findProgramAddressSync(
  //         [
  //           utf8.encode(PRESALE_SEED),
  //           PRESALE_AUTHORITY.toBuffer(),
  //           new Uint8Array([presale_id]),
  //         ],
  //         program.programId
  //       );
  //       const [userInfo, userBump] = findProgramAddressSync(
  //         [
  //           utf8.encode(USER_SEED),
  //           PRESALE_AUTHORITY.toBuffer(),
  //           publicKey.toBuffer(),
  //           // new Uint8Array([presale_id]),
  //         ],
  //         program.programId
  //       );

  //       const buyer_presale_token_associated_token_account =
  //         await anchor.utils.token.associatedAddress({
  //           mint: TOKEN_PUBKEY,
  //           owner: publicKey,
  //         });

  //       const presale_presale_token_associated_token_account =
  //         await anchor.utils.token.associatedAddress({
  //           mint: TOKEN_PUBKEY,
  //           owner: presaleInfo,
  //         });

  //       const bigIntWithdrawAmount =
  //         BigInt(4000000000) * BigInt(10 ** TOKEN_DECIMAL);

  //       const tx = await program.methods
  //         .withdrawToken(
  //           new anchor.BN(bigIntWithdrawAmount.toString()),
  //           presale_id
  //         )
  //         .accounts({
  //           presaleTokenMintAccount: TOKEN_PUBKEY,
  //           buyerPresaleTokenAssociatedTokenAccount:
  //             buyer_presale_token_associated_token_account,
  //           presalePresaleTokenAssociatedTokenAccount:
  //             presale_presale_token_associated_token_account,
  //           presaleInfo,
  //           presaleAuthority: PRESALE_AUTHORITY,
  //           buyerAuthority: publicKey,
  //           buyer: publicKey,
  //           rent: anchor.web3.SYSVAR_RENT_PUBKEY,
  //           systemProgram: anchor.web3.SystemProgram.programId,
  //           tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
  //           associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
  //         })
  //         .rpc();
  //       toast.success("Token withdraw was successful.");
  //       return false;
  //     } catch (error: any) {
  //       console.log(error);
  //       toast.error(error.toString());
  //       return false;
  //     } finally {
  //       setTransactionPending(false);
  //     }
  //   }
  // };
  return {
    createPresale,
    nextPresale,
    updateStagePresale,
    depositToken,
    withdrawSol,
    buyTokenWithSol,
    buyTokenWithUsdc,
    buyTokenWithUsdt,
    claimToken,
    claimSOL,
    referrerClaim,
    // withdrawToken,
    startTime,
    endTime,
    buyAmount,
    quoteAmount,
    userInfo,
    totalBuyAmount,
    totalQuoteAmount,
    entireBuyAmount,
    transactionPending,
    presale_id,
    stageNumber,
    price_per_token,
    next_price_per_token,
    stage_hardcap,
    totalHardCap,
    totalSoftCap,
    balance,
    stagePurchasedAmount,
    walletConnected,
    minTokenBalancePerWallet,
    maxTokenBalancePerWallet,
    referralInfo,
  };
}
