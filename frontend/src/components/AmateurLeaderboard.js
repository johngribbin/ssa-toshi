import React from "react";

export default function AmateurLeaderboard({
  confirmationCounts,
  contractWithSigner
}) {
  const renderRows = () => {
    // arrang data in by confirmation count in ascending order
    confirmationCounts.sort(
      (observerA, observerB) =>
        Object.values(observerB) - Object.values(observerA)
    );

    return confirmationCounts.map(confirmationCountObj => {
      return (
        <tr key={Object.keys(confirmationCountObj)}>
          <td>{Object.keys(confirmationCountObj)}</td>
          <td>{Object.values(confirmationCountObj)}</td>
          <td
            style={
              Object.values(confirmationCountObj) >= 3
                ? { color: "#20c20e" }
                : { color: "red" }
            }
          >
            {Object.values(confirmationCountObj) >= 3 ? "Yes" : "No"}
          </td>
        </tr>
      );
    });
  };

  return (
    <section className="amateur-leaderboard__wrapper">
      <table className="amateur-leader__table">
        <thead>
          <tr>
            <th colSpan="3">Amateur Leaderboard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address</td>
            <td>Confirmation Count</td>
            <td>Promotion Qualified</td>
          </tr>
          {renderRows()}
        </tbody>
      </table>
    </section>
  );
}
