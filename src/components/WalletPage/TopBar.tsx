'use client'

import Logo from '../icons/Logo'
import { useSession } from 'next-auth/react'
import { AlignLeft, Search } from 'lucide-react'
import { useState } from 'react'
import LeftSideBar from './LeftSideBar'
import ProfileDropDown from '../common/ProfileDropDown'
import React from 'react'
import { ModeToggle } from '../ui/darkmode'

const TopBar = () => {
  const { data } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex justify-between px-4 py-3 pb-6 items-center w-full border-b dark:border-gray-500">
      <div className="flex items-center gap-5">
        {/* <Sidebar /> */}
        <AlignLeft onClick={() => setOpen(!open)} className="sm:hidden" />
        <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center flex-shrink-0">
          <Logo className="h-8 w-8 text-black dark:text-white" />
        </div>
      </div>

      <div className="block sm:hidden">
        {open ? (
          <div className="bg-[#1c1c1cd3] bg-blur-md transition-y mt-9 duration-300 z-10  w-[95%] h-[88%] fixed left-1/2  m-0 rounded-md overflow-hidden origin-top -translate-x-1/2">
            <LeftSideBar />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="hidden sm:flex sm:w-1/2 md:w-[50%] items-center border rounded-full p-2">
        <Search color="gray" />
        <input
          className="w-full text-center outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex gap-2 items-center">
        {data && data?.user ? (
          <ModeToggle />
        ) : (
          <div className="w-[3rem] flex items-center p-[0.2rem]  justify-center h-[2rem] transition outline-none">
            <div className="p-4 border-2 rounded-full bg-gray-300 animate-pulse"></div>
          </div>
        )}
        <ProfileDropDown />
      </div>
    </div>
  )
}

export default TopBar
