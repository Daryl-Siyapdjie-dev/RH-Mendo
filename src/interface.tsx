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
      
export interface IUser{
    matricule: string;
    password: string;
    email: string;
    telephone: number;
    statut: string;
    poste: string;
    role: string;
    roleIdrole: number;
    idpersonnel: number;
    nom: string;
    prifile: string;
    prenom: string;
    sexe: string;
    supprimer: unknown;
    modifier: unknown;
    _id:string;

  }
export type Id = string |number
  export interface column{
    id:Id;
    title:string
  }
  
export  enum EtatTache {
    AFAIRE = 'à faire',
    ENCOURS = 'en cours',
    TERMINEE = 'terminée'
  }
  
export  interface IColonne {
    id: string;
    titre: string;
    etat: EtatTache;
    taches: ITache[];
  }
export interface ITache {
    _id: string;
    description: string;
    nomProjet: string;
    etat: EtatTache;
    colmunId?: string;
  }
