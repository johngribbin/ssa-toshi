pragma solidity >=0.4.21 <0.6.0;

contract KuiperDatabase {
  address public owner;
  address[] public expertAccounts; // maintains a record of all experts
  mapping(address => bool) public isExpert; // used to restrict functions to use by experts

  struct Observation {
    address expert;
    bytes32 url;
    address[] confirmations; // addresses of those who "confirm" the observation
  }
  mapping(bytes32 => Observation) observations;
  bytes32[] public observationIds;

  constructor() public {
    owner = msg.sender;
    expertAccounts.push(msg.sender);
    isExpert[msg.sender] = true;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function addNewData(bytes32 _observationId, bytes32 _url) public {
    require(isExpert[msg.sender], "Sender is not an expert");
    observationIds.push(_observationId);
    Observation storage newObservation = observations[_observationId];
    newObservation.expert = msg.sender;
    newObservation.url = _url;
  }
}