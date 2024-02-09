import logo from "../assets/LOGOP.svg";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Bell, ChevronDown, ChevronUp,  } from "react-bootstrap-icons";
import { LogOut } from "./logOut";

interface User {
  prenom: string;
  nom: string;
}


export function Header(){
    const [openDropdown, setOpenDropdown]= useState(false)

    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
      const storedUserInfo = localStorage.getItem('user-info');
      if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          if (parsedUserInfo && parsedUserInfo.user) {
              setUserInfo(parsedUserInfo.user);
          }
      }
   }, []);
    
    return <div>
         <div className=" bg-white h-20 flex justify-between items-center text-gray-700  px-12">
          <div className=" order-first w-40">   <img src={logo} alt="" /></div>
          <div className=" flex order-last items-center">
            <Bell/>
            <div className=" flex pl-9 items-center">
              <span > 
                <Avatar
                name={`${userInfo?.prenom} ${userInfo?.nom}`}
                size="40"
                round={true}
                style={{ marginRight: "px" }}
              />
              </span>
              {userInfo ? (
              <span className="px-3">
                {userInfo.prenom} {userInfo.nom}
              </span>
            ) : (
              <span className="px-3">Nom d'utilisateur</span>
            )}
              
              
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