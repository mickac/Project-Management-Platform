import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {
        field: 'added',
        headerName: 'Time added',
        type: 'datetime',
        flex: 5,
    },    
    {
        field: 'fullName',
        headerName: 'Full name',
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
        sortable: false,
        flex: 7,
    },

];

function DataTable(comments) {
  const commentSection = Object.values(comments)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={commentSection}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default DataTable