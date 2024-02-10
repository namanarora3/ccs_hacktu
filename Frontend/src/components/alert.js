// ** React Imports
import React, { useState, useEffect  } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const TableStickyHeader = () => {
  // ** States
  const columns = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 300 }
  ]
  
  function createData(title, description) {
    return { title, description }
  }
  const rows = [
    // Add more rows as needed
    createData("Water Clog","Water clog in my area poses a serious threat, caus…s issue and safeguard our community's well-being."),
    createData("Light Not Working","Non-functional street lights in my area pose safet…ell-lit environment for residents and pedestrians")
  ]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const data= [];
  const fetchData = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://127.0.0.1:8001/issue/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    // const jsonData = await response.json();
    data=await response.json(); 
    data.map((e)=>{
      rows.push(createData(e.title,e.description))
    })
    const temp=createData('Hello','Test')
    rows.push(temp)
    console.log(rows)// Corrected to log jsonData
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
useEffect(() => {fetchData()}, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align='left' sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.title}>
                  {(columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align='left'>
                        {value}
                      </TableCell>
                    )
                  }))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   );
  }
export default TableStickyHeader
