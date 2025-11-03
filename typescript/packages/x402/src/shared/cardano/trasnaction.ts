import { ExactCardanoPayload } from "../../types";
import { deserializeTx, Serialization } from "@meshsdk/core-cst";

type CardanoTransaction = Serialization.Transaction;

export function decodeTransactionFromPayload(
  cardanoPayload: ExactCardanoPayload,
): CardanoTransaction {
  try {
    const transactionBytes = Buffer.from(cardanoPayload.transaction, "base64");

    return deserializeTx(transactionBytes.toString("hex"));
  } catch (error) {
    console.error("error", error);
    throw new Error("invalid_exact_svm_payload_transaction");
  }
}
