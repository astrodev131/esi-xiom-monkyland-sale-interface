export type TokenPresale = {
  "version": "0.1.0",
  "name": "token_presale",
  "constants": [
    {
      "name": "PRESALE_SEED",
      "type": "bytes",
      "value": "[77, 79, 78, 75, 89, 76, 65, 78, 68, 95, 80, 82, 69, 83, 65, 76, 69, 95, 83, 69, 69, 68]"
    }
  ],
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenMintAddress", "type": "publicKey" },
        { "name": "solTokenMintAddress", "type": "publicKey" },
        { "name": "usdcTokenMintAddress", "type": "publicKey" },
        { "name": "usdtTokenMintAddress", "type": "publicKey" },
        { "name": "softcapAmount", "type": "u64" },
        { "name": "hardcapAmount", "type": "u64" },
        { "name": "stagehardcapAmount", "type": "u64" },
        { "name": "maxTokenAmountPerAddress", "type": "u64" },
        { "name": "minTokenAmountPerAddress", "type": "u64" },
        { "name": "pricePerToken", "type": "u64" },
        { "name": "nextPricePerToken", "type": "u64" },
        { "name": "startTime", "type": "u64" },
        { "name": "endTime", "type": "u64" },
        { "name": "identifier", "type": "u8" }
      ]
    },
    {
      "name": "updatePresale",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "pricePerToken", "type": "u64" },
        { "name": "nextPricePerToken", "type": "u64" },
        { "name": "stagehardcapAmount", "type": "u64" },
        { "name": "startTime", "type": "u64" },
        { "name": "endTime", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "updateStagesale",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "pricePerToken", "type": "u64" },
        { "name": "nextPricePerToken", "type": "u64" },
        { "name": "stagehardcapAmount", "type": "u64" },
        { "name": "startTime", "type": "u64" },
        { "name": "endTime", "type": "u64" },
        { "name": "stage", "type": "u8" },
        { "name": "paused", "type": "bool" }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        { "name": "mintAccount", "isMut": true, "isSigner": false },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "fromAuthority", "isMut": false, "isSigner": false },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "payer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "buyTokenWithsol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrerAccount", "isMut": true, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenAmount", "type": "u64" },
        { "name": "quoteAmountInsol", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "buyTokenWithusdc",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "usdcToken", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrerAccount", "isMut": true, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenAmount", "type": "u64" },
        { "name": "quoteAmountInusdc", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "buyTokenWithusdt",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "usdtToken", "isMut": false, "isSigner": false },
        { "name": "presaleUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrerAccount", "isMut": true, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenAmount", "type": "u64" },
        { "name": "quoteAmountInusdt", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "claimSol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "claimToken",
      "accounts": [
        { "name": "presaleTokenMintAccount", "isMut": true, "isSigner": false },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "vestingConfig", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "withdrawSol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "withdrawToken",
      "accounts": [
        { "name": "presaleTokenMintAccount", "isMut": true, "isSigner": false },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "unsoldTokenBurn",
      "accounts": [
        { "name": "presaleTokenMintAccount", "isMut": true, "isSigner": false },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "withdrawUsdc",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "usdcToken", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "ownerUsdc", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "initVesting",
      "accounts": [
        { "name": "vestingConfig", "isMut": true, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "initialUnlockPercent", "type": { "array": ["u8", 8] } },
        { "name": "cliffMonths", "type": { "array": ["u8", 8] } },
        { "name": "releaseMonths", "type": { "array": ["u8", 8] } }
      ]
    },
    {
      "name": "referrerClaimSol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "referrerClaimUsdc",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "usdcTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdcAccount", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "referrerClaimUsdt",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "usdtTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdtAccount", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "referrerClaim",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "usdcTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdcAccount", "isMut": true, "isSigner": false },
        { "name": "usdtTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdtAccount", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "PresaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "tokenMintAddress", "type": "publicKey" },
          { "name": "solTokenMintAddress", "type": "publicKey" },
          { "name": "usdcTokenMintAddress", "type": "publicKey" },
          { "name": "usdtTokenMintAddress", "type": "publicKey" },
          { "name": "softcapAmount", "type": "u64" },
          { "name": "hardcapAmount", "type": "u64" },
          { "name": "stagehardcapAmount", "type": "u64" },
          { "name": "stagePurchasedAmount", "type": "u64" },
          { "name": "depositTokenAmount", "type": "u64" },
          { "name": "soldTokenAmount", "type": "u64" },
          { "name": "soldQuoteAmount", "type": "u64" },
          { "name": "soldSolAmount", "type": "u64" },
          { "name": "soldUsdcAmount", "type": "u64" },
          { "name": "soldUsdtAmount", "type": "u64" },
          { "name": "totalReferredSolAmount", "type": "u64" },
          { "name": "totalReferredUsdcAmount", "type": "u64" },
          { "name": "totalReferredUsdtAmount", "type": "u64" },
          { "name": "startTime", "type": "u64" },
          { "name": "endTime", "type": "u64" },
          { "name": "maxTokenAmountPerAddress", "type": "u64" },
          { "name": "minTokenAmountPerAddress", "type": "u64" },
          { "name": "pricePerToken", "type": "u64" },
          { "name": "nextPricePerToken", "type": "u64" },
          { "name": "stage", "type": "u8" },
          { "name": "identifier", "type": "u8" },
          { "name": "authority", "type": "publicKey" },
          { "name": "bump", "type": "u8" },
          { "name": "tgeTime", "type": "u64" },
          { "name": "paused", "type": "bool" },
          { "name": "teamTokenAmount", "type": "u64" },
          { "name": "liquidityTokenAmount", "type": "u64" },
          { "name": "marketingTokenAmount", "type": "u64" },
          { "name": "reserveTokenAmount", "type": "u64" },
          { "name": "stakingRewardsAmount", "type": "u64" },
          { "name": "advisorsTokenAmount", "type": "u64" },
          { "name": "teamTokenClaimed", "type": "u64" },
          { "name": "liquidityTokenClaimed", "type": "u64" },
          { "name": "marketingTokenClaimed", "type": "u64" },
          { "name": "reserveTokenClaimed", "type": "u64" },
          { "name": "stakingRewardsClaimed", "type": "u64" },
          { "name": "advisorsTokenClaimed", "type": "u64" },
          { "name": "teamClaimedTime", "type": "u64" },
          { "name": "marketingClaimedTime", "type": "u64" },
          { "name": "reserveClaimedTime", "type": "u64" },
          { "name": "stakingClaimedTime", "type": "u64" },
          { "name": "advisorsClaimedTime", "type": "u64" }
        ]
      }
    },
    {
      "name": "ReferralInfo",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "referrals", "type": { "vec": "publicKey" } },
          { "name": "referralsCount", "type": "u64" },
          { "name": "referredSolAmount", "type": "u64" },
          { "name": "referredUsdcAmount", "type": "u64" },
          { "name": "referredUsdtAmount", "type": "u64" },
          { "name": "claimedSolAmount", "type": "u64" },
          { "name": "claimedUsdcAmount", "type": "u64" },
          { "name": "claimedUsdtAmount", "type": "u64" }
        ]
      }
    },
    {
      "name": "UserInfo",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "referrer", "type": "publicKey" },
          { "name": "referralsCount", "type": "u64" },
          { "name": "buyQuoteAmount", "type": "u64" },
          { "name": "buyTokenAmount", "type": "u64" },
          { "name": "buyTime", "type": "u64" },
          { "name": "claimQuoteAmount", "type": "u64" },
          { "name": "claimTokenAmount", "type": "u64" },
          { "name": "claimTime", "type": "u64" },
          { "name": "presaleId", "type": "u8" },
          { "name": "roundAmounts", "type": { "array": ["u64", 8] } },
          { "name": "roundClaimed", "type": { "array": ["u64", 8] } },
          { "name": "vestingLastTime", "type": { "array": ["u64", 8] } }
        ]
      }
    },
    {
      "name": "VestingConfig",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "initialUnlockPercent", "type": { "array": ["u8", 8] } },
          { "name": "cliffMonths", "type": { "array": ["u8", 8] } },
          { "name": "releaseMonths", "type": { "array": ["u8", 8] } },
          { "name": "isInitialized", "type": "bool" }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    { "code": 6001, "name": "NotAllowed", "msg": "Not allowed" },
    { "code": 6002, "name": "MathOverflow", "msg": "Math operation overflow" },
    { "code": 6003, "name": "AlreadyPurchased", "msg": "Already purchased" },
    {
      "code": 6004,
      "name": "PresaleNotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6005,
      "name": "PresaleStarted",
      "msg": "Presale already started"
    },
    {
      "code": 6006,
      "name": "InvalidPresaleStartTime",
      "msg": "Invalid Presale Start Time"
    },
    {
      "code": 6007,
      "name": "InvalidPresaleEndTime",
      "msg": "Invalid Presale End Time"
    },
    { "code": 6008, "name": "InvalidRound", "msg": "Invalid Round" },
    {
      "code": 6009,
      "name": "TokenAmountMismatch",
      "msg": "Token amount mismatch"
    },
    {
      "code": 6010,
      "name": "InsufficientTokens",
      "msg": "Insufficient Tokens"
    },
    {
      "code": 6011,
      "name": "StageHardCapReached",
      "msg": "Presale stage hard cap already reached"
    },
    {
      "code": 6012,
      "name": "TooSmallAmount",
      "msg": "Deposit amount is too small"
    },
    { "code": 6013, "name": "PresaleNotEnded", "msg": "Presale not ended yet" },
    { "code": 6014, "name": "PresaleEnded", "msg": "Presale already ended" },
    {
      "code": 6015,
      "name": "PresaleIDRange",
      "msg": "Presale ID out of range"
    },
    {
      "code": 6016,
      "name": "PresaleStageIncorrect",
      "msg": "Presale stage is incorrect"
    },
    {
      "code": 6017,
      "name": "PresaleStageReached",
      "msg": "Presale stage is reached"
    },
    {
      "code": 6018,
      "name": "PresaleCantUpdate",
      "msg": "Presale hardcap already reached"
    },
    {
      "code": 6019,
      "name": "PresaleHardCapReached",
      "msg": "Presale cant update anymore"
    },
    {
      "code": 6020,
      "name": "UserHardCapReached",
      "msg": "User hardcap already reached"
    },
    { "code": 6021, "name": "SoftCapReached", "msg": "SoftCap reached" },
    { "code": 6022, "name": "SoftCapNotReached", "msg": "SoftCap not reached" },
    { "code": 6023, "name": "NoClaimableToken", "msg": "No claimable token" },
    { "code": 6024, "name": "PresalePaused", "msg": "Presale Paused" },
    {
      "code": 6025,
      "name": "ReferrerAccountMismatch",
      "msg": "Referrer account mismatch"
    },
    {
      "code": 6026,
      "name": "NoReferredSolAmount",
      "msg": "No referred SOL amount"
    },
    {
      "code": 6027,
      "name": "NoReferredUsdcAmount",
      "msg": "No referred USDC amount"
    },
    {
      "code": 6028,
      "name": "NoReferredUsdtAmount",
      "msg": "No referred USDT amount"
    },
    {
      "code": 6029,
      "name": "ReferredSolClaimed",
      "msg": "Referred SOL already claimed"
    },
    {
      "code": 6030,
      "name": "ReferredUsdcClaimed",
      "msg": "Referred USDC already claimed"
    },
    {
      "code": 6031,
      "name": "ReferredUsdtClaimed",
      "msg": "Referred USDT already claimed"
    },
    {
      "code": 6032,
      "name": "InsufficientClaimAmount",
      "msg": "Insufficient claimable amount"
    }
  ]
};

