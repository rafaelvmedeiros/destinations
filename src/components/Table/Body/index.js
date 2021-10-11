import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { keyframes } from "styled-components";

export default function Body({ state }) {
  const [open, setOpen] = React.useState(false);

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
                    <TableRow key={unit.unitName}>
                      <TableCell component="th" scope="row">
                        {unit.unitName}
                      </TableCell>
                      <TableCell>{unit.icms_value}</TableCell>
                      <TableCell>{unit.cost}</TableCell>
                      <TableCell align="right">{unit.deficit}</TableCell>
                      {unit.contracts.map((contract) => (
                        <TableCell align="right">{contract}</TableCell>
                      ))}
                    </TableRow>
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

Body.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
