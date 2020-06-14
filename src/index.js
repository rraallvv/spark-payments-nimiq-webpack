import App from './app.svelte'
import {createSite} from './stores/site'
import {createSocket} from './stores/socket'
import {createSettings} from './stores/settings'
import createRouter, {ROUTER_MODE} from '@spaceavocado/svelte-router'

// View components
import ViewCharge from './views/charge.svelte'
import ViewSettings from './views/settings.svelte'
import ViewQr from './views/qr.svelte'
import ViewConfirmed from './views/confirmed.svelte'
import ViewConnection from './views/connection.svelte'
import ViewDonate from './views/donate.svelte'

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
