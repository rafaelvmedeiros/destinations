import React from "react";

import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function Unit({ unit, onHandleAllocationPower }) {
  return (
    <TableRow key={unit.unitName}>
      <TableCell component="th" scope="row">
        {unit.unitName}
      </TableCell>
      <TableCell>{unit.icms_value}</TableCell>
      <TableCell>{unit.cost}</TableCell>
      <TableCell align="right">{unit.deficit}</TableCell>

      {unit.contracts.map((contract, index) => (
        <TableCell align="right">
          <TextField
            className="text-field"
            type="text"
            variant="outlined"
            disabled={false}
            value={contract}
            style={{ width: 100 }}
            size="small"
            onChange={(event) =>
              onHandleAllocationPower(event, unit.unitId, index)
            }
          />
        </TableCell>
      ))}
    </TableRow>
  );
}

export default Unit;
