import 'react-notifications-component/dist/theme.css'
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { toArweave } from '../service/arweave-service';
const ConnectArweave = () => {

  const wallet = new ArweaveWebWallet({
    name:"Artist Studio",
    logo:"mylogo"
  })
  wallet.setUrl("arweave.app")
  wallet.keepPopup = true;

  const connectArweave = async () => {
    if(!wallet.connected){
      await wallet.connect();
      // toArweave("hello world");

    }else{
      wallet.disconnect();
    }
  }
  return (
    <div>
      <a href="javascript:;" onClick={connectArweave}>
        connectArweave
      </a>
    </div>
  )
}

export default ConnectArweave