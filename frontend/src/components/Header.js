import React from "react";

export default function Header({ address, balance }) {
  return (
    <section className="header__wrapper">
      <header className="header__header">SSAtoshi</header>
      <p className="header__copy">Your Address = {address}</p>
      <p className="header__copy">Your Balance = {balance} ETH</p>
    </section>
  );
}
