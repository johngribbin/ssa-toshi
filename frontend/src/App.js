import React, { Component } from "react";
import Header from "./components/Header";
import NewObservationForm from "./components/NewObservationForm";
import PromoteAmateurForm from "./components/PromoteAmateurForm";
import AmateurLeaderboard from "./components/AmateurLeaderboard";
import Observations from "./components/Observations";
import { ethers } from "ethers";
import abi from "./kuiperDatabaseAbi";
const contractAddress = "0xBE05D42Cc94a9D80354829ac1686e8123c6ab2Fd";
let provider = ethers.getDefaultProvider("rinkeby");
let contract = new ethers.Contract(contractAddress, abi, provider);

class App extends Component {
  state = {
    wallet: {},
    address: "",
    balance: "",
    contractWithSigner: {},
    isExpert: false,
    observations: [],
    expertCount: "",
    confirmationCounts: []
  };

  async componentDidMount() {
    if (localStorage.getItem("ssa-private-key")) {
      await this.retrieveWallet();
      await this.loadContractState();
    } else {
      await this.createWallet();
      await this.loadContractState();
    }
  }

  // create a wallet and store in local storage
  createWallet = async () => {
    // create new wallet and obtain private key
    let randomWallet = ethers.Wallet.createRandom();
    console.log(randomWallet.mnemonic); // used to add mnemonic to truffle config for deployment
    let privateKey = randomWallet.signingKey.privateKey;
    // add private key to local storage
    localStorage.setItem("ssa-private-key", privateKey);
    // create wallet with provider
    let walletWithProvider = new ethers.Wallet(privateKey, provider);

    // get balance of wallet
    let balance = await provider.getBalance(
      walletWithProvider.signingKey.address
    );
    let etherString = ethers.utils.formatEther(balance);
    // add wallet and wallet info to app state
    this.setState({
      wallet: walletWithProvider,
      address: walletWithProvider.signingKey.address,
      balance: etherString
    });
  };

  // retrieve wallet from local storage
  retrieveWallet = async () => {
    // retrieve private key from local storage
    let privateKey = localStorage.getItem("ssa-private-key");

    let walletWithProvider = new ethers.Wallet(privateKey, provider);

    let balance = await provider.getBalance(
      walletWithProvider.signingKey.address
    );

    let etherString = ethers.utils.formatEther(balance);
    // add wallet and wallet info to app state
    this.setState({
      wallet: walletWithProvider,
      address: walletWithProvider.signingKey.address,
      balance: etherString
    });
  };

  loadContractState = async () => {
    let contractWithSigner = contract.connect(this.state.wallet);
    this.setState({ contractWithSigner });

    let isExpert = await contractWithSigner.isExpert(this.state.address);
    this.setState({ isExpert });

    let observationCount = await contractWithSigner.getObservationCount();
    let observations = [];
    for (let i = 0; i <= observationCount; i++) {
      let observation = await contractWithSigner.getObservation(i);
      observations.push({ ...observation, observationId: i });
    }

    this.setState({ observations });

    let expertCount = await contractWithSigner.getExpertCount();
    this.setState({ expertCount: Number(expertCount) });

    // update balance of wallet
    let balance = await provider.getBalance(
      this.state.wallet.signingKey.address
    );
    let etherString = ethers.utils.formatEther(balance);
    // add wallet and wallet info to app state
    this.setState({
      balance: Number(etherString)
    });

    this.getConfirmationCounts();
  };

  getConfirmationCounts = async () => {
    let { observations, contractWithSigner } = this.state;

    let allConfirmationAddresses = [];

    observations.map(observation => {
      observation.confirmations.map(address =>
        allConfirmationAddresses.push(address)
      );
    });

    let uniqueAddresses = [
      ...new Set(allConfirmationAddresses.map(item => item))
    ];

    let confirmationCounts = [];

    await Promise.all(
      uniqueAddresses.map(async address => {
        let isExpert = await contractWithSigner.isExpert(address);
        // only push amateurs as confirmation counts is used to redner the amateur leaderboard
        if (!isExpert) {
          let confirmationCount = await contractWithSigner.confirmationCount(
            address
          );
          confirmationCounts.push({ [address]: Number(confirmationCount) });
        }
      })
    );

    this.setState({ confirmationCounts });
  };

  render() {
    const {
      address,
      balance,
      contractWithSigner,
      isExpert,
      expertCount,
      observations,
      confirmationCounts
    } = this.state;

    const { loadContractState } = this;

    return (
      <section className="app__wrapper">
        <Header
          contractAddress={contractAddress}
          address={address}
          balance={balance}
        />
        {isExpert ? (
          <div className="expert-functions__wrapper">
            <NewObservationForm
              contractWithSigner={contractWithSigner}
              loadContractState={loadContractState}
            />
            <p style={{ alignSelf: "center" }}>
              You are 1 of {expertCount} experts!
            </p>
            <PromoteAmateurForm
              contractWithSigner={contractWithSigner}
              loadContractState={loadContractState}
            />
          </div>
        ) : null}
        <AmateurLeaderboard
          confirmationCounts={confirmationCounts}
          contractWithSigner={contractWithSigner}
        />
        <Observations
          address={address}
          balance={balance}
          contractWithSigner={contractWithSigner}
          observations={observations}
          loadContractState={loadContractState}
        />
      </section>
    );
  }
}

export default App;
