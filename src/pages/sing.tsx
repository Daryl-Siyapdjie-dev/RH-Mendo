import  {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {  LoginData, LoginState } from '../interface';
import { Connecter } from '../library/login';


 const initialState: LoginState = {
  email: '',
  matricule: '',
  password: '',
 };
 
 const loginSchema = Yup.object().shape({
  matricule: Yup.string().required('Matricul is required'),
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  password: Yup.string().required('Password is required'),
 });

export function Login(){

const navigate = useNavigate();


useEffect(() => {
  if (localStorage.getItem('user-info')) {
    navigate('/Dashboard');
  }
}, [navigate]);

const handleSubmit = async (values: LoginData) => {
  try {
    await Connecter(values,navigate);
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire: ", error);
  }
 };
 


    return <>
    <div className='min-h-screem  flex flex-col justify-center'>
      
      <div className='  mx-auto mt-4 p-8  rounded-lg bg-gray-100 backdrop-blur-md drop-shadow-lg '>
      <div className='max-w-lg w-full mx-auto mb-12'>
        <div>
          <img src="/loimg.svg" alt="" className=' mx-auto' />
        </div>
        <div className='text-1xl font-bold text-gray-900 mt-2 text-center'>Se Connecter</div>

      </div>


        
        <Formik 
        initialValues={initialState} 
        validationSchema={loginSchema}  
        onSubmit={handleSubmit}>
        {({ handleSubmit,errors,touched/*,isSubmitting*/}) => (

        <Form onSubmit={handleSubmit} className='space-y-6 flex flex-col'>
        
         <Field 
         name="matricule" 
         type="text"
          placeholder="Matricule" 
          className="w-96 placeholder:italic focus:outline-none focus:ring focus:ring-violet-300  p-2 border border-gray-300 rounded-xl pl-4 mt-2  "
          />   
          {errors?.matricule&&touched.matricule && <span className='text-sm text-red-600'>{errors?.matricule}</span> }

         <Field 
         name="email" 
         type="email" 
         placeholder="E-mail" 
         className="w-96 placeholder:italic focus:outline-none focus:ring focus:ring-violet-300  p-2 border border-gray-300 rounded-xl pl-4 mt-2  "
         />
         {errors?.email && touched.email && <span className=' text-red-600 text-sm'>{errors?.email}</span> }

         <Field 
         name="password" 
         type="password" 
         placeholder="Password"
         className="w-96 placeholder:italic focus:outline-none focus:ring focus:ring-violet-300  p-2 border border-gray-300 rounded-xl pl-4 mt-2  "
         />
          {errors?.password&& touched.password && <span className=' text-red-600 text-sm '>{errors?.password}</span> }

         <div>
            <a href="" 
            className='font-medium text-sm text-blue-700 border-b border-blue-700  '>
              Mots de passe oublier ?
            </a>
        </div>
         <button 
         className='bg-violet-400 text-slate-50 font-medium text-base hover:bg-violet-600 w-96 rounded-3xl p-2 active:bg-violet-700  focus:ring focus:ring-violet-300' type="submit">Connexion
         </button>
       </Form>
     )}
   </Formik>
      </div>
    </div>
    <div className='m-10 text-end '>
    <a href="" className='font-medium text-sm text-blue-700 border-b border-blue-700 '>Consulte notre politique ?</a>
    </div>
    
    
      
    </>
}