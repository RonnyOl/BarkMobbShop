"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function NavBar() {
  const cookies = new Cookies();
  const [user] = useAuthState(auth);
  const router = useRouter();
  console.log({ user });
  const [scrollDesactivado, setScrollDesactivado] = useState(false);

  const [isLoggedIn, setisLoggedIn] = useState("");
  const [mostrarbtnLog, setmostrarbtnLog] = useState(false);
  const [mostrarHeader, setmostrarHeader] = useState(false);
  useEffect(() => {
    setisLoggedIn(cookies.get("userLoggedIn"));
    setmostrarbtnLog(true);
  }, [cookies]);

  useEffect(() => {
    setisLoggedIn(cookies.get("userLoggedIn"));

    setmostrarbtnLog(true);
  }, [user]);

  useEffect(() => {
    if (scrollDesactivado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [scrollDesactivado]);

  const menuHandler = () => {
    setmostrarHeader(!mostrarHeader);
    setScrollDesactivado(!scrollDesactivado);
    console.log(!mostrarHeader);
  };

  return (
    <>
      <nav className="flex w-full h-20 bg-black text-white items-center">
        <div className="px-12">
          <Link title="Inicio" href="/">
            <img
              src="BarkLogo.webp"
              alt="LogoBark"
              className="logoImg"
              title="BarkMobbLogo"
            />
          </Link>
        </div>
        <div className="w-full flex justify-center gap-36">
          <Link href="/" className="hidden lg:inline" aria-label="Ir a Inicio">
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="hidden lg:inline"
            aria-label="Ir al Catálogo"
          >
            Catálogo
          </Link>
          <Link
            href="/"
            className="hidden lg:inline"
            aria-label="Ir a Contacto"
          >
            Contacto
          </Link>
        </div>
        <div className="w-52 pr-10">
          {mostrarbtnLog ? (
            isLoggedIn ? (
              <a
                href="#"
                onClick={() => {
                  signOut(auth);
                  cookies.remove("userLoggedIn");
                  location.reload();
                }}
              >
                Log out
              </a>
            ) : (
              <Link href="/signin">Login</Link>
            )
          ) : null}
        </div>
        <div className="pr-10 lg:hidden">
          <a onClick={menuHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-menu-2"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </a>
        </div>
      </nav>
      {mostrarHeader && (
        <>
          <>
            <div
              style={{ zIndex: "2" }}
              className="sexossss sidebar absolute top-[80px] right-0 h-full bg-black bg-opacity-50 w-full text-white "
            >
              <div
                style={{ zIndex: "3" }}
                className="sexossss zoom-in-out-box sidebar absolute top-[0px] right-0 h-full bg-black bg-black w-[15rem] text-white "
              >
                {/* Contenido del sidebar */}
                <ul className="flex flex-col py-12 gap-16">
                  <li className="flex items-center justify-start gap-3 pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 icon icon-tabler icon-tabler-home-2"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M10 12h4v4h-4z" />
                    </svg>{" "}
                    <Link onClick={menuHandler} title="Inicio" href="/">
                      Inicio
                    </Link>
                  </li>

                  <li className="flex items-center justify-start gap-3 pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 icon icon-tabler icon-tabler-brand-shopee"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l.867 12.143a2 2 0 0 0 2 1.857h10.276a2 2 0 0 0 2 -1.857l.867 -12.143h-16z" />
                      <path d="M8.5 7c0 -1.653 1.5 -4 3.5 -4s3.5 2.347 3.5 4" />
                      <path d="M9.5 17c.413 .462 1 1 2.5 1s2.5 -.897 2.5 -2s-1 -1.5 -2.5 -2s-2 -1.47 -2 -2c0 -1.104 1 -2 2 -2s1.5 0 2.5 1" />
                    </svg>
                    <Link
                      onClick={menuHandler}
                      title="Catalogo"
                      href="/catalogo"
                    >
                      Catalogo
                    </Link>
                  </li>
                  <li className="flex items-center justify-start gap-3 pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-8 h-8 icon icon-tabler icon-tabler-message-share"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 9h8" />
                      <path d="M8 13h6" />
                      <path d="M13 18l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6" />
                      <path d="M16 22l5 -5" />
                      <path d="M21 21.5v-4.5h-4.5" />
                    </svg>
                    <Link onClick={menuHandler} title="Contacto" href="/">
                      Contacto
                    </Link>
                  </li>
                  {isLoggedIn ? (
                    <li className="flex items-center justify-start gap-3 pl-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 icon icon-tabler icon-tabler-user-cancel"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                        <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M17 21l4 -4" />
                      </svg>
                      <a
                        href="#"
                        title="LogOut"
                        onClick={() => {
                          signOut(auth);
                          cookies.remove("userLoggedIn");
                          menuHandler();
                        }}
                      >
                        Log out
                      </a>
                    </li>
                  ) : (
                    <li className="flex items-center justify-start gap-3 pl-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 icon icon-tabler icon-tabler-user-cancel"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                        <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        <path d="M17 21l4 -4" />
                      </svg>
                      <Link onClick={menuHandler} title="Login" href="/signin">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        </>
      )}
    </>
  );
}
