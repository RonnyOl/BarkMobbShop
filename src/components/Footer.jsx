import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white w-full h-96 lg:h-36 flex-col justify-center items-center gap-12 text-center  lg:w-full lg:flex-row flex lg:items-center lg:justify-between px-20">
        <div>
          <img               src="BarkLogo.webp"
alt="LogoBark" width="120px" title="BarkMobbLogo"/>
        </div>

        <div>
          <p>© 2024 BarkMobb. Todos los derechos reservados BarkMobb</p>
        </div>

        <div>
          <div>
            <a href="https://www.instagram.com/bark4.ever/" title="Bark Instagram" className="">
                
              <svg
              
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-instagram hover:stroke-blue-700"
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
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M16.5 7.5l0 .01" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
