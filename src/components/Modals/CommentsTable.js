import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 3,
    valueGetter: (params) =>
        `${params.getValue(params.id, 'first_name') || ''} ${
        params.getValue(params.id, 'last_name') || ''
        }`,
    },
    {
    field: 'content',
    headerName: 'Comments',
    type: 'string',
    flex: 7,
    },

];

const rows = [
  { id: 1, last_name: 'Snow', first_name: 'Jon', content: "Hello"},
  { id: 2, last_name: 'Lannister', first_name: 'Cersei', content: "there"},
];

function DataTable(comments) {
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default DataTable