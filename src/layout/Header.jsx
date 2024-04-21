import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
];

const homeNav = [
  { to: '/', text: 'Home' }
];

const userNav = [
  { to: '/cart', text: 'Cart' }
];

export default function Header({ searchTerm, handleSearchChange }) {
  const { user, logout } = useAuth();
  const finalNav = user?.user_id ? userNav : guestNav;
  const fiaNav = user?.user_id ? homeNav : guestNav;

  const navigate = useNavigate();



  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="navbar bg-base-100 flex justify-between shadow-sm">
      <div>
        <ul className="menu menu-horizontal px-10 flex">
          {fiaNav.map(el => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
        </ul>
        <input style={{borderRadius: '100px'}}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered"
        />
      </div>
      <div className="flex-1 flex justify-center">
        <Link to="/" className="text-xl">Bekerry</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-14 flex">
          {finalNav.map(el => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          <li><span className="mx-2">user.{user.username}</span></li>
          {user?.user_id && (
            <li className="flex items-center mx-2">
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}