import React from 'react';
import {
  FaBox,
  FaClipboardList,
  FaFlask,
  FaTruck,
  FaUserClock,
  FaSignOutAlt,
  FaCalculator,
  FaWarehouse,
  FaUndo,
  FaStar,
  FaCog
} from 'react-icons/fa';
import { IoMdPower, IoMdWarning } from 'react-icons/io';
import { MdCurrencyExchange } from 'react-icons/md';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { icon: <FaBox size={24} />, label: 'Products', path: '/' },
    { icon: <FaClipboardList size={24} />, label: 'Orders', path: '/orders' },
    { icon: <MdCurrencyExchange size={24} />, label: 'Reports', path: '/reports' },
    { icon: <FaWarehouse size={24} />, label: 'Inventory', path: '/inventory' },
    { icon: <IoMdWarning size={24} />, label: 'Discarding', path: '/returns' },
    { icon: <FaStar size={24} />, label: 'Loyalty', path: '/loyalty' },
    { icon: <FaFlask size={24} />, label: 'Raw Materials', path: '/raw-materials' },
    { icon: <FaTruck size={24} />, label: 'External Materials', path: '/external-materials' },
    { icon: <FaCog size={24} />, label: 'Settings', path: '/settings' },
    { icon: <FaCalculator size={24} />, label: 'Calculator', path: '/calculator' },
    {
      icon: <IoMdPower size={24} />,
      label: 'Logout',
      onClick: handleLogout,
      isButton: true
    },
  ];

  return (
    <aside className='shrink-0 w-fit h-screen bg-main-gold/30 shadow-md flex flex-col items-center py-4 px-2 space-y-5 '>
      <Link to="/" className='w-16 h-16 overflow-hidden rounded-lg flex items-center justify-center text-white font-bold text-xl'>
        <img src="/logo.jpg" alt="logo" className='w-full h-full object-cover' />
      </Link>
      <nav className='w-full flex-1 flex flex-col items-center space-y-5 overflow-y-auto no-scrollbar'>
        {menuItems.map((item, index) => (
          item.isButton ? (
            <button
              key={index}
              onClick={item.onClick}
              className='flex flex-col items-center justify-center w-full py-3 space-y-1 text-main-green hover:bg-main-green hover:text-main-gold rounded-lg transition-colors duration-200'
            >
              <span>{item.icon}</span>
              <span className='text-xs font-medium'>{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className={() => {
                // Check if the current path should be considered active
                let isActive = false;
                // For Products (root path '/'), check if we're on home or any product detail page
                if (item.path === '/') {
                  isActive = location.pathname === '/' || location.pathname.startsWith('/products');
                }
                // For other paths, check if current path starts with the menu item path
                else {
                  isActive = location.pathname.startsWith(item.path);
                }
                return `flex flex-col items-center justify-center w-full p-2 space-y-1 
                transition-colors duration-200 hover:bg-main-green hover:text-main-gold rounded-lg
                ${isActive ? 'bg-main-green text-main-gold' : 'text-main-green'}`;
              }}
            >
              <span>{item.icon}</span>
              <span className='text-xs font-medium text-center'>{item.label}</span>
            </NavLink>
          )
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
