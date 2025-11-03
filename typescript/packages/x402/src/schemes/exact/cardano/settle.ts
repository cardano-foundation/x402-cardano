import { decodeTransactionFromPayload } from "../../../shared/cardano/trasnaction";
import { CardanoSigner } from "../../../shared/cardano/wallet";
import { PaymentPayload, PaymentRequirements, SettleResponse, X402Config } from "../../../types";
import { verify } from "./verify";

export async function settle(
  signer: CardanoSigner,
  payload: PaymentPayload,
  paymentRequirements: PaymentRequirements,
  config?: X402Config,
): Promise<SettleResponse> {
  const verifyResponse = await verify(signer, payload, paymentRequirements, config);
  if (!verifyResponse.isValid) {
    return {
      success: false,
      errorReason: verifyResponse.invalidReason,
      network: payload.network,
      transaction: "",
    };
  }

  const decodedTransaction = decodeTransactionFromPayload(payload.payload as any);

  try {
    const tsHash = await signer.submitTx(decodedTransaction.toCbor());

    return {
      success: true,
      errorReason: undefined,
      payer: verifyResponse.payer,
      transaction: tsHash,
      network: payload.network,
    };
  } catch (error) {
    console.error("Unexpected error during transaction settlement:", error);
    return {
      success: false,
      errorReason: "unexpected_settle_error",
      network: payload.network,
      transaction: "",
      payer: verifyResponse.payer,
    };
  }
}
