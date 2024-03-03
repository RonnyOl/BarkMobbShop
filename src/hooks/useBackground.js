
export default function useBackground() {
    const r = Math.floor(Math.random() * 5);
    const imgs = [
        "https://i.imgur.com/dgr7zqv.jpeg",
        "https://i.imgur.com/T39ztmc.jpeg",
        "https://i.imgur.com/VomOgff.jpeg",
        "https://i.imgur.com/KfsXL3L.jpeg",
        "https://i.imgur.com/hTOtKti.jpeg"
    ];

    return {
        backgroundImage: `url(${imgs[r]})`,
        // Otros estilos que desees aplicar
    };
}
