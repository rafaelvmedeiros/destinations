import React, { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import Header from "../../components/Table/Header";
import Body from "../../components/Table/Body";

import { getContracts, getDestinations } from "../../util/sources";
import createTable from "../../util/table";

function TableUI() {
  const [contracts, setContracts] = useState({});

  async function fetchData() {
    const contracts = await getContracts();
    const destinations = await getDestinations();
    const data = createTable({ contracts, destinations });
    setContracts(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function updateContracts(contract) {
    const listOfContracts = [
      ...contracts.columns.map((item) => {
        if (item.stateName === contract.stateName) {
          return {
            ...contract,
          };
        }
        return item;
      }),
    ];

    setContracts({ ...contracts, columns: listOfContracts });
  }

  function filterUnitsByIcms(icms) {
    if (!icms) {
      return fetchData();
    }

    const filteredUnitsByIcms = contracts.columns.reduce(
      (newContract, currentContract) => {
        const filtered = currentContract.units.filter((unit) => {
          return unit.icms_value === icms.trim();
        });

        if (Array.isArray(filtered) && filtered.length <= 0) {
          return newContract;
        }
        return newContract.concat({ ...currentContract, units: filtered });
      },
      []
    );

    setContracts({ ...contracts, columns: filteredUnitsByIcms });
  }

  function filterUnitsByCost(cost) {
    if (!cost) {
      return fetchData();
    }

    const filteredUnitsByIcms = contracts.columns.reduce(
      (newContract, currentContract) => {
        const filtered = currentContract.units.filter((unit) => {
          return unit.cost === cost.trim();
        });

        if (Array.isArray(filtered) && filtered.length <= 0) {
          return newContract;
        }
        return newContract.concat({ ...currentContract, units: filtered });
      },
      []
    );

    setContracts({ ...contracts, columns: filteredUnitsByIcms });
  }

  function filterUnitsByDeficit(deficit) {
    if (!deficit) {
      return fetchData();
    }

    const filteredUnitsByIcms = contracts.columns.reduce(
      (newContract, currentContract) => {
        const filtered = currentContract.units.filter((unit) => {
          return unit.deficit === deficit.trim();
        });

        if (Array.isArray(filtered) && filtered.length <= 0) {
          return newContract;
        }
        return newContract.concat({ ...currentContract, units: filtered });
      },
      []
    );

    setContracts({ ...contracts, columns: filteredUnitsByIcms });
  }

  return Object.keys(contracts).length ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <Header
          header={contracts.header}
          filterUnitsByIcms={filterUnitsByIcms}
          filterUnitsByCost={filterUnitsByCost}
          filterUnitsByDeficit={filterUnitsByDeficit}
        />
        {Object.keys(contracts.columns).length ? (
          <TableBody>
            {contracts?.columns.map((state) => (
              <Body
                key={state.stateName}
                state={state}
                updateContracts={updateContracts}
              />
            ))}
          </TableBody>
        ) : (
          "Nenhum resultado encontrado!"
        )}
      </Table>
    </TableContainer>
  ) : null;
}

export default TableUI;
