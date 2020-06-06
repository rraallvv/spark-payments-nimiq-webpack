<div id="container" in:fly={{x:20, duration: 500}}>
  {#if !loading}
  <div id="spinner">
    <Circle size="1.225" color="var(--primary)" unit="em"/>
  </div>
  {/if}
  <div id="loader" class={loaderClasses} hidden={!loading}>
    <div>
      <Pulse id="icon" size="60" color="var(--primary)" unit="px"/>
    </div>
  </div>
  <div>
    <span>{amount}</span>
    <p id="price">~ {unitPrice}</p>
    <div id="qr-container">
      <canvas id="qr-canvas" hidden={!qr} on:click={test}></canvas>
    </div>
    <div hidden={qr} id="cointext" on:click={test}>
      <div id="content">
        <img id="cointext-logo" src='../assets/img/nimiqtext.png' alt="Cointext">
        <p id="invoice">{invoice}</p>
      </div>
    </div>
    <p hidden={tx.received == 0}>{language.partial}: {partial} {$settings.format}</p>
    <p hidden={tx.received > 0}>{language.waiting}</p>
    <br>
    {#if !$router.currentRoute.query.address}
    <button on:click={cancel} class="cancel">{language.cancel}</button>
    {/if}
  </div>
</div>

<script>
  import {fly} from 'svelte/transition';
  import * as spark from '../helpers'
  import axios from 'axios'
  import {router} from '@spaceavocado/svelte-router';
  import translations from '../../../assets/lang.json';
  import swal from 'sweetalert'
  import {settings} from '../store/settings';
  import {socket} from '../store/socket';
  import {site} from '../store/site';
  import {onMount} from 'svelte';
  import QrCreator from 'qr-creator'
  import { Pulse, Circle, Circle2, Circle3 } from 'svelte-loading-spinners'

  let loading = true
  let qr = true
  let loaderClasses = ''
  let amount = ''
  let address = ''
  let uri = ''
  let invoice = ''
  let price = {
    luna: '0',
    nimiq: '0'
  }
  let tx = {
    received: 0,
    locked: false
  }
  let language = translations[$settings.language];

  $: unitPrice = $settings.format === 'luna' ? price.luna : price.nimiq;

  $: partial = $settings.format === 'nimiq' ? parseFloat(tx.received).toFixed(5) : (tx.received * 100000).toFixed(0);

  $: {
    if (document.querySelector('#qr-canvas')) {
      // render qrcode
      QrCreator.render({
        text: uri,
        radius: 0.0, // 0.0 to 0.5
        ecLevel: 'L', // L, M, Q, H
        fill: '#000000', // foreground color
        background: null, // color or null for transparent
        size: 256 // in pixels
      }, document.querySelector('#qr-canvas'));
    }
  }

  function test() {
    qr = !qr
  }

  function cancel() {
    // return home
    $router.go(-1)
    // unsubscribe from tx events
    $socket.emit('unsubscribe', address.replace(/ /g, ''))
    console.log('not listening')
  }

  // listen for 'tx' event from insight
  $socket.on('tx', data => {
    // if address doesn't matches the address we have in settings ignore tx
    if (data.recipient !== address) {
      return;
    }
    // set amount received and instantsend status
    tx.received = tx.received + (data.value / 100000)
    tx.locked = false // data.txlock
    let status = tx.locked
    let duffs = Math.round(parseFloat(price.nimiq) * 100000)
    // we figure out if the cointext screen is showing when we receive funds - for analytics
    let method = qr ? 'qr' : 'cointext'
    console.log(`incoming: ${tx.received} to ${address}`)
    // console.log(`instantsend: ${tx.locked}`)
    // if the amount is what we're looking for (or more), show confirmed screen
    if (tx.received >= parseFloat(price.nimiq)) {
      // customer completes transaction - we send value, IS status, local currency, qr or cointext - for analytics
      if ($router.currentRoute.query.address) {
        $router.replace(`/sale/confirmed/${status}?platform=web`)
        window.dataLayer.push({
          event: 'GAEvent',
          eventCategory: 'Web Transaction',
          eventAction: 'Completed',
          eventLabel: `${address},${data.txid},${status},${$settings.currency},${method}`,
          eventValue: duffs
        })
      } else {
        $router.replace(`/sale/confirmed/${status}`)
        window.dataLayer.push({
          event: 'GAEvent',
          eventCategory: 'POS Transaction',
          eventAction: 'Completed',
          eventLabel: `${address},${data.txid},${status},${$settings.currency},${method}`,
          eventValue: duffs
        })
      }
    } else {
      let remaining = parseFloat(price.nimiq) - tx.received
      // safeUrl/#_request/NQAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIII/123.12345_
      uri = `${$site.safeUrl}/#_request/${address.replace(/ /g, '')}/${remaining}_`
      // TODO: change price, debate over remaining vs received
    }
  });

  onMount(async () => {
    // get address
    address = $router.currentRoute.query.address || await spark.getAddress($settings.account)
    // listen for transaction
    $socket.emit('subscribe', address.replace(/ /g, ''))
    console.log('listening')
    // set the amount
    amount = $router.currentRoute.params.amount.replace(/%20/g, ' ')
    // get current price
    let attempts = 3
    let result = 0
    do {
      result = parseFloat(await spark.getExchangeRate(amount.split(' ')[1]))
    } while (isNaN(result) && --attempts > 0)
    if (attempts === 0) {
      swal('Error!', language.errors.rate, 'error')
      $router.push('/')
      return
    }
    price.nimiq = `${(parseFloat(amount) / parseFloat(result)).toFixed(5)} NIMIQ`
    // set pice in luna
    price.luna = `${(parseFloat(price.nimiq) * 100000).toFixed(0)} LUNA`
    // set uri for qr code
    // safeUrl/#_request/NQAABBBBCCCCDDDDEEEEFFFFGGGGHHHHIIII/123.12345_
    uri = `${$site.safeUrl}/#_request/${address.replace(/ /g, '')}/${parseFloat(price.nimiq)}_`
    // set nimiq amount in duffs
    let duffs = Math.round(parseFloat(price.nimiq) * 100000)
    // push data to analytics
    // window.dataLayer.push({
    //   event: 'GAEvent',
    //   eventCategory: 'Transaction',
    //   eventAction: 'Initiated',
    //   eventLabel: address,
    //   eventValue: duffs
    // })
    // set url for cointext or nimiqtext
    // let url = `https://api.nimizuela.org/invoice?addr=${address}&amount=${duffs}`
    let url = `https://api.nimizuela.org/nimiqtext?addr=${address.replace(/ /g, '')}&amount=${duffs}`
    // get invoice number from cointext
    console.log(url)
    axios.get(url)
      .then(result => {
        invoice = `"BUY ${result.data}"`
        console.log(result.data)
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
    // loading is done
    loading = false
    loaderClasses = 'fade-out'
  });
</script>

<style scoped>

  #container {
    position: relative;
  }

  /* loader background */
  #loader {
    background-color: var(--background);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    transition: .6s;
  }
  /* loader fade out animation */
  .fade-out {
    opacity: 0;
  }
  /* loader sipinner */
  #loader > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  #spinner {
    position: fixed;
    top: 18px;
    left: 20px;
  }

  img {
    position: absolute;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: auto;
  }

  #qr-container {
    position: relative;
    width: 79.8%;
    margin: 0 auto;
    padding-bottom: 79.8%;
  }

  #qr-canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }

  span {
    margin: 1% auto;
    width: 92%;
    text-align: center;
    color: var(--secondary);
    font-size: 3em;
  }

  p {
    margin: .7% auto;
    width: 92%;
    text-align: center;
    color: var(--secondary);
    font-size: 1.95em;
  }

  #cointext {
    position: relative;
    width: 79.8%;
    margin: 0 auto;
  }

  #cointext:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  #content {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #cointext-logo {
    margin-top: 1em;
  }

  #invoice {
    margin-top: 1em;
  }

  #price {
    margin: 0% auto;
    width: 92%;
    text-align: center;
    font-style: italic;
    color: var(--secondary);
    font-size: 1em;
  }
  /* cancel button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 0.75em;
    border-radius: 0.4em;
    width: 80%;
    height: 2.47em;
    border: 1px solid var(--red);
    background: var(--red);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
