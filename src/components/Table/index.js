import React, { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import Header from "../../components/Table/Header";
import Body from "../../components/Table/Body";

import getSourcers from "../../util/sources";
import createTable from "../../util/table";

function TableUI() {
  const [contracts, setContracts] = useState({});

  useEffect(() => {
    async function getContracts() {
      const sources = await getSourcers();
      const data = createTable(sources);

      setContracts(data);
    }

    getContracts();
  }, []);

  return Object.keys(contracts).length ? (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <Header header={contracts?.header} />
        <TableBody>
          {contracts?.columns.map((state) => (
            <Body key={state.stateName} state={state} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
}

export default TableUI;