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
  const [data, setData] = useState(null);
  const columns = [
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 300 }
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token=localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8001/alerts/',{
          headers:{
            'Authorization':`Token ${token}`
          }
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  function createData(title, description) {
    return { title, description }
  }
  const rows = [
    // Add more rows as needed
  ]
  if(data!=null){
    console.log(data.data)
    data.data.map(e=>{
      rows.push(createData(e.title,e.discription))
    })
  }
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  if(data==null)
  return(<p>Loading...</p>)
  else{
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
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
   );
  }
}
export default TableStickyHeader
