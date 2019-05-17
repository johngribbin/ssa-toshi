import React, { useState } from "react";

export default function PromoteAmateurForm({
  contractWithSigner,
  loadContractState
}) {
  const [address, setAddress] = useState("");
  const [isPromoting, setIsPromoting] = useState(false);

  const graduateAmateur = async address => {
    if (!address) {
      alert("Please enter a valid ethereum address!");
    } else {
      setIsPromoting(true);

      let tx = await contractWithSigner.promoteAmateur(address);

      setAddress("");

      console.log(tx.hash);

      await tx.wait();

      alert(`${address} is now an expert!`);

      setIsPromoting(false);
      loadContractState();
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
        {isPromoting ? (
          <div>Please Wait...</div>
        ) : (
          <div
            className="observation-form__button"
            onClick={() => graduateAmateur(address)}
          >
            Promote Amateur
          </div>
        )}
      </form>
    </section>
  );
}
