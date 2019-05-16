import React, { useState } from "react";

export default function Observations({
  address,
  contractWithSigner,
  observations,
  loadContractState
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  const trustLevels = {
    0: "Untrusted",
    1: "Neutral",
    2: "Plausible",
    3: "Verified",
    4: "High Confidence",
    5: "Highest Confidence"
  };

  const renderObservations = () => {
    // sort the observations by pulling those with least confirmatons to the top
    observations.sort(
      (observationA, observationB) =>
        observationA.confirmations.length - observationB.confirmations.length
    );

    return observations.map(observation => {
      let borderColor = "";

      if (observation.confirmations.length <= 2) {
        borderColor = "red";
      }
      if (
        observation.confirmations.length === 3 ||
        observation.confirmations.length === 4
      ) {
        borderColor = "orange";
      }
      if (observation.confirmations.length >= 5) {
        borderColor = "#20c20e";
      }

      if (observation.url)
        return (
          <div
            key={observation.url}
            style={{ border: `2px solid ${borderColor}` }}
            className="observation__wrapper"
          >
            <div className="observation__image-container">
              <img
                className="observation__image"
                src={observation.url}
                alt="stars"
              />
            </div>
            <p>Submitted by {observation.expert.substring(0, 7)}...</p>
            <p>Confirmations = {observation.confirmations.length}</p>
            <p>Trust Level = {trustLevels[observation.confirmations.length]}</p>

            {isConfirming ? (
              <div className="observation__confirm-button">Please Wait...</div>
            ) : (
              <div
                className="observation__confirm-button"
                onClick={() =>
                  confirmObservation(
                    observation.observationId,
                    observation.expert
                  )
                }
              >
                Confirm Observation
              </div>
            )}
          </div>
        );
    });
  };

  // const checkUsersObservations = confirmations => {
  //   confirmations.map(addressInConfirmations => {
  //     if (address === addressInConfirmations) return true;
  //   });
  // };

  const confirmObservation = async (observationId, expertAddress) => {
    if (expertAddress === address) {
      alert("You cannot confirm your own observations!");
      return;
    } else {
      setIsConfirming(true);

      let tx = await contractWithSigner.confirmObservation(observationId);

      console.log(tx.hash);

      await tx.wait();

      setIsConfirming(false);

      loadContractState();
    }
  };

  return (
    <section className="observations__wrapper">{renderObservations()}</section>
  );
}
