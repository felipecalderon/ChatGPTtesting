import { openai, configuration } from "@/openaiconfig";

export default async function Chat(req, res) {
  try {
  
  if (!configuration.apiKey) throw "OpenAI API key not configured, please follow instructions in README.md";
  const {consulta} = req.body || '';
  if (consulta.trim().length === 0) throw "Porfavor ingresa una consulta"

  const conversacion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
      messages: generatePrompt(req.body.consulta),
      temperature: 0.7,
      max_tokens: 256,
    });
  console.log(conversacion.data.choices[0].message.content);
  res.status(200).json({ result: conversacion.data.choices[0].message.content });
  
} catch(error) {
    if (error.response) res.status(error.response.status).json(error.response.data) 
    else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: error || 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(consulta) {
  const consultaMin = consulta.toLowerCase();
  return [
      { role: 'system', content: 'Eres un gran asistente conocedor de productos, sabes sus medidas, pesos y características, pueden ser valores aproximado, la respuesta debe ser directa y breve' },
      { role: 'user', content: `¿cuanto pesa y mide en altura, ancho y profundidad el producto ${consultaMin}?` }
    ];;
}