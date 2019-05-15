import React, { useState } from "react";

export default function PromoteAmateurForm({ contractWithSigner }) {
  const [address, setAddress] = useState("");

  const graduateAmateur = async address => {
    if (!address) {
      alert("Please enter a valid ethereum address!");
    } else {
      let tx = await contractWithSigner.promoteAmateur(address);

      setAddress("");

      console.log(tx.hash);

      await tx.wait();

      alert(`${address} is now an expert!`);
    }
  };

  return (
    <section className="observation-form__wrapper">
      <form
        className="observation-form__form"
        onSubmit={event => event.preventDefault()}
      >
        <h1 className="observation-form__header">Promote Amateur to Expert</h1>
        <label className="observation-form__label">
          Address:
          <input
            className="observation-form__input"
            value={address}
            onChange={event => setAddress(event.target.value)}
          />
        </label>
        <div
          className="observation-form__button"
          onClick={() => graduateAmateur(address)}
        >
          Submit Amateur
        </div>
      </form>
    </section>
  );
}
