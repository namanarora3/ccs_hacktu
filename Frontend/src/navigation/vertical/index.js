// ** Icon imports
import LoginIcon from 'mdi-material-ui/Login'
import TableIcon from 'mdi-material-ui/Table'
import CubeOutlineIcon from 'mdi-material-ui/CubeOutline'
import HomeOutlineIcon from 'mdi-material-ui/HomeOutline'
import FormatLetterCaseIcon from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutlineIcon from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutlineIcon from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutlineIcon from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutlineIcon from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtendedIcon from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = (userRole) => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    if(localStorage.getItem('admin')=="true"){
      userRole="admin"
    }
    else
    userRole="user"
  }
  const commonItems = [
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Map View',
      icon: CubeOutlineIcon,
      path: '/map-view'
    },
    {
      title: 'Forum',
      icon: GoogleCirclesExtendedIcon,
      path: '/forum'
    },
    {
      title: 'Alert Display',
      icon: FormatLetterCaseIcon,
      path: '/alert-display'
    },
  ];

  const adminItems = [
    // Add admin-specific items here
    {
      title: 'Dashboard',
      icon: HomeOutlineIcon,
      path: '/'
    },
    {
      title: 'Create Alert',
      icon: FormatLetterCaseIcon,
      path: '/alert'
    },
  ];

  const userItems = [
    // Add user-specific items here
    {
      title: 'Add Issue',
      icon: FormatLetterCaseIcon,
      path: '/add-issue'
    },
    {
      title: 'User Page',
      icon: CreditCardOutlineIcon,
      path: '/user-page'
    }
  ];

  return [...(userRole === 'admin' ? adminItems : userItems),...commonItems];
}

export default navigation;
