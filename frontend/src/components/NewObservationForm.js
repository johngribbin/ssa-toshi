import React, { useState } from "react";

export default function NewObservationForm({
  contractWithSigner,
  loadContractState
}) {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitObservation = async () => {
    if (!url) {
      alert("Please enter a valid observation!");
    } else {
      setIsSubmitting(true);

      setUrl("");

      let observationCountBefore = await contractWithSigner.getObservationCount();

      console.log(`observation count before = ${observationCountBefore}`);

      let tx = await contractWithSigner.addNewObservation(url);

      console.log(tx.hash);

      await tx.wait();

      let observationCountAfter = await contractWithSigner.getObservationCount();

      console.log(`observation count after = ${observationCountAfter}`);

      setIsSubmitting(false);
      loadContractState();
    }
  };

  return (
    <section className="observation-form__wrapper">
      <form
        className="observation-form__form"
        onSubmit={event => event.preventDefault()}
      >
        <h1 className="observation-form__header">Submit New Observation</h1>
        <label className="observation-form__label">
          Image Url:
          <input
            className="observation-form__input"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </label>
        {isSubmitting ? (
          <div className="observation-form__button">Please Wait...</div>
        ) : (
          <div className="observation-form__button" onClick={submitObservation}>
            Submit Observation
          </div>
        )}
      </form>
    </section>
  );
}
