import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { darken, lighten } from "@mui/material/styles";
import moment from "moment";

const columns = [
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    flex: 3,
    valueGetter: (params) =>
      `${params.getValue(params.id, "first_name") || ""} ${
        params.getValue(params.id, "last_name") || ""
      }`,
  },
  {
    field: "added",
    headerName: "Time added",
    type: "dateTime",
    flex: 5,
    valueGetter: ({ value }) =>
      value && moment(new Date(value)).format("DD/MM/YYYY HH:mm"),
  },
  {
    field: "content",
    headerName: "Comments",
    type: "string",
    sortable: false,
    flex: 7,
  },
  {
    field: "user_id",
    type: "string",
    hide: true,
  },
];

function DataTable({ comments, userId }) {
  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          height: 400,
          width: 1,
          [`& .super-app-theme--${userId}`]: {
            bgcolor: (theme) =>
              getBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
            "&:hover": {
              bgcolor: (theme) =>
                getHoverBackgroundColor(
                  theme.palette.success.main,
                  theme.palette.mode
                ),
            },
          },
        }}
      >
        <DataGrid
          rows={comments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowClassName={(params) => `super-app-theme--${params.row.user_id}`}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No comments attached to this project
              </Stack>
            ),
          }}
        />
      </Box>
    </div>
  );
}

export default DataTable;
