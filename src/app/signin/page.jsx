"use client";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useBackground from "@/hooks/useBackground";

const SignIn = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [user, loading] = useAuthState(auth); // Use loading state
  const [errors, seterrors] = useState(false);
  const googleAuth = new GoogleAuthProvider();
  const [redirect, setredirect] = useState(false);
  const [estilo, setestilo] = useState(useBackground())
  const estiloHook = useBackground();
  useEffect(() => {
    setestilo(estiloHook)
  }, []);

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth);
      cookies.set("userLoggedIn", true, { path: "/" });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      if (!res) {
        seterrors(true);
      } else {
        setEmail("");
        setPassword("");
        cookies.set("userLoggedIn", true, { path: "/" });
        setredirect(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Si el usuario está autenticado, redirigir inmediatamente
  if (user) {
    router.push('/');
    return null; // Opcional: no renderizar nada si ya se redirigió
  }

  // Si aún no se ha determinado la autenticación, mostrar un mensaje de carga
  if (loading) {
    return <Spinner></Spinner>;
  }

  // Si el usuario no está autenticado y la autenticación ya ha sido determinada, mostrar el formulario de inicio de sesión
  return (
    <div
      style={estilo}
      className="lg:bg-cover bg-black bg-no-repeat bg-center min-h-screen "
    >
      <div className=" flex items-center justify-center min-h-screen bg-black bg-opacity-40 backdrop-blur-[3px]">
        <div className="bg-transparent backdrop-blur border p-10 rounded-lg shadow-xl w-96 text-black">
          <h1 className=" text-2xl mb-5 text-white">Sign In</h1>
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
            onClick={handleSignIn}
            className="w-full p-3 border-2 bg-black/20 rounded text-white hover:bg-black/80 "
          >
            Logearse
          </button>

          {errors && <p className="py-4 text-white text-center" >Contraseña y/o mail incorrectos</p>}

          <button
            onClick={handleSignInGoogle}
            className="w-full mt-3 p-3 bg-blue-500 text-gray-700 rounded text-white hover:bg-blue-700 flex justify-center items-center gap-1"
          >
            <svg
              class="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Logearse con Google
          </button>

          <div className="py-6">
            <hr />
          </div>
          <Link href="/signup">
            <button className="w-full p-3 border-2 bg-black/20 rounded text-white hover:bg-black/80">
              ¿Sin cuenta? ir a Registrarse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
