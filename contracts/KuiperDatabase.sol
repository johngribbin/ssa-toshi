pragma solidity >=0.4.21 <0.6.0;

contract KuiperDatabase {
  event NewObservation(address indexed _expert, uint indexed _observationId);
  event NewConfirmation(address indexed _observer, uint indexed _observationId);

  address public owner;
  address[] public expertAccounts; // maintains a record of all experts
  mapping(address => bool) public isExpert; // used to restrict functions to use by experts
  uint observationNonce; // used to provide each observation with a unique observationId
  mapping(address => uint) public confirmationCount; // used to determine how many onbservations each amateur has confirmed

  struct Observation {
    address expert;
    string url;
    address[] confirmations; // addresses of those who "confirm" the observation
  }
  mapping(uint => Observation) observations;
  
  constructor() public {
    owner = msg.sender;
    expertAccounts.push(msg.sender);
    isExpert[msg.sender] = true;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function addNewObservation(string memory _url) public {
    require(isExpert[msg.sender], "Sender is not an expert");
    observationNonce += 1;
    Observation storage newObservation = observations[observationNonce];
    newObservation.expert = msg.sender;
    newObservation.url = _url;
    emit NewObservation(msg.sender, observationNonce);
  }

  function confirmObservation(uint _observationId) public {
    // obtain the specific observation using the observation ID.
    Observation storage observation = observations[_observationId];
    // prevent expert from confirming their own observation
    require(observation.expert != msg.sender, "Expert is not permitted to confirm their own observations");
    // add address of observer to the confirmations array for observation
    observation.confirmations.push(msg.sender);
    // increment the amateurs confirmation count by 1
    confirmationCount[msg.sender] += 1;
    emit NewConfirmation(msg.sender, _observationId);
  }

  function getObservationCount() public view returns (uint) {
    // returns total number of observations
    return observationNonce;
  }

  function getObservation(uint _observationId) public view returns (address expert, string memory url, address[] memory confirmations) {
    Observation storage observation = observations[_observationId];

    return (observation.expert, observation.url, observation.confirmations);
  }

  function getExpertCount() public view returns (uint) {
    return expertAccounts.length;
  }

  function getExpertAddress(uint _index) public view returns (address) {
    return expertAccounts[_index];
  }

  function promoteAmateur(address _amateur) public {
    require(confirmationCount[_amateur] >= 3, "Amatuer does not have at least 3 confirmed conservations");
    // add the amatrus address to the expert accounts array
    expertAccounts.push(_amateur);
    isExpert[_amateur] = true;
  }
}