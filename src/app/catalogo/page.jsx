/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";

import { auth, db } from "@/app/firebase/config";

import Cookies from "universal-cookie";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import ItemsMap from "@/components/ItemsMap";
import Spinner from "@/components/Spinner";

export default function page() {
  const cookies = new Cookies();

  const [producto, setproducto] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  async function gey() {
    // const productos = await getDocs(query(collection(db, "productos"), orderBy("nombre")));
    // const productosData = productos.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    const productos = await getDocs(
      query(collection(db, "productos"), orderBy("nombre"))
    );
    const productosData = productos.docs.map((doc) => {
      const { nombre, ...otherData } = doc.data();
      return {
        id: doc.id,
        nombre: nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""), // Normalizar y convertir a minúsculas
        ...otherData,
      };
    });
    productosData.sort((a, b) => a.nombre.toLowerCase().localeCompare(b.nombre)); // Ordenar los productos normalizados

    console.log(productosData);
    setproducto(productosData);
    setisLoading(false);
  }

  // async function goy() {
  //     if (user) { // Verificar si el usuario está definido

  //       const q = query(collection(db, "usuarios"), where("id", "==", user.uid));

  //       const querySnapshot = await getDocs(q);
  //       console.log(querySnapshot)
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, " => ", doc.data());
  //       });
  //     } else {
  //       console.log("Usuario no autenticado");
  //     }
  //   }

  useEffect(() => {
    gey();
  }, []);

  return (
    <div className="catalogo-container bg-black py-20 text-gray-200 flex justify-center items-center">
      {producto ? (
        <div className="flex justify-center items-center gap-20 flex-wrap">
          {" "}
          {producto.map((doc, index) => (
            <div key={index}>
              <ItemsMap data={doc}></ItemsMap>
            </div>
          ))}{" "}
        </div>
      ) : (
        <Spinner></Spinner>
      )}
      
    </div>
  );
}
