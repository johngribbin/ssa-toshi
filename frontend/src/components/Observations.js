import React, { useState } from "react";

export default function Observations({
  address,
  balance,
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

  const trustColors = observationCount => {
    if (observationCount <= 1) {
      return "red";
    }
    if (observationCount === 2 || observationCount === 3) {
      return "orange";
    }
    if (observationCount >= 4) {
      return "#20c20e";
    }
  };

  const renderObservations = () => {
    // sort the observations by pulling those with least confirmatons to the top
    observations.sort(
      (observationA, observationB) =>
        observationA.confirmations.length - observationB.confirmations.length
    );

    return observations.map(observation => {
      if (observation.url)
        return (
          <div
            key={observation.url}
            style={{
              border: `2px solid ${trustColors(
                observation.confirmations.length
              )}`
            }}
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
            <p>
              Trust Level ={" "}
              {trustLevels[observation.confirmations.length]
                ? trustLevels[observation.confirmations.length]
                : "Highest Confidence"}
            </p>

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

  // Need a function here to render 'You Observed!' or a tick symbol if amateur or expert has already observed it

  const confirmObservation = async (observationId, expertAddress) => {
    if (expertAddress === address) {
      alert("You cannot confirm your own observations!");
      return;
    }
    if (balance === 0.0) {
      alert(
        "Please send some Rinkeby Test Net Ether to your address found at top of the page"
      );
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
