import { put } from 'redux-saga/effects'
import { push } from 'redux-first-history'

export default (path: string) => put(push(path))
