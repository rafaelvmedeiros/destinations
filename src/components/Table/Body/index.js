import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { formatWithoutBRL, parseStringToFloat } from "../../../util/format";

import Unit from "./Unit";

export default function Body({ state, updateContracts }) {
  const [open, setOpen] = React.useState(false);

  function onHandleAllocationPower(
    event,
    selectedUnitId,
    selectedContractIndex
  ) {
    if (!event.target) {
      return;
    }

    if (event.target.value.match(/[a-zA-Z]/g)) {
      alert("Apenas números são aceitos");
      return;
    }

    const allocationValue = parseStringToFloat(event.target.value);

    const units = state.units.map((unit) => {
      if (unit.unitId === selectedUnitId) {
        const contracts = unit.contracts.map((contract, index) => {
          if (index === selectedContractIndex) {
            contract = allocationValue;
          }
          return contract;
        });

        const cost = parseStringToFloat(unit.cost.toString());
        const deficit = formatWithoutBRL(cost - allocationValue);

        return {
          ...unit,
          deficit,
          cost,
          contracts,
        };
      }
      return unit;
    });

    updateContracts({ ...state, units });
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell />

        <TableCell component="th" scope="row">
          {state?.stateName}
        </TableCell>
        <TableCell align="right">{state?.icms_value}</TableCell>
        <TableCell align="right">{state?.cost}</TableCell>
        <TableCell align="right">{state?.deficit}</TableCell>

        {state.allocatedContracts.map((contract) => (
          <TableCell align="left">{contract}</TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 150 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="large" aria-label="purchases">
                <TableBody>
                  {state?.units.map((unit) => (
                    <Unit
                      unit={unit}
                      onHandleAllocationPower={onHandleAllocationPower}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
