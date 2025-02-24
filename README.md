# 📌 Ottimizzazione delle Performance con `useMemo`

## 🚀 Introduzione

React ri-renderizza un componente ogni volta che il suo stato o le sue props cambiano. Se all'interno del componente c'è un **calcolo costoso**, questo viene rieseguito inutilmente ad ogni render, causando **rallentamenti**.

👉 **Soluzione? `useMemo`!**

✅ Evita calcoli ripetuti inutilmente.  
✅ Memorizza il **risultato** di una funzione complessa.  
✅ Migliora le performance evitando operazioni costose nei re-render.  

---

## 📌 Installazione

Se stai già usando React, `useMemo` è incluso di default. Assicurati di avere **React 16.8+**:

```bash
npm install react
# oppure
yarn add react
```

---

## ❌ Problema: Senza `useMemo`

Immaginiamo di avere un calcolo complesso (verifica se un numero è primo). Senza `useMemo`, il calcolo verrà rieseguito **ogni volta che il componente si aggiorna**, anche se non serve.

```tsx
import { useState } from "react";

function isPrime(num) {
  console.log("🔄 Calcolando se è primo...");
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(10);

  const prime = isPrime(number); // ⚠️ Ricalcolato ad ogni render!

  return (
    <div>
      <h2>{number} è primo? {prime ? "✅ Sì" : "❌ No"}</h2>
      <button onClick={() => setCount(count + 1)}>Incrementa ({count})</button>
      <button onClick={() => setNumber(number + 1)}>Cambia numero ({number})</button>
    </div>
  );
}
```

⚠️ **Problema**: Anche se premi "Incrementa" (che non modifica `number`), il calcolo viene rieseguito inutilmente.

---

## ✅ Soluzione: `useMemo`

Usando `useMemo`, React **memorizza il risultato** del calcolo e lo ricalcola solo **se il valore cambia**.

```tsx
import { useState, useMemo } from "react";

function isPrime(num) {
  console.log("🔄 Calcolando se è primo...");
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

export default function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(10);

  const prime = useMemo(() => isPrime(number), [number]); // ✅ Memoizzato!

  return (
    <div>
      <h2>{number} è primo? {prime ? "✅ Sì" : "❌ No"}</h2>
      <button onClick={() => setCount(count + 1)}>Incrementa ({count})</button>
      <button onClick={() => setNumber(number + 1)}>Cambia numero ({number})</button>
    </div>
  );
}
```

🎯 **Vantaggi**:  
✅ `isPrime()` viene ricalcolato **solo quando `number` cambia**.  
✅ Se premi "Incrementa", il calcolo **non viene rieseguito**.  
✅ **Performance migliorata** per operazioni costose.  

---

## 🔥 Quando usare `useMemo`?

| Scenario | Usare `useMemo`? |
|---|---|
| Il calcolo è **semplice e veloce** | ❌ No |
| Il calcolo è **pesante (es. array filtering, sorting, operazioni matematiche complesse)** | ✅ Sì |
| Il valore calcolato **non cambia spesso** | ✅ Sì |
| Usi il valore in un **componente figlio** per evitare re-render | ✅ Sì |

⚠️ **Attenzione!** Non abusare di `useMemo` su operazioni semplici, altrimenti rischi di **complicare il codice senza reali benefici**.

---

## 📌 Conclusione

React è potente, ma ottimizzare le performance è essenziale nelle app più grandi. `useMemo` ti aiuta a **migliorare la velocità**, evitando calcoli inutili.  

🚀 **Ti è stato utile? Hai mai usato `useMemo`?** Scrivilo nei commenti!  

📌 #React #Performance #useMemo #PilloleDiWebDev #UgoDeUghi
