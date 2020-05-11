import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

export default (path: string) => put(push(path))
