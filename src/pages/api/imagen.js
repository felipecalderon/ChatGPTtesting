import { openai } from "@/openaiconfig";
const methods = {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE', 
}
export default async function Imagen(req, res){
    const {GET, POST, PUT, DELETE} = methods
    
    switch(req.method){
        case POST: {
            try {
                const {consulta} = req.body || '';
                if (consulta.trim().length === 0) throw "Porfavor ingresa una consulta"
                const resp = await openai.createImage({
                    prompt: consulta,
                    n: 1,
                    size: '1024x1024',
                    response_format: "url"
                })
                const imagen = resp.data.data[0].url || 'oki'
                return res.json(imagen)
            } catch (error) {
                console.log(error)
                return res.json({msje: 'no se pudo generar la imagen'})
            }
        }
        default: return res.json({msje: 'desde otro'})
    }
}
