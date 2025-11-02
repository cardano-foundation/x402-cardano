export type CardanoAddress = string & { readonly __brand: "CardanoAddress" };

export function isValidCardanoAddress(addr: string): addr is CardanoAddress {
  if (!addr.startsWith("addr1")) return false;

  const bech32Regex = /^addr1[a-z0-9]{53,}$/;
  return bech32Regex.test(addr);
}

export function createCardanoAddress(addr: string): CardanoAddress {
  if (!isValidCardanoAddress(addr)) {
    throw new Error("Invalid Cardano address");
  }
  return addr as CardanoAddress;
}
