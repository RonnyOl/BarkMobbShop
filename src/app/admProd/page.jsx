
"use client"
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";

export default function Page() {
  const cookies = new Cookies();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [isClient, setIsClient] = useState(false)
  const [producto, setproducto] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [usuarioValido, setusuarioValido] = useState(false);
  const [mostrarAdd, setmostrarAdd] = useState(false);

  const [nombreProd, setnombreProd] = useState("");
  const [precioProd, setprecioProd] = useState("");
  const [descripcionProd, setdescripcionProd] = useState("");
  const [isStockProd, setisStockProd] = useState("");
  const [tipoProd, settipoProd] = useState("");
  const [testtt, settesttt] = useState("");
  const [imgProd, setimgProd] = useState("");

  const isLoggedIn = cookies.get("userLoggedIn");

  async function gey() {
    console.log("ME ESTOY RENDERIZANDO 1111");
    const productos = await getDocs(collection(db, "productos"));
    const productosData = productos.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (producto) {
      const productosDataFiltered = productosData.map(
        ({ id, nombre, precio, descripcion, stock, tipo, imagen }) => ({
          id,
          nombre,
          precio,
          descripcion,
          stock,
          tipo,
          imagen,
        })
      );

      const productoFiltered = producto.map(
        ({ id, nombre, precio, descripcion, stock, tipo, imagen }) => ({
          id,
          nombre,
          precio,
          descripcion,
          stock,
          tipo,
          imagen,
        })
      );
      if (
        JSON.stringify(productosDataFiltered) !==
        JSON.stringify(productoFiltered)
      ) {
        setproducto(productosData);
      }
    } else {
      setproducto(productosData);
    }

    setisLoading(false);
  }

  async function goy() {
    if (user) {
      try {
        const q = query(
          collection(db, "usuarios"),
          where("id", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        // Obtener el primer documento si existe
        const firstDoc = querySnapshot.docs[0];
       
        if (firstDoc) {
          const userData = firstDoc.data();
          // console.log(userData.rol);
          // Verificar el rol del usuario
          if (userData.rol === "admin") {
            setusuarioValido(true);
          } else {
            router.push("/")
          }
        } else {
          // console.log("No se encontraron resultados para el usuario");
        }
      } catch (error) {
        // console.error("Error en la consulta a Firestore:", error);
      }
    }
  }

  const borrar = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    setproducto([]);
  };

  const showSwal = (id, prod) => {
    Swal.fire({
      title: `¿Quieres borrar ${prod.nombre}`,
      showDenyButton: true,

      confirmButtonText: "Borrar",
      denyButtonText: `No borrar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Borrado!", "", "Te re cabio jajaja");
        borrar(id);
      } else if (result.isDenied) {
        Swal.fire("No se ha borrado nada", "", "");
      }
    });
  };

  const updSwal = async (id, doc) => {
    const { isConfirmed } = await Swal.fire({
      title: "Input something",
      html: `
        <div class="h-full w-full flex flex-col gap-3 text-black">
          <h2>Nombre</h2>
          <input id="nombreInput" value="${doc.nombre}" class="bg-gray p-4 border-4 border-indigo-500/100" placeholder="Nombre"/>
          <h2>Precio</h2>
          <input id="precioInput" value="${doc.precio}" class="bg-gray p-4 border-4 border-indigo-500/100" placeholder="Precio"/>
          <h2>Descripcion</h2>
          <input id="descripcionInput" value="${doc.descripcion}" class="bg-gray p-4 border-4 border-indigo-500/100" placeholder="Precio"/>
          <h2>Imagen</h2>
          <input id="imagenInput" value="${doc.imagen}" class="bg-gray p-4 border-4 border-indigo-500/100" placeholder="Precio"/>
          <h2>Tipo</h2>
          <input id="tipoInput" value="${doc.tipo}" class="bg-gray p-4 border-4 border-indigo-500/100" placeholder="Precio"/>
          <h2>Stock</h2>
          <div class="flex gap-2 justify-center items-center">
          <input value="${doc.stock}" id="stockInput" type="checkbox" class="bg-gray p-4 border-4 border-indigo-500/100"> ¿Tiene stock? </input>
          </div>
          <h2>Tipea el nombre para confirmar</h2>
          <input id="aceptar" type="text" class="bg-gray p-4 border-4 border-indigo-500/100">
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
    });

    if (isConfirmed) {
     
      setnombreProd(document.getElementById("nombreInput").value);
      setdescripcionProd(document.getElementById("descripcionInput").value);
      setprecioProd(document.getElementById("precioInput").value);
      settipoProd(document.getElementById("tipoInput").value);
      setimgProd(document.getElementById("imagenInput").value);
      setisStockProd(document.getElementById("stockInput").checked);
      
      settesttt(id);
    }
  };

  useEffect(() => {
  
    if (testtt) {
      
      updProd(testtt);
      settesttt(null);
    }
  }, [testtt]);

  const addProduct = async () => {
    await addDoc(collection(db, "productos"), {
      nombre: nombreProd,
      precio: precioProd,
      descripcion: descripcionProd,
      stock: isStockProd,
      tipo: tipoProd,
      imagen: imgProd,
    });
    setproducto([]);
  };

  const updProd = async (idProducto) => {
    
    await updateDoc(doc(db, "productos", idProducto), {
      nombre: nombreProd,
      precio: precioProd,
      descripcion: descripcionProd,
      stock: isStockProd,
      tipo: tipoProd,
      imagen: imgProd,
    });
    setproducto(
      producto.map((item) => {
        if (item.id === idProducto) {
          return {
            id: item.id,
            nombre: nombreProd,
            precio: precioProd,
            descripcion: descripcionProd,
            stock: isStockProd,
            tipo: tipoProd,
            imagen: imgProd,
          };
        } else {
          return item;
        }
      })
    );
  };

  const nameinputHandler = () => {
    setnombreProd(event.target.value);
  };

  const precioinputHandler = () => {

    setprecioProd(event.target.value);
  };

  useEffect(() => {
    if (user) {
      goy();
    }
  }, [user]);

  useEffect(() => {
    
    gey();
   
  }, [producto]);

  useEffect(() => {
    console.log(isLoggedIn)
    if (!user && !isLoggedIn) {
      router.push("/"); // Redirige al usuario a la página de inicio de sesión si no está autenticado
    }
  }, [user, isLoggedIn])

  return (
    <>
        <>
          {isLoading ? (
            <Spinner></Spinner>
          ) : (
            <div
              style={{ minHeight: "100vh" }}
              className="h-full w-full bg-black text-white flex flex-col justify-center items-center py-6"
            >
              {producto != null && usuarioValido ? (
                <div
                  style={{ minHeight: "100vh" }}
                  className="pt-6 flex flex-wrap gap-6 items-center justify-center"
                >
                  {producto.map((doc, index) => (
                    <div
                      className=" admProd flex flex-nowrap lg:flex-wrap justify-center items-center gap-6 flex-col mt-16 text-black"
                      key={index}
                    >
                      <div>
                        <img width="300px" src={doc.imagen} />
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <h2 className="text-3xl">{doc.nombre}</h2>
                        <p>
                          Precio: <b>{doc.precio}</b>
                        </p>
                        <p>{doc.descripcion}</p>
                        
                          {doc.stock == true ? (
                            <p>Con stock</p>
                          ) : (
                            <p>
                              <b>Sin stock</b>
                            </p>
                          )}
                        
                        <p>{doc.tipo}</p>
                        <button
                          className="p-3 my-6 bg-black text-gray-200 "
                          onClick={() => {
                            showSwal(doc.id, doc);
                          }}
                        >
                          Click aquí para borrar
                        </button>
                        <button
                          className="p-3 my-6 bg-black text-gray-200 "
                          onClick={() => {
                            updSwal(doc.id, doc);
                          }}
                        >
                          Click aquí para editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{ minHeight: "100vh" }}
                  className="text-white h-full w-full bg-black flex items-center justify-center"
                >
                  No tienes acceso
                </div>
              )}
              <div className="flex justify-center items-center">
                <button
                  className="p-3 my-6 bg-white text-gray-700 "
                  onClick={() => {
                    setmostrarAdd(!mostrarAdd);
                  }}
                >
                  {mostrarAdd ? <>Ocultar</> : <>Añadir nuevo</>}
                </button>
              </div>
              {mostrarAdd && (
                <div className=" flex-col bg-white text-black w-96 h-[46rem] py-36 flex justify-center items-center gap-6">
                  <h2>Nombre</h2>
                  <input
                    className="border-4 border-gray-500/100 p-1 text-gray-500"
                    onChange={nameinputHandler}
                    type="text"
                    placeholder="Nombre a agregar"
                  />
                  <h2>Precio</h2>
                  <input
                    className="border-4 border-gray-500/100 p-1 text-gray-500"
                    onChange={precioinputHandler}
                    type="text"
                    placeholder="Precio a agregar"
                  />
                  <h2>Descripcion</h2>
                  <input
                    className="border-4 border-gray-500/100 p-1 text-gray-500"
                    onChange={() => {
                      setdescripcionProd(event.target.value);
                    }}
                    type="text"
                    placeholder="Descripcion a agregar"
                  />
                  <h2>Imagen</h2>
                  <input
                    className="border-4 border-gray-500/100 p-1 text-gray-500"
                    onChange={() => {
                      setimgProd(event.target.value);
                    }}
                    type="text"
                    placeholder="Imagen a agregar"
                  />
                  <h2>Tipo</h2>
                  <input
                    className="border-4 border-gray-500/100 p-1 text-gray-500"
                    onChange={() => {
                      settipoProd(event.target.value);
                    }}
                    type="text"
                    placeholder="Tipo a agregar"
                  />
                  <div className="flex gap-2">
                    <h2>Stock</h2>
                    <input
                      className="border-4 border-gray-500/100 p-1 text-gray-500"
                      onChange={() => {
                        setisStockProd(event.target.value);
                      }}
                      type="checkbox"
                      placeholder="Stock a agregar"
                    />
                  </div>
                  <button
                    onClick={addProduct}
                    className=" border-4 border-gray-500/100 bg-gray-600 py-2 px-12 text-white "
                  >
                    Añadir
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      
    </>
  );
  
}

