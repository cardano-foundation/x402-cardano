import { X402Config } from "../../../types/config";
import { PaymentPayload, PaymentRequirements, VerifyResponse } from "../../../types";
import { CardanoSigner } from "../../../shared/cardano/wallet";

export async function verify(
  signer: CardanoSigner,
  payload: PaymentPayload,
  paymentRequirements: PaymentRequirements,
  config?: X402Config,
): Promise<VerifyResponse> {
  return { isValid: false, invalidReason: "insufficient_funds" };
}
