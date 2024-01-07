import { IUser } from '../interface';
import { UserForm } from './UsersForm';

interface ModalProps {
 user: IUser;
 onClose: () => void;
 onUpdate: (updatedUser: IUser) => void;
}

export const UpdateModal: React.FC<ModalProps> = ({ user, onClose, onUpdate  }) => {
 const handleUpdate = (updatedUser: IUser) => {
   onClose();
   onUpdate(updatedUser);
 };

 return (
   <div>
     <UserForm user={user} onUpdate={handleUpdate} />
     <button onClick={onClose}>Fermer</button>
   </div>
 );
};