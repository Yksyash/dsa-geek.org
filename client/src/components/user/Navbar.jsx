import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../../assets/logo.png';
import { Await, Navigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token is present
};

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [alertContent, setAlertContent] = useState('');
  const [alert, setAlert] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <section>
      <AppBar class='tw-relative tw-right-0 tw-left-0 tw-top-0 md:tw-relative tw-max-w-full tw-border-slate-800 tw-sticky tw-bg-[#393737] tw-z-1`'>
        <Container maxWidth="xl">
          <Toolbar disableGutters >
            <div class='tw-w-8'>
             <a href="/" > <img src={Logo} alt="Logo" class='tw-object-contain' onClick={()=>navigate('/')} /> </a>
            </div>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { md: 'flex', xs: 'none' },
                fontFamily: 'monospace',
                fontWeight: 200,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              dsaGeek
            </Typography>


            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
            <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  }}
                  >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                    ))}
                    </Menu> */}
            </Box>
            {/* <img src={Logo} alt="Logo" class='tw-h-1/2 tw-w-10 md:tw-hidden xs:tw-block'/> */}

            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          }}
          >
          LOGO
          </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
              {page}
              </Button>
              ))} */}
              </Box>

            {isLoggedIn() ?

              (<Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src='' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button textAlign="center" onClick={async () => {
                        await fetch('http://localhost:3000/logout', {
                          method: 'POST'
                        })
                          .then(res => res.json())
                          .then(data => {
                            if (data.message === 'Logout Successful') {
                              localStorage.removeItem('token');
                              // localStorage.removeItem('email')
                              navigate('/');
                            }
                            // <Alert>{data.message}</Alert>
                            setAlertContent(data.message);
                            setAlert(true);
                            setTimeout(()=>setAlert(false), 3000);
                          })
                      }}>{setting}</Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>) :
              (<Box class='tw-flex tw-gap-4 tw-text-slate-300'>

                <Link to={'/user/signup'} class=' hover:tw-text-white tw-text-sm tw-hidden md:tw-block tw-text-sm'>Register</Link>
                <h6 class='tw-hidden md:tw-block tw-text-sm '>or</h6>
                <Link to={'/user/login'} class=' hover:tw-text-white tw-text-sm'>Sign in</Link>
              </Box>)}
          </Toolbar>
        </Container>
      </AppBar>
      {alert ? (<Alert variant='filled' > {alertContent}</Alert>) : <></> }
    </section>
  );
}
export default ResponsiveAppBar;
