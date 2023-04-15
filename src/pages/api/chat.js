import { openai, configuration } from "@/openaiconfig";

export default async function Chat(req, res) {
  try {
  if (!configuration.apiKey) throw "OpenAI API key not configured, please follow instructions in README.md";
  const {consulta} = req.body || '';
  if (consulta.trim().length === 0) throw "Porfavor ingresa una consulta"
  const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(consulta),
      temperature: 0.1,
      max_tokens: 256,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
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
  const capitalizedAnimal = consulta[0].toUpperCase() + consulta.slice(1).toLowerCase();
  return `Eres un gran clasificador de consultas para una empresa que vende productos de ferretería, sabes etiquetar las consultas que hacen los clientes en 4 tipos diferentes: 
  consulta de productos, consulta general, consulta no relacionada y consulta inentendible.
  la consulta del cliente es: ¿${capitalizedAnimal}?
  ¿que etiqueta le pones?: `;
}