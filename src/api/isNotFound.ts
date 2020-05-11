export default (error: any) => {
  const status = error && error.response && error.response.status
  return status === 404
}
