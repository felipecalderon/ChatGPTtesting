import { openai } from "@/openaiconfig";
const methods = {
    GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE', 
}
export default async function Imagen(req, res){
    const {GET, POST, PUT, DELETE} = methods
    
    switch(req.method){
        case GET: {
            try {
                const resp = await openai.createImage({
                    prompt: 'yo cursando el henry bootcamp',
                    n: 1,
                    size: '512x512',
                    response_format: "url"
                })
                const imagen = resp.data.data[0].url || 'oki'
                console.log('OKII')
                return res.json({msje: imagen})
            } catch (error) {
                console.log(error)
                return res.json({msje: 'no se pudo generar la imagen'})
            }
        }
        default: return res.json({msje: 'desde otro'})
    }
}