export const IDL: TokenPresale = {
  "version": "0.1.0",
  "name": "token_presale",
  "constants": [
    {
      "name": "PRESALE_SEED",
      "type": "bytes",
      "value": "[77, 79, 78, 75, 89, 76, 65, 78, 68, 95, 80, 82, 69, 83, 65, 76, 69, 95, 83, 69, 69, 68]"
    }
  ],
  "instructions": [
    {
      "name": "createPresale",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenMintAddress", "type": "publicKey" },
        { "name": "solTokenMintAddress", "type": "publicKey" },
        { "name": "usdcTokenMintAddress", "type": "publicKey" },
        { "name": "usdtTokenMintAddress", "type": "publicKey" },
        { "name": "softcapAmount", "type": "u64" },
        { "name": "hardcapAmount", "type": "u64" },
        { "name": "stagehardcapAmount", "type": "u64" },
        { "name": "maxTokenAmountPerAddress", "type": "u64" },
        { "name": "minTokenAmountPerAddress", "type": "u64" },
        { "name": "pricePerToken", "type": "u64" },
        { "name": "nextPricePerToken", "type": "u64" },
        { "name": "startTime", "type": "u64" },
        { "name": "endTime", "type": "u64" },
        { "name": "identifier", "type": "u8" }
      ]
    },
    {
      "name": "updatePresale",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "pricePerToken", "type": "u64" },
        { "name": "nextPricePerToken", "type": "u64" },
        { "name": "stagehardcapAmount", "type": "u64" },
        { "name": "startTime", "type": "u64" },
        { "name": "endTime", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "updateStagesale",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "pricePerToken", "type": "u64" },
        { "name": "nextPricePerToken", "type": "u64" },
        { "name": "stagehardcapAmount", "type": "u64" },
        { "name": "startTime", "type": "u64" },
        { "name": "endTime", "type": "u64" },
        { "name": "stage", "type": "u8" },
        { "name": "paused", "type": "bool" }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        { "name": "mintAccount", "isMut": true, "isSigner": false },
        {
          "name": "fromAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "fromAuthority", "isMut": false, "isSigner": false },
        {
          "name": "toAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "payer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "buyTokenWithsol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrerAccount", "isMut": true, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenAmount", "type": "u64" },
        { "name": "quoteAmountInsol", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "buyTokenWithusdc",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "usdcToken", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrerAccount", "isMut": true, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenAmount", "type": "u64" },
        { "name": "quoteAmountInusdc", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "buyTokenWithusdt",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "usdtToken", "isMut": false, "isSigner": false },
        { "name": "presaleUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrerAccount", "isMut": true, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "tokenAmount", "type": "u64" },
        { "name": "quoteAmountInusdt", "type": "u64" },
        { "name": "stage", "type": "u8" }
      ]
    },
    {
      "name": "claimSol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "claimToken",
      "accounts": [
        { "name": "presaleTokenMintAccount", "isMut": true, "isSigner": false },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "vestingConfig", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "withdrawSol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "withdrawToken",
      "accounts": [
        { "name": "presaleTokenMintAccount", "isMut": true, "isSigner": false },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "unsoldTokenBurn",
      "accounts": [
        { "name": "presaleTokenMintAccount", "isMut": true, "isSigner": false },
        {
          "name": "buyerPresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "presalePresaleTokenAssociatedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        { "name": "userInfo", "isMut": true, "isSigner": false },
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "buyerAuthority", "isMut": false, "isSigner": false },
        { "name": "buyer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "withdrawUsdc",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "usdcToken", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "ownerUsdc", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "initVesting",
      "accounts": [
        { "name": "vestingConfig", "isMut": true, "isSigner": false },
        { "name": "authority", "isMut": true, "isSigner": true },
        { "name": "systemProgram", "isMut": false, "isSigner": false }
      ],
      "args": [
        { "name": "initialUnlockPercent", "type": { "array": ["u8", 8] } },
        { "name": "cliffMonths", "type": { "array": ["u8", 8] } },
        { "name": "releaseMonths", "type": { "array": ["u8", 8] } }
      ]
    },
    {
      "name": "referrerClaimSol",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "referrerClaimUsdc",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "usdcTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdcAccount", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "referrerClaimUsdt",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "usdtTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdtAccount", "isMut": true, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    },
    {
      "name": "referrerClaim",
      "accounts": [
        { "name": "presaleInfo", "isMut": true, "isSigner": false },
        { "name": "presaleReservePda", "isMut": true, "isSigner": false },
        { "name": "usdcTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdcTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdcAccount", "isMut": true, "isSigner": false },
        { "name": "usdtTokenMint", "isMut": false, "isSigner": false },
        { "name": "presaleUsdtTokenAccount", "isMut": true, "isSigner": false },
        { "name": "referrerUsdtAccount", "isMut": true, "isSigner": false },
        { "name": "presaleAuthority", "isMut": false, "isSigner": false },
        { "name": "referralInfo", "isMut": true, "isSigner": false },
        { "name": "referrer", "isMut": true, "isSigner": true },
        { "name": "rent", "isMut": false, "isSigner": false },
        { "name": "systemProgram", "isMut": false, "isSigner": false },
        { "name": "tokenProgram", "isMut": false, "isSigner": false },
        { "name": "associatedTokenProgram", "isMut": false, "isSigner": false }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "PresaleInfo",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "tokenMintAddress", "type": "publicKey" },
          { "name": "solTokenMintAddress", "type": "publicKey" },
          { "name": "usdcTokenMintAddress", "type": "publicKey" },
          { "name": "usdtTokenMintAddress", "type": "publicKey" },
          { "name": "softcapAmount", "type": "u64" },
          { "name": "hardcapAmount", "type": "u64" },
          { "name": "stagehardcapAmount", "type": "u64" },
          { "name": "stagePurchasedAmount", "type": "u64" },
          { "name": "depositTokenAmount", "type": "u64" },
          { "name": "soldTokenAmount", "type": "u64" },
          { "name": "soldQuoteAmount", "type": "u64" },
          { "name": "soldSolAmount", "type": "u64" },
          { "name": "soldUsdcAmount", "type": "u64" },
          { "name": "soldUsdtAmount", "type": "u64" },
          { "name": "totalReferredSolAmount", "type": "u64" },
          { "name": "totalReferredUsdcAmount", "type": "u64" },
          { "name": "totalReferredUsdtAmount", "type": "u64" },
          { "name": "startTime", "type": "u64" },
          { "name": "endTime", "type": "u64" },
          { "name": "maxTokenAmountPerAddress", "type": "u64" },
          { "name": "minTokenAmountPerAddress", "type": "u64" },
          { "name": "pricePerToken", "type": "u64" },
          { "name": "nextPricePerToken", "type": "u64" },
          { "name": "stage", "type": "u8" },
          { "name": "identifier", "type": "u8" },
          { "name": "authority", "type": "publicKey" },
          { "name": "bump", "type": "u8" },
          { "name": "tgeTime", "type": "u64" },
          { "name": "paused", "type": "bool" },
          { "name": "teamTokenAmount", "type": "u64" },
          { "name": "liquidityTokenAmount", "type": "u64" },
          { "name": "marketingTokenAmount", "type": "u64" },
          { "name": "reserveTokenAmount", "type": "u64" },
          { "name": "stakingRewardsAmount", "type": "u64" },
          { "name": "advisorsTokenAmount", "type": "u64" },
          { "name": "teamTokenClaimed", "type": "u64" },
          { "name": "liquidityTokenClaimed", "type": "u64" },
          { "name": "marketingTokenClaimed", "type": "u64" },
          { "name": "reserveTokenClaimed", "type": "u64" },
          { "name": "stakingRewardsClaimed", "type": "u64" },
          { "name": "advisorsTokenClaimed", "type": "u64" },
          { "name": "teamClaimedTime", "type": "u64" },
          { "name": "marketingClaimedTime", "type": "u64" },
          { "name": "reserveClaimedTime", "type": "u64" },
          { "name": "stakingClaimedTime", "type": "u64" },
          { "name": "advisorsClaimedTime", "type": "u64" }
        ]
      }
    },
    {
      "name": "ReferralInfo",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "referrals", "type": { "vec": "publicKey" } },
          { "name": "referralsCount", "type": "u64" },
          { "name": "referredSolAmount", "type": "u64" },
          { "name": "referredUsdcAmount", "type": "u64" },
          { "name": "referredUsdtAmount", "type": "u64" },
          { "name": "claimedSolAmount", "type": "u64" },
          { "name": "claimedUsdcAmount", "type": "u64" },
          { "name": "claimedUsdtAmount", "type": "u64" }
        ]
      }
    },
    {
      "name": "UserInfo",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "referrer", "type": "publicKey" },
          { "name": "referralsCount", "type": "u64" },
          { "name": "buyQuoteAmount", "type": "u64" },
          { "name": "buyTokenAmount", "type": "u64" },
          { "name": "buyTime", "type": "u64" },
          { "name": "claimQuoteAmount", "type": "u64" },
          { "name": "claimTokenAmount", "type": "u64" },
          { "name": "claimTime", "type": "u64" },
          { "name": "presaleId", "type": "u8" },
          { "name": "roundAmounts", "type": { "array": ["u64", 8] } },
          { "name": "roundClaimed", "type": { "array": ["u64", 8] } },
          { "name": "vestingLastTime", "type": { "array": ["u64", 8] } }
        ]
      }
    },
    {
      "name": "VestingConfig",
      "type": {
        "kind": "struct",
        "fields": [
          { "name": "initialUnlockPercent", "type": { "array": ["u8", 8] } },
          { "name": "cliffMonths", "type": { "array": ["u8", 8] } },
          { "name": "releaseMonths", "type": { "array": ["u8", 8] } },
          { "name": "isInitialized", "type": "bool" }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    { "code": 6001, "name": "NotAllowed", "msg": "Not allowed" },
    { "code": 6002, "name": "MathOverflow", "msg": "Math operation overflow" },
    { "code": 6003, "name": "AlreadyPurchased", "msg": "Already purchased" },
    {
      "code": 6004,
      "name": "PresaleNotStarted",
      "msg": "Presale not started yet"
    },
    {
      "code": 6005,
      "name": "PresaleStarted",
      "msg": "Presale already started"
    },
    {
      "code": 6006,
      "name": "InvalidPresaleStartTime",
      "msg": "Invalid Presale Start Time"
    },
    {
      "code": 6007,
      "name": "InvalidPresaleEndTime",
      "msg": "Invalid Presale End Time"
    },
    { "code": 6008, "name": "InvalidRound", "msg": "Invalid Round" },
    {
      "code": 6009,
      "name": "TokenAmountMismatch",
      "msg": "Token amount mismatch"
    },
    {
      "code": 6010,
      "name": "InsufficientTokens",
      "msg": "Insufficient Tokens"
    },
    {
      "code": 6011,
      "name": "StageHardCapReached",
      "msg": "Presale stage hard cap already reached"
    },
    {
      "code": 6012,
      "name": "TooSmallAmount",
      "msg": "Deposit amount is too small"
    },
    { "code": 6013, "name": "PresaleNotEnded", "msg": "Presale not ended yet" },
    { "code": 6014, "name": "PresaleEnded", "msg": "Presale already ended" },
    {
      "code": 6015,
      "name": "PresaleIDRange",
      "msg": "Presale ID out of range"
    },
    {
      "code": 6016,
      "name": "PresaleStageIncorrect",
      "msg": "Presale stage is incorrect"
    },
    {
      "code": 6017,
      "name": "PresaleStageReached",
      "msg": "Presale stage is reached"
    },
    {
      "code": 6018,
      "name": "PresaleCantUpdate",
      "msg": "Presale hardcap already reached"
    },
    {
      "code": 6019,
      "name": "PresaleHardCapReached",
      "msg": "Presale cant update anymore"
    },
    {
      "code": 6020,
      "name": "UserHardCapReached",
      "msg": "User hardcap already reached"
    },
    { "code": 6021, "name": "SoftCapReached", "msg": "SoftCap reached" },
    { "code": 6022, "name": "SoftCapNotReached", "msg": "SoftCap not reached" },
    { "code": 6023, "name": "NoClaimableToken", "msg": "No claimable token" },
    { "code": 6024, "name": "PresalePaused", "msg": "Presale Paused" },
    {
      "code": 6025,
      "name": "ReferrerAccountMismatch",
      "msg": "Referrer account mismatch"
    },
    {
      "code": 6026,
      "name": "NoReferredSolAmount",
      "msg": "No referred SOL amount"
    },
    {
      "code": 6027,
      "name": "NoReferredUsdcAmount",
      "msg": "No referred USDC amount"
    },
    {
      "code": 6028,
      "name": "NoReferredUsdtAmount",
      "msg": "No referred USDT amount"
    },
    {
      "code": 6029,
      "name": "ReferredSolClaimed",
      "msg": "Referred SOL already claimed"
    },
    {
      "code": 6030,
      "name": "ReferredUsdcClaimed",
      "msg": "Referred USDC already claimed"
    },
    {
      "code": 6031,
      "name": "ReferredUsdtClaimed",
      "msg": "Referred USDT already claimed"
    },
    {
      "code": 6032,
      "name": "InsufficientClaimAmount",
      "msg": "Insufficient claimable amount"
    }
  ]
};