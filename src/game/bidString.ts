export default (bid: number) => {
  switch (bid) {
    case -1:
      return 'DN'
    case 0:
      return 'Nil'
    default:
      return String(bid)
  }
}
