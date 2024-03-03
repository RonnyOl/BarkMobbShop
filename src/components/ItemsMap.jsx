import Link from 'next/link'
import React from 'react'

export default function ItemsMap({data}) {
    return (
        <>
            <Link href={`/catalogoDetailed/${data.id}`}>

            <div className='bg-white text-gray-700 px-6 pt-6 pb-16 w-96 h-100 sm:w-auto md:h-100 flex flex-col justify-center items center text-center'>
            <img className="imageProd" width="400px" src={data.imagen}></img>
            <h2 className='mt-10 text-2xl'><b>{data.nombre}</b></h2>
            
            </div>
            </Link>
        </>
       )
}
