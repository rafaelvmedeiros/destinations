import * as _ from "lodash";
import isArrayEmpty from "../util/validate";
import formatBRL from "../util/format";

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
    availablePower: `R$ ${formatBRL(item.availablePower)} MW/h`,
    sourceContractId: item.sourceContractId,
  }));
}

function getAllocatedPowerByContract(data, states) {
  return data.map((contract) => {
    const selectedContract = states.find(
      (state) => state.sourceContractId === contract.sourceContractId
    );

    if (!selectedContract) return "-";
    return selectedContract.allocatedPower;
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

function getAllocatedPowerByUnit(agroupedByState, header) {
  const agroupedUnits = agroupedByState.reduce((newItem, currentItem) => {
    const { destinations } = currentItem;
    const destination = destinations.map((item) => {
      return {
        ...item,
        sourceContractId: currentItem.sourceContractId,
      };
    });

    if (isArrayEmpty(destination)) return newItem;
    return newItem.concat(destination);
  }, []);

  const sameUnit = _.groupBy(agroupedUnits, "unitName");

  return Object.values(sameUnit).reduce((newItem, currentItem) => {
    const unit = currentItem.reduce(
      (newUnit, currentUnit) => {
        const contracts = header.reduce((newHeader, currentHeader) => {
          if (currentUnit.sourceContractId !== currentHeader.sourceContractId) {
            return newHeader.concat("-");
          }

          return newHeader.concat(
            currentUnit.allocatedPower ? currentUnit.allocatedPower : "-"
          );
        }, []);

        return {
          unitName: currentUnit.unitName,
          icms_value: newUnit.icms_value + currentUnit.ICMSCost,
          cost: 123.9,
          deficit: 12,
          contracts,
        };
      },
      {
        unitName: "",
        icms_value: 232.0,
        cost: 123.9,
        deficit: 12,
        contracts: [],
      }
    );

    if (Object.keys(unit).length <= 0) return newItem;

    return newItem.concat(unit);
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
