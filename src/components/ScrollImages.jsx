import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = ["/img/bosco.jpg", "/img/colibri.jpg", "/img/orsi.jpg", "/img/pigna.jpg"];

export default function ScrollImages() {
  const imageRefs = useRef([]); // Array per contenere i riferimenti agli <img>

  useEffect(() => {
    imageRefs.current.forEach((img) => {
      // Fade-in + Scale-in quando l'immagine entra nella viewport
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.8 }, // Stato iniziale: invisibile e ridotta
        {
          opacity: 1,
          scale: 1, // Stato finale: visibile e a grandezza naturale
          scrollTrigger: {
            trigger: img,
            start: "top 80%", // L'animazione inizia quando il top dell'immagine è all'80% della viewport
            end: "top 20%",   // L'animazione termina quando il top dell'immagine è al 20% della viewport
            scrub: true,      // L'animazione segue lo scroll in modo fluido
          },
        }
      );

      // Fade-out + Scale-out quando l'immagine esce dalla viewport verso l'alto
      gsap.fromTo(
        img,
        { opacity: 1, scale: 1 }, // Stato iniziale: visibile e a grandezza naturale
        {
          opacity: 0,
          scale: 0.8, // Stato finale: invisibile e ridotta
          scrollTrigger: {
            trigger: img,
            start: "top 2%",   // L'animazione inizia quando il top dell'immagine è al 2% della viewport
            end: "top -50%",   // L'animazione termina quando il top dell'immagine è fuori dalla viewport del 50%
            scrub: true,       // L'animazione segue lo scroll in modo fluido
          },
        }
      );
    });
  }, []);

  return (
    <div className="image-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          ref={(el) => (imageRefs.current[index] = el)} // Salva il riferimento all'elemento DOM in imageRefs.current
          className="scroll-image"
          alt={`Scroll Image ${index + 1}`}
        />
      ))}
    </div>
  );
}