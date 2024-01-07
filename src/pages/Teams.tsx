import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import  { useState, useEffect } from 'react';
import { IUser } from "../interface";
import { Pencil, Trash3 } from "react-bootstrap-icons";
import { DownloadBtn } from "../components/DownloadBtn";
import { Input } from "../components/forms/Input";
import { Button } from "../components/forms/buttom";
import { Modal } from "../components/Modal";
import { UpdateModal } from "../components/UpdateModal";

export function Teams (){

   const columnHelper = createColumnHelper<IUser>()
   const [data, setData] = useState<IUser[]>([]);

   const [globalFilter,setGlobalFilter] = useState("")

   useEffect(() => {
      fetch('http://localhost:2727/users/getAllUsers')
        .then(response => response.json())
        .then(data => setData(data.users))
        .catch(error => console.error(error));
    }, []);
   
   


   const columns = [

      columnHelper.accessor((row) => `${row.prenom} ${row.nom}`, {
         cell: (info)=><span>{info.getValue()}</span>,
         header: " Name",
      }),
      columnHelper.accessor("poste", {
         cell: (info)=><span>{info.getValue()}</span>,
         header: "Poste",
      }),
      columnHelper.accessor("email", {
         cell: (info)=><span>{info.getValue()}</span>,
         header: "Email",
      }),
      columnHelper.accessor("telephone", {
         cell: (info)=><span>{info.getValue()}</span>,
         header: "Telephone",
      }),
      columnHelper.accessor("role", {
         cell: (info)=><span>{info.getValue()}</span>,
         header: "Role",
      }),
      columnHelper.accessor("sexe", {
         cell: (info)=><span>{info.getValue()}</span>,
         header: "Sexe",
      }),
     
   ] 

   const table = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
      },
      getCoreRowModel: getCoreRowModel()
     });

     
  const [modalOpen, setModalOpen] = useState(false);
  const [UpdateModalOpen,setUpdateModal]=useState(false)

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

 
  
  const handleUpdate = (updatedUser: IUser) => {
   setData(data.map(user => user._id === updatedUser._id ? updatedUser : user));
   console.log(handleUpdate)
   setUpdateModal(false);
  };
   return <>

   <div className="w-full h-full  bg-bgcontaint mx-auto p-2 max-h-max ">

   <div className=" flex justify-between bg-navbg my-2 p-4 rounded-md">
      <div>
         <h5 className=" text-2xl">Teams Mendo Company</h5>
         <p>Une liste de tous le personnels de MENDO COMPANY</p>
      </div>
      <div>
         <Input type={"password"}  placeholder={"Search"} value={""} onChange={function (): void {
            throw new Error("Function not implemented.");
         } }/>
      </div>

   </div>
   <div className="flex justify-end  ">
   <div className="m-2 "   
   
   onClick={() => {
          setModalOpen(true);
        }}>
      <Button/>
   </div>
   
   {modalOpen && <Modal setOpenModal={setModalOpen} />}
   <div className="m-2">
      <DownloadBtn data={data} fileName={"liste du personnel de Mendo Company"}/>
    </div>

   </div>

  

    <table className="w-full text-left">
     <thead className=" border-b-2 my-2 p-4 ">
     {
         table.getHeaderGroups().map((headerGroup)=>(
            <tr key={headerGroup.id}>
               {headerGroup.headers.map((header)=>(
                  <th key={header.id} className=" capitalize px-3.5 py-2">
                     {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                     )}

                  </th>
               ))}

              <th >Action</th>
            </tr>
         ))
      }
     </thead><p className=" m-2"/>
     <tbody className="">
      {
         table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row,i)=>(
               <tr key={row.id} className={`${i%2 === 0 ? " bg-purple-200" : " bg-purple-50"}`}>
                  {
                     row.getVisibleCells().map((cell)=>(
                        <td key={cell.id} className=" px-3.5 py-4">
                           {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                           )}
                        </td>
                     ))

                     
                  }

               <td> <div className="flex ">
                  <span className="p-1 hover:text-gray-900 text-gray-600"  onClick={() =>{
                      setSelectedUser(row.original);
                      setModalOpen(true);
                  }}><Pencil/></span>
                  <span className="p-1 hover:text-red-400 text-gray-600"><Trash3/></span>
                  </div>
               </td>
               {UpdateModalOpen && selectedUser && <UpdateModal user={selectedUser} onClose={() => setUpdateModal(false)} onUpdate={handleUpdate} />}
               </tr>

               
            ))
         ):null
      }

     </tbody>
    </table>
    
   </div>
   </>
}  