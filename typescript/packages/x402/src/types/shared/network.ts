import { z } from "zod";

export const NetworkSchema = z.enum([
  "base-sepolia",
  "base",
  "avalanche-fuji",
  "avalanche",
  "iotex",
  "solana-devnet",
  "solana",
  "sei",
  "sei-testnet",
  "polygon",
  "polygon-amoy",
  "peaq",
  "cardano",
  "cardano-preprod",
  "cardano-preview",
  "cardano-masumi",
  "cardano-masumi-preprod",
  "cardano-masumi-preview",
]);
export type Network = z.infer<typeof NetworkSchema>;

// evm
export const SupportedEVMNetworks: Network[] = [
  "base-sepolia",
  "base",
  "avalanche-fuji",
  "avalanche",
  "iotex",
  "sei",
  "sei-testnet",
  "polygon",
  "polygon-amoy",
  "peaq",
];
export const EvmNetworkToChainId = new Map<Network, number>([
  ["base-sepolia", 84532],
  ["base", 8453],
  ["avalanche-fuji", 43113],
  ["avalanche", 43114],
  ["iotex", 4689],
  ["sei", 1329],
  ["sei-testnet", 1328],
  ["polygon", 137],
  ["polygon-amoy", 80002],
  ["peaq", 3338],
]);

// svm
export const SupportedSVMNetworks: Network[] = ["solana-devnet", "solana"];
export const SvmNetworkToChainId = new Map<Network, number>([
  ["solana-devnet", 103],
  ["solana", 101],
]);

// cardano
export const SupportedCardanoNetworks: Network[] = [
  "cardano",
  "cardano-preprod",
  "cardano-preview",
  "cardano-masumi",
  "cardano-masumi-preprod",
  "cardano-masumi-preview",
];

export const CardanoNetworkToChainId = new Map<Network, number>([
  ["cardano", 764824073],
  ["cardano-preprod", 1],
  ["cardano-preview", 2],
  ["cardano-masumi", 764824073],
  ["cardano-masumi-preprod", 1],
  ["cardano-masumi-preview", 2],
]);

export const ChainIdToNetwork = Object.fromEntries(
  [...SupportedEVMNetworks, ...SupportedSVMNetworks].map(network => [
    EvmNetworkToChainId.get(network),
    network,
  ]),
) as Record<number, Network>;
