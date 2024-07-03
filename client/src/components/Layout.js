import React from 'react';
import '../styles/LayoutStyles.css';
import { userMenu, adminMenu } from '../Data/data';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import logo from '../img/logo.png';
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      // icon: 'fa-solid fa-house'
    },
    {
      name: 'Appointments',
      path: "/doctor-appointments",
      // icon: 'fa-solid fa-list'
    },
    {
      name: "Schedule",
      path: "/doctor/schedule",
      //  icon: 'fa-solid fa-user'
    },
    {
      name: "Profile settings",
      path: `/doctor/profile/${user?._id}`,
      //  icon: 'fa-solid fa-user'
    },

  ]
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    message.success('logout successfully');
    navigate("/login");
  }
  const handleNotifications = () => { navigate("/notification") }
  const Menu = (user?.isAdmin) ? adminMenu : (user?.isDoctor) ? doctorMenu : userMenu;
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light ">

        <img src={logo} width="150" height="60" className='logoPicture' alt="" />

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div class="navbar-nav">
            {
              Menu.map(menu => {
                return (
                  <>
                    <div className='nav-item nav-link'>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                )
              })
            }
            <div className='nav-item nav-link' onClick={handleLogout}>

              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className='header'>
          <div style={{ cursor: "pointer" }}>
            <Badge count={user && user.notification.length} onClick={handleNotifications}
              style={{ cursor: 'pointer' }}>
              <i class="fa-regular fa-bell"></i>
            </Badge>

            <Link to="/notification">{user?.name}</Link>
            <img className='profilePic' src={user?.pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}></img>
          </div>
        </div>
      </nav>
      <div className='body'>
        {children}
      </div>

    </>
  )

}


export default Layout;