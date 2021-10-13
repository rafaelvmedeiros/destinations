import * as _ from "lodash";
import isArrayEmpty from "../util/validate";

function associateContractIdToUnit(data) {
  return data.reduce((newItem, currentItem) => {
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
}

function checkIfContractHasUnit(agroupedUnits, header) {
  return header.reduce((newHeader, currentHeader) => {
    const unitHasSameSourceContract = agroupedUnits.find(
      (unit) => unit.sourceContractId === currentHeader.sourceContractId
    );

    if (
      !unitHasSameSourceContract ||
      unitHasSameSourceContract.sourceContractId !==
        currentHeader.sourceContractId
    ) {
      return newHeader.concat("-");
    }

    return newHeader.concat(
      unitHasSameSourceContract.allocatedPower
        ? unitHasSameSourceContract.allocatedPower
        : "-"
    );
  }, []);
}

function concatUnits(data, header) {
  return data.reduce(
    (newUnit, currentUnit, _, array) => {
      const contracts = checkIfContractHasUnit(array, header);

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
}

export function getAllocatedPowerByUnit(agroupedByState, header) {
  const agroupedUnits = associateContractIdToUnit(agroupedByState);
  const unitByGroup = _.groupBy(agroupedUnits, "unitName");

  return Object.values(unitByGroup).reduce((newItem, currentItem) => {
    const unit = concatUnits(currentItem, header);

    if (Object.keys(unit).length <= 0) return newItem;

    return newItem.concat(unit);
  }, []);
}
