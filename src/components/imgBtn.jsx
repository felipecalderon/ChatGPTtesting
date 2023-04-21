'use client'
import { useState } from 'react';
import Image from 'next/image';

export default function Button(){
    const [consulta, setConsulta] = useState("");
    const [result, setResult] = useState(null);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/imagen", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ consulta }),
          });
          const data = await response.json();
          if(data.msje) throw data.msje
          if (response.status !== 200) throw data.error || new Error(`Request failed with status ${response.status}`);
          console.log(data);
          setResult(data);
        } catch(error) {
          // Consider implementing your own error handling logic here
          console.error(error);
          alert(error);
        }
    }
    
    return (
    <div>
        <form onSubmit={onSubmit}>
        <input
        type="text"
        name="consulta"
        placeholder="Ingresa tu consulta"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        />
        <input type="submit" value="Generar" />
        </form>
        {
            result && <Image src={result} width={1024} height={1024} alt='probando chatgpt'/>
        }
    </div>
)}