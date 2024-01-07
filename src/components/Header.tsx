import { useState } from "react";
import logo from "../assets/logo.svg";
import { Bell, ChevronDown, ChevronUp,  } from "react-bootstrap-icons";
import { LogOut } from "./logOut";
export function Header(){
    const [openDropdown, setOpenDropdown]= useState(false)
    return <div>
         <div className=" bg-white h-20 flex justify-between items-center text-gray-700  px-12">
          <div className=" order-first w-40">   <img src={logo} alt="" /></div>
          <div className=" flex order-last items-center">
            <Bell/>
            <div className=" flex pl-9 items-center">
              <span><img src="/profile1.jpeg" alt="" className="w-12 h-12 rounded-full"/></span>
              <span className="px-3">parfait kom</span>
              
              
              {openDropdown ? (
                   <ChevronUp onClick={() => setOpenDropdown(state => !state)} />
              ) : (
                   <ChevronDown onClick={() => setOpenDropdown(state => !state)} />
              )}

            </div>
          </div>
     
        </div>
        {openDropdown&&<LogOut setOpenDropdown={setOpenDropdown}/>}
    </div>
}