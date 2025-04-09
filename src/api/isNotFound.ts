type ErrorWithResponse = Error & Readonly<{ response?: { status: number } }>

export default (error: unknown) => (error as ErrorWithResponse)?.response?.status === 404
