import { Search, Home, SupervisorAccount, BusinessCenter, Chat, Notifications } from '@material-ui/icons';
import React from 'react';
import './Header.css';
import HeaderOption from './HeaderOption';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from '../firebase';

const Header = () => {
    const dispatch = useDispatch();
    const logoutApp = () => {
        dispatch(logout())
        auth.signOut();
    }

    return (
        <div className='header'>
            <div className='header__left'>
                <img src='logo192.png' alt='logo' />
                <div className='header__search'>
                    <Search />
                    <input type='text' />
                </div>
            </div>
            <div className='header__right'>
                <HeaderOption Icon={Home} title="Home" />
                <HeaderOption Icon={SupervisorAccount} title="My Network" />
                <HeaderOption Icon={BusinessCenter} title="Jobs" />
                <HeaderOption Icon={Chat} title="Messaging" />
                <HeaderOption Icon={Notifications} title="Notifications" />
                <HeaderOption
                    onClick={logoutApp}
                    avatar={true}
                    title="me" />
            </div>
        </div>
    )
}

export default Header