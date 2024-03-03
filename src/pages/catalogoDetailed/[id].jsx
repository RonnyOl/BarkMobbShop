import { db } from "@/app/firebase/config";
import Footer from "@/components/Footer";
import ItemsMap from "@/components/ItemsMap";
import NavBar from "@/components/NavBar";
import { collection, query, where, getDocs } from "firebase/firestore";
import "@/app/globals.css";
import Swal from "sweetalert2";



export const getStaticPaths = async () => {
  // Obtener los IDs de los productos dinámicamente

  const productos = await getDocs(collection(db, "productos"));

  const productosData = productos.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const paths = productosData.map((producto) => ({
    params: { id: producto.id.toString() },
  }));
  // console.log(paths);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  // Obtener datos específicos del producto usando el ID
  const id = context.params.id;
  const productos = await getDocs(collection(db, "productos"));
  const productosData = productos.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const producto = productosData.find((item) => item.id.toString() === id);

  return {
    props: { producto },
  };
};

export default function Page({ producto }) {

  const alert = () => {
    Swal.fire({
      imageUrl: "https://d26lpennugtm8s.cloudfront.net/stores/001/047/739/rte/CulturaCervecera-LookAndBeer-Remera-Unisex-Regular-Cervecera-Lupulo-hops-Tabla-Talles1.jpeg",
      imageHeight: 500,
      imageAlt: "A tall image"
    });
  }
  return (
    <>
      <NavBar />
      <div className="contenedor-detailed bg-black flex flex-col xl:flex-row justify-center items-center">
        <div className="contendor_detailed-img flex justify-center items-center">
          <img
            className="bg-white px-6 pt-6 pb-36 detailed-img_img"
            src={producto.imagen}
          ></img>
        </div>

        <div className="contendor_detailed-info text-gray-300 w-full flex flex-col xl:items-start pl-6 items-center ">
          <h2 className="text-6xl my-6 text-center">
            <b>{producto.nombre}</b>
          </h2>
          <div className="border-b-4 border-gray-500 my-3 w-56"></div>
          <p className="text-xl xl:w-3/5 text-center pt-3 xl:text-left">
            {producto.descripcion} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus sint amet itaque aliquid, iste ex nostrum perferendis doloremque unde eos ipsa cupiditate vitae quod dolor.
          </p>
      
          <div className="flex justify-center items-center border-b-4 border-gray-500 my-6 w-56"></div>

          
            <span className="flex justify-center items-center"><p ><b className="text-4xl">${producto.precio} </b>ARS </p> </span>
            <div className="border-b-4 border-gray-500 my-6 w-56"></div>

            <h2 className="py-3 text-4xl">Talles</h2>

            
          <div className="talles my-6 flex gap-12 ">
            
            <div className="bg-white flex items-center justify-center text-gray-700 w-12 h-12">
              <b>M</b>
            </div>
            <div className="bg-white flex items-center justify-center text-gray-700 w-12 h-12">
              <b>L</b>
            </div>
            <div className="bg-white flex items-center justify-center text-gray-700 w-12 h-12">
              <b>XL</b>
            </div>
          </div>
          <div className="border-b-4 border-gray-500 my-6 w-56"></div>
            <div>
              {producto.stock ? <p className="text-4xl">Con stock</p>:<p className="text-4xl">Sin stock</p>}
              <button onClick={alert} className="p-3 my-3 border-4 bg-gray-300 text-gray-800 hover: border-white">Calcular medidas</button>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
