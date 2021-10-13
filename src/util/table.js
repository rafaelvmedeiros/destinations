import * as _ from "lodash";
import isArrayEmpty from "../util/validate";
import { formatToBRL, formatWithoutBRL } from "./format";

import { getAllocatedPowerByUnit } from "./unit";

const states = [
  "Espírito Santo",
  "Maranhão",
  "Minas Gerais",
  "Rio de Janeiro",
  "Pará",
  "São Paulo",
];

function getInitialsOfState(state) {
  const states = {
    "Rio de Janeiro": "DISTRIBUIÇÃO RJ (MWh)",
    "São Paulo": "DISTRIBUIÇÃO SP (MWh)",
    "Minas Gerais": "DISTRIBUIÇÃO MG (MWh)",
    Pará: "DISTRIBUIÇÃO PR (MWh)",
    Maranhão: "DISTRIBUIÇÃO MA (MWh)",
    "Espírito Santo": "DISTRIBUIÇÃO ES (MWh)",
  };

  return states[state];
}

function createHeader(data) {
  return data.map((item) => ({
    sourceName: item.sourceName,
    availablePower: `${formatToBRL(item.availablePower)} MW/h`,
    sourceContractId: item.sourceContractId,
  }));
}

function getAllocatedPowerByContract(data, states) {
  return data.map((contract) => {
    const selectedContract = states.find(
      (state) => state.sourceContractId === contract.sourceContractId
    );

    if (!selectedContract) return "-";
    return formatWithoutBRL(selectedContract.allocatedPower);
  }, []);
}

function agroupByState(contracts, state) {
  return contracts.reduce((newContract, currentContract) => {
    const destinationExists = currentContract.destinationStates.find(
      (destination) => destination.stateName === state
    );

    if (!destinationExists) return newContract;

    return newContract.concat({
      ...destinationExists,
      sourceContractId: currentContract.sourceContractId,
      destinations: currentContract.destinations,
    });
  }, []);
}

function createColumns(contracts, header) {
  return states.reduce((newState, currentState) => {
    const agroupedByState = agroupByState(contracts, currentState);
    if (isArrayEmpty(agroupedByState)) return newState;

    const units = getAllocatedPowerByUnit(agroupedByState, header);

    const allocatedContracts = getAllocatedPowerByContract(
      header,
      agroupedByState
    );

    const selectedState = {
      stateName: getInitialsOfState(currentState),
      icms_value: 0,
      cost: 0,
      deficit: 0,
      allocatedContracts,
      units,
    };

    return newState.concat(selectedState);
  }, []);
}

function createTable(data) {
  const header = createHeader(data);
  const columns = createColumns(data, header);

  return { header, columns };
}

export default createTable;
