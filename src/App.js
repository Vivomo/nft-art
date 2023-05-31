import './App.css';
import { ethers } from 'ethers';

import Lock from './artifacts/contracts/Lock.sol/Lock.json';

const deployedAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

function App() {
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner()

    const address = await signer.getAddress();
    console.log(address)
  }

  const read = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);

    const lock = new ethers.Contract(deployedAddress, Lock.abi, provider);
    const msg = await lock.message();
    console.log(msg)
  }

  const write = async (e) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const lock = new ethers.Contract(deployedAddress, Lock.abi, signer);
    const msg = e.target.value
    const transaction = await lock.connect(signer).setMessage(msg);
    const tx = await transaction.wait(1);
    console.log(tx.events, tx.events[0].args)
  }
  return (
    <div className="App">
      <button onClick={connect}>connect wallet</button>
      <button onClick={read}>read msg</button>
      <input onBlur={write} placeholder="write msg"/>
    </div>
  );
}

export default App;
