import React from "react";

export default function page() {
  return (
    <section className="min-h-screen flex justify-center items-center bg-black text-white w-full">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-36 lg:gap-6 ">
        <div className="w-3/6 flex justify-center items-center ">
          <img
            className="rounded-full scale-150 sm:scale-100 transition hover:scale-105 delay-75 hover:rotate-12 hover:skew-x-2 shadow-[0_0_2rem] shadow-white "
            alt="SuperHero Bark"
            src="SuperHero.webp"
          />
        </div>

        <div className="w-3/6 flex justify-center items-center lg:justify-start lg:items-start flex-col gap-3">
          <div className="flex items-center gap-1  text-[25px]  lg:text-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 icon icon-tabler icon-tabler-brand-instagram hover:stroke-blue-700"
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
            <a href="">BarkMobb</a>
          </div>

          <div className="flex items-center w-[16rem] text-center text-[25px]  lg:text-2xl gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 icon icon-tabler icon-tabler-phone hover:stroke-blue-700"
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
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
            <a href="">+54 11 9343 2424</a>
          </div>

          <div className="flex items-center text-[25px] lg:text-2xl gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 icon icon-tabler icon-tabler-mail hover:stroke-blue-700"
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
              <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <a href="">barkmobb@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
