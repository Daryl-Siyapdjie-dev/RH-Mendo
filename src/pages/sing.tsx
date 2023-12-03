import { Input } from '../components/forms/Input.tsx';


export function Login(){
    return <>
    <div className='min-h-screem  flex flex-col justify-center'>
      
      <div className='  mx-auto mt-4 p-8  rounded-lg bg-gray-100 backdrop-blur-md drop-shadow-lg '>
      <div className='max-w-lg w-full mx-auto mb-12'>
        <div>
          <img src="/loimg.svg" alt="" className=' mx-auto' />
        </div>
        <div className='text-1xl font-bold text-gray-900 mt-2 text-center'>Se Connecter</div>

      </div>
        <form action="" className='space-y-6'>
          <div>
            <Input value="" type='text' onChange={() => null} placeholder="Matricule"  />
          </div>
          <div>
            <Input value="" type='email' onChange={() => null} placeholder="E-mail"  />
          </div>
          <div>
            <Input value="" type='password' onChange={() => null} placeholder="password"  />
          </div>
          <div>
            <a href="" className='font-medium text-sm text-blue-700 border-b border-blue-700  '>Mots de passe oublier ?</a>
          </div>
          <div>
            <button className='bg-violet-400 text-slate-50 font-medium text-base hover:bg-violet-600 w-96 rounded-3xl p-2 active:bg-violet-700  focus:ring focus:ring-violet-300'>connexion</button>
          </div>
        </form>
      </div>
    </div>
    <div className='m-10 text-end '>
    <a href="" className='font-medium text-sm text-blue-700 border-b border-blue-700 '>Consulte notre politique ?</a>
    </div>
    
    
      
    </>
}