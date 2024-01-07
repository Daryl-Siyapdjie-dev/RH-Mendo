import React, { useState } from "react";

import {  CashCoin,  Folder, HouseDoor, Kanban, People, TextRight } from "react-bootstrap-icons";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";


export function Layout() {

 interface IMenu {
  name: string;
  NavLink: string;
  icon: React.ElementType;
  margin?:boolean;
 }
 const menus:IMenu[] = [
  {name:"Dashboard", NavLink:"Dashboard", icon:HouseDoor},
  {name:"Projets", NavLink:"Projets", icon:Folder, margin:true},
  {name:"Teams", NavLink:"Teams", icon:People},
  {name:"suivi Personnels", NavLink:"suivi_Personnels", icon:CashCoin},
  {name:"Kanban", NavLink:"Kanban", icon:Kanban, margin:true},
  {name:"finances", NavLink:"finances", icon:CashCoin},
  
 ];
 const[open,setOpen]=useState(true);
 const location=useLocation();
    return (
      <div>
       <Header/>

        <div className="flex gap-4">
          <header
            className={`flex-none
               ${
                 open ? "w-1/5" : "w-16"
               } duration-500 text-gray-700  mx-4 mr-5 px-1 `}
          >
            <div className="py-3 flex justify-end ">
              <TextRight
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <nav id="sidebar" className="flex flex-col mt-5 gap-6 relative">
              {menus?.map((menu, index) => (
                <NavLink
                  to={menu?.NavLink}
                  key={index}
                  
                  className={`${
                  location.pathname.includes(menu.NavLink)&& " bg-navbg rounded-md text-hovericone" 
                  } group flex items-center text-sm gap-3.5 font-medium  p-4 hover:bg-navbg rounded-md hover:text-hovericone `}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${index + 3}00ms`,
                    }}
                    className={` whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}{" "}
                  </h2>
                  <h2 className={`${
                    open && "hidden"
                  } absolute left-40 bg-white font-semibold whitespace-pre  rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-2 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {menu?.name}
                  </h2>
                </NavLink>
              ))}
            </nav>
          </header>

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }