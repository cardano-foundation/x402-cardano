import { MeshWallet } from "@meshsdk/core";

export type CardanoWallet = MeshWallet;
export type CardanoSigner = CardanoWallet;

export function createSigner(privateKey: string, network: string): Promise<CardanoWallet> {
  return Promise.resolve(
    new MeshWallet({
      networkId: network.includes("preprod") || network.includes("preprod") ? 1 : 0,
      fetcher: undefined,
      submitter: undefined,
      key: {
        type: "root",
        bech32: privateKey,
      },
    }),
  );
}
