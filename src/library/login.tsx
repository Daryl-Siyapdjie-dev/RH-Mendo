import { NavigateFunction } from "react-router";

interface LoginData {
 matricule: string;
 email: string;
 password: string;
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

 const data = await result.json();
 localStorage.setItem("user-info", JSON.stringify(data));
 navigate("/DashBoard");
}

