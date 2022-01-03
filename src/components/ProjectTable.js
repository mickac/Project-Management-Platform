import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import React from 'react';


const newItems = this.state.projectList.filter(
    (item) => item.status === this.state.status
  );

class ProjectTable extends React.Component {
    render() {
        return(
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell>Project name</TableCell>
                <TableCell align="right">Start date</TableCell>
                <TableCell align="right">End date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Operations</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {newItems.map((item) =>  (
                <TableRow
                    key={ item.id }
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    { item.title }
                    </TableCell>
                    <TableCell align="right">{ item.start_date }</TableCell>
                    <TableCell align="right">{ item.end_date }</TableCell>
                    <TableCell align="right">{ this.selectStatus(item.status) }</TableCell>
                    <TableCell align="right">
                    <DropdownButton id="dropdown-basic-button" title="More options">
                        <Dropdown.Item href="#/action-1">Edit Project</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Add Comment</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Details</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Delete Project</Dropdown.Item>
                    </DropdownButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            </TableContainer>
        )
    }
}
export default ProjectTable;