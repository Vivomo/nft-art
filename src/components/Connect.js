import { ethers } from "ethers";
import { connect } from '../service/connection-service'


import 'react-notifications-component/dist/theme.css'

function Connect() {

  const connectWallet = async () => {
    await connect()
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    //
    // await provider.send("eth_requestAccounts", []);
    //
    // const signer = provider.getSigner()
    //
    // const addr = await signer.getAddress();
  }
  return (
    <div>


      <a href="javascript:void(0);" onClick={connectWallet}>
        connect
      </a>


    </div>

  )
}

export default Connect
