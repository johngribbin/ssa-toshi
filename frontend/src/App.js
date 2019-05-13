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

  // create a wallet and store in local storage
  const createWallet = async () => {
    let randomWallet = ethers.Wallet.createRandom();
    let privateKey = randomWallet.signingKey.privateKey;
    let walletWithProvider = new ethers.Wallet(privateKey, provider);
    //add wallet to app state
    setWallet(walletWithProvider);
    setAddress(walletWithProvider.signingKey.address);

    let balance = await provider.getBalance(
      walletWithProvider.signingKey.address
    );
    let etherString = ethers.utils.formatEther(balance);
    setBalance(etherString);

    // store wallet in local storage
    localStorage.setItem("kuiper-wallet", JSON.stringify(walletWithProvider));
  };

  // retrieve wallet from local storage
  const retrieveWallet = async () => {
    // retrieve wallet as json
    let jsonWalletWithProvider = localStorage.getItem("kuiper-wallet");
    let walletWithProvider = JSON.parse(jsonWalletWithProvider);
    //add wallet to app state
    setWallet(walletWithProvider);
    setAddress(walletWithProvider.signingKey.address);

    let balance = await provider.getBalance(
      walletWithProvider.signingKey.address
    );
    let etherString = ethers.utils.formatEther(balance);
    setBalance(etherString);
  };

  return (
    <section className="app__wrapper">
      <Header address={address} balance={balance} />
    </section>
  );
}

export default App;
