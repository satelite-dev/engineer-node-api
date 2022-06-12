
import ethSigUtil from "@metamask/eth-sig-util";

const checkSignature = (message, signature, wallet) => {
    const params = {
        data: message,
        signature
    };
    const address = ethSigUtil.recoverPersonalSignature(params);
    if (address?.toLowerCase() !== wallet?.toLowerCase()) throw new Error("Unathorized");
    return address;
}

export default checkSignature;