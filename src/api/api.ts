import * as agent from 'superagent'

const baseUrl = 'https://v0y1ipttbc.execute-api.us-east-2.amazonaws.com/default'

const apiKeyHeader = {
  'x-api-key': '?'
}

const setApiKey = (apiKey: string) => {
  apiKeyHeader['x-api-key'] = apiKey
}

const url = (path: string) => `${baseUrl}/${path}`

const get = async (path: string): Promise<any> => {
  const { body } = await agent.get(url(path)).set(apiKeyHeader)
  return body
}

const post = async (path: string, requestBody: object): Promise<any> => {
  const { body } = await agent.post(url(path)).set(apiKeyHeader).send(requestBody)
  return body
}

export default {
  setApiKey,
  get,
  post
}
