import { config } from "dotenv";
import express from "express";
import { paymentMiddleware, Resource, type SolanaAddress, type CardanoAddress } from "x402-express";
config();

const facilitatorUrl = process.env.FACILITATOR_URL as Resource;
const payTo = process.env.ADDRESS as `0x${string}` | SolanaAddress | CardanoAddress;

if (!facilitatorUrl || !payTo) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const app = express();

app.use(
  paymentMiddleware(
    payTo,
    {
      "GET /weather": {
        // USDC amount in dollars
        price: "$0.001",
        // network: "base" // uncomment for Base mainnet
        // network: "solana" // uncomment for Solana mainnet
        // network: "cardano" // uncomment for Cardano mainnet
        network: "base-sepolia",
      },
      "GET /news": {
        // USDC amount in dollars
        price: {
          amount: "1.000000",
          asset: {
            address: "",
            policyId: "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad",
            assetName: "USDM",
            decimals: 6,
          },
        },
        // network: "base" // uncomment for Base mainnet
        // network: "solana" // uncomment for Solana mainnet
        // network: "cardano" // uncomment for Cardano mainnet
        network: "cardano-preprod",
      },
      "/premium/*": {
        // Define atomic amounts in any EIP-3009 token
        price: {
          amount: "100000",
          asset: {
            address: "0xabc",
            decimals: 18,
            // omit eip712 for Solana
            eip712: {
              name: "WETH",
              version: "1",
            },
          },
        },
        // network: "base" // uncomment for Base mainnet
        // network: "solana" // uncomment for Solana mainnet
        // network: "cardano" // uncomment for Cardano mainnet
        network: "base-sepolia",
      },
    },
    {
      url: facilitatorUrl,
    },
  ),
);

app.get("/news", (req, res) => {
  res.send({
    latest: {
      headline: "x402 rocks!",
      timestamp: Date.now(),
    },
  });
});

app.get("/weather", (req, res) => {
  res.send({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.get("/premium/content", (req, res) => {
  res.send({
    content: "This is premium content",
  });
});

app.listen(4021, () => {
  console.log(`Server listening at http://localhost:${4021}`);
});
