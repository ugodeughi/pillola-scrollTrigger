# 🖼️ Animazioni con GSAP ScrollTrigger in React

Questa pillola mostra come creare un effetto **fade-in e scale-in** quando un'immagine entra nella viewport e **fade-out e scale-out** quando esce, utilizzando **GSAP ScrollTrigger** in React.

## 📌 Tecnologie utilizzate
- **React** (Hooks: `useRef`, `useEffect`)
- **GSAP** (`gsap`, `ScrollTrigger`)

## ✨ Funzionamento
1. **Quando l'immagine entra nella viewport** (80% dall'alto) → appare con `opacity: 1` e si ingrandisce (`scale: 1`).
2. **Quando l'immagine esce in alto** (2% della viewport) → inizia a scomparire.
3. **Quando esce completamente (-50%)** → è completamente invisibile.

## 📜 Codice React + GSAP
```jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

export default function ScrollImages() {
  const imageRefs = useRef([]);

  useEffect(() => {
    imageRefs.current.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        img,
        { opacity: 1, scale: 1 },
        {
          opacity: 0,
          scale: 0.8,
          scrollTrigger: {
            trigger: img,
            start: "top 2%",
            end: "top -50%",
            scrub: true,
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
          ref={(el) => (imageRefs.current[index] = el)}
          className="scroll-image"
          alt={`Scroll Image ${index + 1}`}
        />
      ))}
    </div>
  );
}
```

## 🎨 CSS per lo stile
```css
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding: 100px 0;
}

.scroll-image {
  width: 50vw;
  opacity: 0;
}
```

## 🔹 Spiegazione
- `useRef()` raccoglie i riferimenti agli `<img>`.
- `useEffect()` attiva le animazioni GSAP dopo il render.
- `ScrollTrigger` controlla quando avviare il **fade-in e fade-out**.
- `scrub: true` rende l'animazione fluida sincronizzandola con lo scroll.

## 🚀 Prova a personalizzare!
- **Vuoi animare solo alcune immagini?** Usa una classe CSS specifica e filtra con `document.querySelectorAll(".animate")`.
- **Vuoi un fade-out più lento?** Cambia `end: "top -30%"`.
- **Vuoi aggiungere più immagini?** Basta aggiungerle all'array `images`.

🔹 **Ora puoi creare effetti di scroll reveal in React con GSAP!** 🎉
