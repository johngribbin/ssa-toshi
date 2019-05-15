export default [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "expertAccounts",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "confirmationCount",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "isExpert",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_expert",
        type: "address"
      },
      {
        indexed: true,
        name: "_observationId",
        type: "uint256"
      }
    ],
    name: "NewObservation",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_observer",
        type: "address"
      },
      {
        indexed: true,
        name: "_observationId",
        type: "uint256"
      }
    ],
    name: "NewConfirmation",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_url",
        type: "string"
      }
    ],
    name: "addNewObservation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_observationId",
        type: "uint256"
      }
    ],
    name: "confirmObservation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getObservationCount",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_observationId",
        type: "uint256"
      }
    ],
    name: "getObservation",
    outputs: [
      {
        name: "expert",
        type: "address"
      },
      {
        name: "url",
        type: "string"
      },
      {
        name: "confirmations",
        type: "address[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getExpertCount",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_index",
        type: "uint256"
      }
    ],
    name: "getExpertAddress",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_amateur",
        type: "address"
      }
    ],
    name: "promoteAmateur",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
