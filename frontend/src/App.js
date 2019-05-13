import React, { Component, useState, useEffect } from "react";
import Header from "./components/Header";
import { ethers } from "ethers";
let provider = ethers.getDefaultProvider("rinkeby");

function App() {
  const [wallet, setWallet] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  // acts as component did mount
  useEffect(() => {
    if (localStorage.getItem("kuiper-wallet")) {
      retrieveWallet();
    } else {
      createWallet();
    }
  }, []);

  const createWallet = async () => {
    // let defaultProvider = ethers.getDefaultProvider("rinkeby");
    // await setProvider(defaultProvider);

    let randomWallet = ethers.Wallet.createRandom();
    let privateKey = randomWallet.signingKey.privateKey;
    let walletWithProvider = new ethers.Wallet(privateKey, provider);
    //add wallet to app state
    setWallet(walletWithProvider);
    setAddress(walletWithProvider.signingKey.address);

    let balance = await provider.getBalance(
      walletWithProvider.signingKey.address
    );
    let etherString = await ethers.utils.formatEther(balance);
    setBalance(etherString);

    // Put wallet in local storage
    localStorage.setItem("kuiper-wallet", JSON.stringify(walletWithProvider));
  };

  const retrieveWallet = async () => {
    // let defaultProvider = ethers.getDefaultProvider("rinkeby");
    // await setProvider(defaultProvider);
    // retrieve wallet as json
    let jsonWalletWithProvider = localStorage.getItem("kuiper-wallet");
    let walletWithProvider = JSON.parse(jsonWalletWithProvider);
    //add wallet to app state
    setWallet(walletWithProvider);
    setAddress(walletWithProvider.signingKey.address);

    let balance = await provider.getBalance(
      walletWithProvider.signingKey.address
    );
    let etherString = await ethers.utils.formatEther(balance);
    setBalance(etherString);
  };

  return (
    <section className="app__wrapper">
      <Header address={address} balance={balance} />
    </section>
  );
}

export default App;
