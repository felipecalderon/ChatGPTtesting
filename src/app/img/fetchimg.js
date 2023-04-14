const fetchimg = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/imagen", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json()
        return {data}
    } catch(err){
        // console.log(err)
        throw 'Error al solicitar data'
    }

}

export {fetchimg}   