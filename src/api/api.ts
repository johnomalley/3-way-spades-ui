 
import agent from 'superagent'
import { type Credentials } from '../setup/setupReducer'

const apiGatewayUrl = 'https://v0y1ipttbc.execute-api.us-east-2.amazonaws.com/default'

const baseUrl = process.env.BASE_URL ?? apiGatewayUrl

let apiHeaders: Readonly<Record<string, string>> = {}

const setCredentials = (credentials: Credentials) => {
  apiHeaders = {
    'x-api-key': credentials.apiKey,
    'x-player-id': credentials.playerId,
  }
}

const url = (path: string) => `${baseUrl}/${path}`

const get = async (path: string): Promise<unknown> => {
  const { body } = await agent.get(url(path)).set(apiHeaders)
  return body
}

const post = async (path: string, requestBody: object): Promise<unknown> => {
  const { body } = await agent.post(url(path)).set(apiHeaders).send(requestBody)
  return body
}

const del = async (path: string) => {
  await agent.delete(url(path)).set(apiHeaders)
}

export default {
  setCredentials,
  get,
  post,
  delete: del
}
