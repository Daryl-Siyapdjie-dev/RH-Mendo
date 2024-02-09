import { NavigateFunction } from "react-router";

interface LoginData {
 matricule: string;
 email: string;
 password: string;
}

interface User {
  _id: string;
  matricule: string;
  password: string;
  email: string;
  idpersonnel: number;
  nom: string;
  personnelcol: string;
  prenom: string;
  sexe: string;
  telephone: number;
  statut: string;
  poste: string;
  role: string;
  roleIdrole: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
 }
 
 interface ApiResponse {
  message: string;
  token: string;
  user: User;
 }
 
 

export  const Connecter = async ({ matricule, email, password }: LoginData, navigate: NavigateFunction) => {
 const items: LoginData = { matricule, email, password };
 const result = await fetch("http://localhost:2727/users/login", {
   method: "POST",
   headers: {
     "content-type": "application/json",
     "Accept": "application/json"
   },
   body: JSON.stringify(items)
 });

 if (!result.ok) {
   throw new Error(`Erreur HTTP ! status: ${result.status}`);
 }

 const data: ApiResponse  = await result.json();
 localStorage.setItem("user-info", JSON.stringify(data));
 navigate("/DashBoard");
}

