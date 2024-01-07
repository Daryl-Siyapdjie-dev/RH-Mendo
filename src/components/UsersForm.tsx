import { useState } from 'react';
import { IUser } from '../interface';

interface UserFormProps {
 user: IUser;
 onUpdate: (user: IUser) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onUpdate }) => {
 const [formData, setFormData] = useState(user);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setFormData({ ...formData, [event.target.name]: event.target.value });
 };

 const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`http://localhost:2727/users/${user._id}`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(updatedUser => {
     onUpdate(updatedUser);
    })
    .catch(error => console.error(error));
   };

 return (
   <form onSubmit={handleSubmit}>
      <input
   type="text"
   name="nom"
   value={formData.nom}
   onChange={handleChange}
 />
 <input
   type="text"
   name="prenom"
   value={formData.prenom}
   onChange={handleChange}
 />
     <button type="submit">Mettre à jour</button>
   </form>
 );
};