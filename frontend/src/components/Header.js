import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Header({ address, balance }) {
  // const [balance, setBalance] = useState("");

  // useEffect(() => {
  //   if (provider) {
  //     provider.getBalance(address).then(balance => {
  //       // balance is a BigNumber (in wei); format is as a sting (in ether)
  //       let etherString = ethers.utils.formatEther(balance);

  //       setBalance(etherString);
  //       console.log("hello");
  //     });
  //   }
  // }, [address, provider]);

  return (
    <section className="header__wrapper">
      <header className="header__header">SSAtoshi</header>
      <p>Address = {address}</p>
      <p>Balance = {balance} ETH</p>
    </section>
  );
}
