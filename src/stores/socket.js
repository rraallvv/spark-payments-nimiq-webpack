import {readable} from 'svelte/store'
import io from 'socket.io-client'

export let socket

export function createSocket (env) {
  socket = readable(env === 'mainnet' ? io('https://insight.nimizuela.org:443') : io('https://testnet-insight.nimizuela.org:443'))
  return socket
};
