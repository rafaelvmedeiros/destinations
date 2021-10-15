import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

function Header({
  header,
  filterUnitsByIcms,
  filterUnitsByCost,
  filterUnitsByDeficit,
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Valor Total do ICMS"
              variant="outlined"
              onChange={(event) => {
                filterUnitsByIcms(event.target.value);
              }}
            />
          </Box>
        </TableCell>

        <TableCell align="left">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Custo"
              variant="outlined"
              onChange={(event) => {
                filterUnitsByCost(event.target.value);
              }}
            />
          </Box>
        </TableCell>

        <TableCell align="left">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Deficit"
              variant="outlined"
              onChange={(event) => {
                filterUnitsByDeficit(event.target.value);
              }}
            />
          </Box>
        </TableCell>

        {header?.map((item) => (
          <TableCell align="right">
            <span>
              <p>{item?.sourceName} </p>
              <p> {item?.availablePower} </p>
            </span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Header;
