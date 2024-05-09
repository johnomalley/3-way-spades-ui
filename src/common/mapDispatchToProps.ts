import { type Dispatch } from 'redux'
import { push } from 'connected-react-router'
import { type DefaultDispatchProps } from './types'

export default (dispatch: Dispatch): DefaultDispatchProps => ({
  dispatch,
  push: (path: string) => dispatch(push(path))
})
