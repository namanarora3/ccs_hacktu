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
  const commonItems = [
    {
      title: 'Dashboard',
      icon: HomeOutlineIcon,
      path: '/'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: LoginIcon,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutlineIcon,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutlineIcon,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Add Issue',
      icon: FormatLetterCaseIcon,
      path: '/add-issue'
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
    {
      title: 'Create Alert',
      icon: FormatLetterCaseIcon,
      path: '/alert'
    },
    {
      title: 'Admin Dashboard',
      icon: AccountCogOutlineIcon,
      path: '/admin-dashboard'
    },
  ];

  const adminItems = [
    // Add admin-specific items here
    {
      title: 'Admin Dashboard',
      icon: AccountCogOutlineIcon,
      path: '/admin-dashboard'
    },
  ];

  const userItems = [
    // Add user-specific items here
    {
      title: 'User Page',
      icon: CreditCardOutlineIcon,
      path: '/user-page'
    },
  ];

  return [...commonItems, ...(userRole === 'admin' ? adminItems : userItems)];
}

export default navigation;
