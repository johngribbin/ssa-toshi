import React, { useState } from "react";

export default function Observations({
  address,
  contractWithSigner,
  observations,
  loadContractState
}) {
  const [isConfirming, setIsConfirming] = useState(false);

  const renderObservations = () => {
    return observations.map(observation => {
      if (observation.url)
        return (
          <div key={observation.url} className="observation__wrapper">
            <div className="observation__image-container">
              <img
                className="observation__image"
                src={observation.url}
                alt="stars"
              />
            </div>
            <p>Submitted by {observation.expert.substring(0, 7)}...</p>
            <p>Confirmations = {observation.confirmations.length}</p>

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
