import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';



const Dropdown = () => {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const user = "USER";

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const logoutHandler = () => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if(!currentUser){
        console.log(localStorage)
    }
     localStorage.clear();
    Cookies.remove(process.env.REACT_APP_COOKIE_NAME)
    window.location.replace('/');
  }

  const options = [
    <Link 
    to={"/profile"}
    style={{ textDecoration: "none"}}
    >
    PROFILE
    </Link>,
    <Link
    to="#"
    onClick={logoutHandler}
    style={{ textDecoration: "none"}}
    >
    LOGOUT
    </Link>];

const options2 = [
  <Link 
  to="/login"
  style={{ textDecoration: "none"}}
  >
  LOGIN
  </Link>,
  <Link
  to="/register"
  style={{ textDecoration: "none"}}
  >
  REGISTER
  </Link>];



  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button"  >
        <Button 
          onClick={handleClick} 
          style={{ backgroundColor: "teal", borderRight: "1px solid #fff"  }}
        >
          {userInfo ? (
            <>
              <span>Hi, {userInfo.first_name}!</span>
            </>
            ) : (
              <>
                <span>Welcome!</span>
              </>
            )}
            
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{ backgroundColor: "teal"}}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: "10000" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {userInfo ? (
                  <>
                  <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
                ) : (
                  <>
                  <MenuList id="split-button-menu" autoFocusItem>
                  {options2.map((option, index) => (
                    <MenuItem
                      key={index}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </>
                )}
                
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default Dropdown;