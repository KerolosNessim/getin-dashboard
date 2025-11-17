import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='flex '>
      <SideBar />
      <div className='shrink-0 flex-1 p-4 pb-0 h-screen overflow-y-auto no-scrollbar'>
        <Outlet />
      </div>
    </main>
  )
}

export default Layout
