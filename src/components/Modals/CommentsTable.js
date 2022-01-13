import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';


const columns = [
    {
        field: 'added',
        headerName: 'Time added',
        type: 'datetime',
        flex: 5,
    },    
/*    {
        field: 'fullName',
        headerName: 'Full name',
        sortable: false,
        flex: 3,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'first_name') || ''} ${
            params.getValue(params.id, 'last_name') || ''
            }`,
    }, */
    {
      field: 'user_id',
      headerName: 'Full name',
      sortable: false,
      flex: 3,
  },
    {
        field: 'content',
        headerName: 'Comments',
        type: 'string',
        sortable: false,
        flex: 7,
    },

];

function DataTable({comments}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={comments}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No comments attached to this project
            </Stack>
          )}}
      />
    </div>
  );
}

export default DataTable