import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavDropdown from './NavDropdown';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    marginLeft: 44
    // [theme.breakpoints.up('lg')]: {
    //   paddingLeft: 256
    // }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const contentRef = useRef(null);

  return (
    <div className={ classes.root }>
      <ToastContainer />
      {/* <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} /> */ }
      {/* <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      /> */}
      <div className={ classes.wrapper }>
        <div className={ classes.contentContainer }>
          <div className={ classes.content } ref={ contentRef }>
            <Outlet />
            <NavDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
