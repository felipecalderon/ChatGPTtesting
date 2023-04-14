'use client'
import { useState } from "react";
import styles from "../app/page.module.css";
export default function FormChat(){
    const [animalInput, setAnimalInput] = useState("");
    const [result, setResult] = useState();

    async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) throw data.error || new Error(`Request failed with status ${response.status}`);

      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
    return (
    <>
        <div className={styles.titulo}>
            <h3>¿Que preguntaría alguien que busca laburo?</h3>
        </div>
        <div className={styles.form}>
            <form onSubmit={onSubmit}>
            <input
            type="text"
            name="animal"
            placeholder="Ingresa tu pregunta"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input type="submit" value="Generar" />
            </form>
        </div>
            {result}
    </>
    )
}