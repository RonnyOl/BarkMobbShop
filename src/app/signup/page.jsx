'use client'
import { useEffect, useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth, db} from '@/app/firebase/config'
import Link from 'next/link';
import { doc, setDoc } from "firebase/firestore"; 
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import useBackground from '@/hooks/useBackground';

const SignUp = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, seterrors] = useState(false)
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const [estilo, setestilo] = useState(useBackground())
  const estiloHook = useBackground();
  useEffect(() => {
    setestilo(estiloHook)
  }, []);

  const handleSignUp = async () => {
    try {
        
        const res = await createUserWithEmailAndPassword(email, password)
        if (res == undefined){
          seterrors(true)
        }
        await setDoc(doc(db, `usuarios/${res.user.uid}`),{ rol: "user", id:res.user.uid});

        
        setEmail('');
        setPassword('')
        cookies.set('userLoggedIn', true, { path: '/' });
        window.location.href = '/';

    } catch(e){
        console.error("Ya existe")
    }
  }

  return (
    <div
      style={estilo}
      className="lg:bg-cover bg-black bg-no-repeat bg-center min-h-screen "
    >
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 backdrop-blur-[3px]">
      <div className="bg-transparent backdrop-blur border p-10 rounded-lg shadow-xl w-96 text-black">
        <h1 className="text-white text-2xl mb-5">Registrarse</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-3 mb-4 bg-transparent text-white outline-none  placeholder-gray-200 border-b "
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-3 mb-4 bg-transparent text-white outline-none  placeholder-gray-200 border-b "
        />
        <button 
          onClick={handleSignUp}
          className="w-full p-3 border-2 border-white bg-black/50 rounded text-white hover:bg-black/100"
        >
          Registrarse
        </button>

        <div className='py-6'>
            <hr></hr>
        </div>
        <Link href="/signin">
        <button 
          
          className="w-full p-3 border-2 bg-black/20 rounded text-white hover:bg-black/80"
        >¿Ya tienes cuenta? ir a logearse</button></Link>

      </div>
      </div>
        <>
          {errors ? <p>Error: Ya existe</p>: null}
        </>
      
    </div>
  );
};

export default SignUp;