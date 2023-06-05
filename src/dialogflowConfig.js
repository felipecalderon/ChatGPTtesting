//conversión necesaria para que se pueda leer la clave privada sin problemas

const convPrivateKey = process.env.DFLOW_SECRETKEY.split(String.raw`\n`).join('\n');

const claves = {
  credentials: {
    client_email: process.env.DFLOW_EMAIL,
    private_key: convPrivateKey,
  },
  projectId: process.env.DFLOW_IDPROJECT,
  sessionLanguageCode: 'es',
}

module.exports = claves;