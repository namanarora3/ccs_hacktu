// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TableStickyHeader from '../../components/alert';

const AlertDisplay= () => {
  return (

        <Card>
          <CardHeader title='Alert Display' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>

)
};

export default AlertDisplay;