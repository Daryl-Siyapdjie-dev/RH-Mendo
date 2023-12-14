export interface LoginData {
    matricule: string;
    email: string;
    password: string;
   }

export interface LoginState {
    email: string;
    matricule: string;
    password: string;
   }
   
export interface Action {
    type: string;
    payload: string;
   }
      