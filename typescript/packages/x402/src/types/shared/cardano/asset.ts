import { Network, SupportedCardanoNetworks } from "../network";

export function getPolicyId(assetName: string, network: Network): string {
  if (!SupportedCardanoNetworks.includes(network)) {
    throw new Error(`Unsupported Cardano network: ${network}`);
  }

  if (assetName.toUpperCase() === "USDM") {
    if (network === "cardano" || network === "cardano-masumi") {
      return "c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad";
    } else {
      return "16a55b2a349361ff88c03788f93e1e966e5d689605d044fef722ddde";
    }
  } else {
    throw new Error(`Unknown asset name: ${assetName}`);
  }
}

export function getAssetNameHex(assetName: string): string {
  if (assetName === "USDM") {
    return "0014df105553444d"; // (333) USDM
  } else {
    return Buffer.from(assetName, "utf8").toString("hex");
  }
}
