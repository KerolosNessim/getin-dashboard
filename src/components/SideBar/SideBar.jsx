import React from 'react';
import {
  FaBox,
  FaClipboardList,
  FaFlask,
  FaTruck,
  FaUserClock,
  FaSignOutAlt,
  FaCalculator
} from 'react-icons/fa';
import { IoMdPower } from 'react-icons/io';
import { NavLink, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  const menuItems = [
    { icon: <FaBox size={24} />, label: 'Products', path: '/' },
    { icon: <FaClipboardList size={24} />, label: 'Orders', path: '/orders' },
    { icon: <FaFlask size={24} />, label: 'Raw Materials', path: '/raw-materials' },
    { icon: <FaTruck size={24} />, label: 'External Materials', path: '/external-materials' },
    { icon: <FaCalculator size={24} />, label: 'Calculator', path: '/calculator' },
    { icon: <FaUserClock size={24} />, label: 'Attendance', path: '/attendance' },
    {
      icon: <IoMdPower size={24} />,
      label: 'Logout',
      onClick: handleLogout,
      isButton: true
    },
  ];

  return (
    <aside className='shrink-0 w-fit h-screen bg-slate-100 shadow-md flex flex-col items-center py-4 px-2 space-y-8 '>
      <div className='w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl'>
        GIC
      </div>

      <nav className='w-full flex-1 flex flex-col items-center space-y-6 overflow-y-auto no-scrollbar'>
        {menuItems.map((item, index) => (
          item.isButton ? (
            <button
              key={index}
              onClick={item.onClick}
              className='flex flex-col items-center justify-center w-full py-3 space-y-1 text-gray-600 hover:bg-blue-50 transition-colors duration-200'
            >
              <span>{item.icon}</span>
              <span className='text-xs font-medium'>{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full p-2 space-y-1 
                transition-colors duration-200 hover:bg-blue-600 hover:text-white rounded-lg
                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600'}`
              }
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
