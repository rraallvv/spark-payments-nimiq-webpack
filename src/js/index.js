import App from './app.svelte'
import {createSite} from './store/site'
import {createSocket} from './store/socket'
import {createSettings} from './store/settings'
import createRouter, {ROUTER_MODE} from '@spaceavocado/svelte-router'

// View components
import ViewCharge from './view/charge.svelte'
import ViewSettings from './view/settings.svelte'
import ViewQr from './view/qr.svelte'
import ViewConfirmed from './view/confirmed.svelte'
import ViewConnection from './view/connection.svelte'
import ViewDonate from './view/donate.svelte'

const env = 'testnet'

createSite({
  baseurl: __BASEURL__,
  brand: 'Some Brand',
  title: 'Svelte Router Boilerplate Template',
  // mainnet: https://safe.nimiq.com - testnet: https://safe.nimiq-testnet.com
  safeUrl: env === 'mainnet' ? 'https://safe.nimiq.com' : 'https://safe.nimiq-testnet.com',
  // mainnet: https://hub.nimiq.com - testnet: https://hub.nimiq-testnet.com
  hubUrl: env === 'mainnet' ? 'https://hub.nimiq.com' : 'https://hub.nimiq-testnet.com'
})

// Create a new router
createRouter({
  mode: ROUTER_MODE.HASH,
  basename: __BASEURL__,
  routes: [
    {
      path: '/',
      name: 'CARGE',
      component: ViewCharge
    },
    {
      path: '/settings',
      name: 'SETTINGS',
      component: ViewSettings
    },
    {
      path: '/sale/:amount',
      name: 'QR',
      component: ViewQr
    },
    {
      path: '/sale/confirmed/:status',
      name: 'CONFIRMED',
      component: ViewConfirmed
    },
    {
      path: '/connection',
      name: 'CONNECTION',
      component: ViewConnection
    },
    {
      path: '/donate',
      name: 'DONATE',
      component: ViewDonate
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

createSocket(env)

createSettings({
  account: localStorage.getItem('account') || '',
  password: '',
  language: localStorage.getItem('language') || 'en',
  currency: localStorage.getItem('currency') || 'USD',
  format: localStorage.getItem('format') || 'nimiq'
})

/* eslint-disable no-new */
new App({
  target: document.body
})
