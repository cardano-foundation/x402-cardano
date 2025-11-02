import { Network, SupportedCardanoNetworks } from "../network";

export function getPolicyId(assetName: string, network: Network): string {
  if (!SupportedCardanoNetworks.includes(network)) {
    throw new Error(`Unsupported Cardano network: ${network}`);
  }

  if (assetName.toUpperCase() === "USDM") {
    if (network === "cardano" || network === "cardano-masumi") {
      return "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad";
    } else {
      return "c69b981db7a65e339a6d783755f85a2e03afa1cece9714c55fe4c913";
    }
  } else {
    throw new Error(`Unknown asset name: ${assetName}`);
  }
}
