/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import useBackground from "@/hooks/useBackground";
import Link from "next/link";
import React from "react";

export default function Inicio() {

  const estilo = useBackground();

  return (
   
   <>

<div
  className="min-h-screen relative overflow-hidden bg-center bg-black rounded-lg lg:bg-cover bg-no-repeat p-12 text-center"
  style={estilo}>
  <div
  
    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
    style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}>
    <div className="flex h-full items-center justify-center">
      <div className="text-white">
        <h2 className="mb-4 text-4xl font-semibold">BarkMobb</h2>
        <h4 className="mb-6 text-xl font-semibold">Qué el estilo te rebalse</h4>
        <Link
          href="/catalogo"
          type="button"
          className="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
          data-te-ripple-init
          data-te-ripple-color="light">
          Ver nuestro catálogo
        </Link>
      </div>
    </div>
  </div>
</div>



   </>
  )
}
