import dialogflow from '@google-cloud/dialogflow'
import {credentials, projectId, sessionLanguageCode} from "@/dialogflowConfig";

export default async function POST(req, res) {
    console.log(credentials, projectId, sessionLanguageCode);
    const dv2 = dialogflow.v2
    const sessionClient = new dv2.SessionsClient({credentials});
    // Define la información de la sesión
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, 'user321');
    // Envia una frase a Dialogflow para procesarla
    async function processPhrase(phrase) {
        try {
            const request = {
            session: sessionPath,
            queryInput: {
                text: {
                text: phrase,
                languageCode: sessionLanguageCode,
                },
            },
            };
        
            const responses = await sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
        
            console.log(result.fulfillmentText);  
        } catch (error) {
            console.log('Error con las credenciales de Dialogflow');
        }
    }

    
    const demoFrase = 'El peso aproximado de una placa de Volcanita 10mm Standard (azul) es de 22,5 kg y sus medidas son de 1,20 metros de ancho x 2,40 metros de alto x 10 mm de profundidad.'
    processPhrase(demoFrase)
    res.status(200).json({ result: demoFrase });
}

