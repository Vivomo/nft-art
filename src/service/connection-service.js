import { ethers } from "ethers";
import { messageBox } from "./message-service"
import { configuration } from '../config'

export const connectOnce = async () => {
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  await provider.send("eth_requestAccounts", []);
  let signer = provider.getSigner();
  let network = await provider.getNetwork();
  let address = await signer.getAddress();
  return{chainId:network.chainId, address: address, provider, signer};
}
export const trying = async () => {
  const {chainId, address, provider, signer} = await connectOnce();
  const supported = configuration().chainId.toString();
  if (chainId == supported) {
    await messageBox("success", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")

    return {success:true, provider, signer};
  }
  await messageBox("warning", "", 'chainId: ' + chainId + "      account: " + address.substring(0, 5) + "..")

  return {success:false};
}
export const connect = async () => {
  let {success} = await trying();
  if(success)
    return;
  const conf = configuration()
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: conf.params

  });
  await trying();

}