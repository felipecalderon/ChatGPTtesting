import { openai, configuration } from "@/openaiconfig";

export default async function Chat(req, res) {
  try {
  if (!configuration.apiKey) throw "OpenAI API key not configured, please follow instructions in README.md";
  const {animal} = req.body || '';
  if (animal.trim().length === 0) throw "Please enter a valid animal"
  const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
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

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Eres un gran clasificador de consultas para una empresa que vende productos de ferretería, sabes etiquetar las consultas que hacen los clientes en 4 tipos diferentes: 
  consulta de productos, consulta general, consulta no relacionada y consulta inentendible.
  la consulta del cliente es: ¿${capitalizedAnimal}?
  ¿que etiqueta le pones?: `;
}