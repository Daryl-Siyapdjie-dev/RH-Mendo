interface ModalProps {
    setOpenModal: (open: boolean) => void;
   }

 export function Modal({ setOpenModal }: ModalProps) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start flex text-center justify-center ">
            <div className="mt-3 text-center sm:mt-0  sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900 t ">
               Ajouter un personnel?
              </h3>
              
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <form>
              <div className="flex flex-col justify-center ">
              
                <label htmlFor="nom" className="mb-2 text-gray-700">Nom :</label>
                <input type="text"
                 id="nom" className="mb-2 input w-[500px]"
                  />
                <label htmlFor="prenom" className="mb-2 text-gray-700">Prénom :</label>
                <input type="text"
                 id="prenom" className="mb-2 input"
                  />
                <label htmlFor="email" className="mb-2 text-gray-700">Email :</label>
                <input type="email"
                 id="email" className="mb-2 input"
                  />
                <label htmlFor="poste" className="mb-2 text-gray-700">Poste :</label>
                <input type="text"
                 id="p" className="mb-2 input"
                  />
                <div className="flex items-center ">
                <div>
                <label htmlFor="telephone" className="mr-2  text-gray-700">Tel :</label>
                <input type="text"
                 id="telephone" className="mb-2 mr-8 input w-48" 
                 placeholder="+237" />
                </div>
                
                <div  className="flex">
               <label className=" text-sm font-medium text-gray-700 mr-4"> Sexe :</label>
               <div className="">
               <label className="inline-flex items-center">
               <input type="radio"
                className="form-radio" 
                name="sexe" value="M" />
               <span className="ml-2">Masculin</span>
               </label>
               <label className="inline-flex items-center ml-6">
               <input type="radio"
                className="form-radio"
                 name="sexe" value="F" />
               <span className="ml-2">Féminin</span>
             </label>
           
             </div>
            </div>
                </div>
                <label htmlFor="poste" className="mb-2 text-gray-700">Matricule :</label>
                <input type="text"
                 id="poste" className="mb-2 input"
                  />
                   <label htmlFor="poste" className="mb-2 text-gray-700">Mot de passe :</label>
                <input type="text"
                 id="poste" className="mb-2 input"
                  />
             
              </div>
            </form>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6  flex justify-between">
          <button
            type="button"
            className="btnreset "
            onClick={() => setOpenModal(false)}
          >
            Annulle
          </button>
          <button
            type="button"
            className=" btn"
          >
            Enregistre
          </button>
        </div>
      </div>
    </div>
  </div>
 );
}


