<div in:fly={{x: 20, duration: 500}}>
  <br>
  <p>{language.payment_received}&nbsp;
    {#if locked === 'true'}
    <img id="lock" src="../../assets/img/locked.png" alt="Locked">
    {:else}
    <img id="lock" src="../../assets/img/unlocked.png" alt="Not Locked">
    {/if}
  </p>
  <br>
  <img src='../../assets/img/confirm.png' alt="Confirmed">
  <br>
  <p>{language.thanks}</p>
  <br>
  {#if !web}
  <button on:click={done}>{language.done}</button>
  {/if}
</div>

<script>
  import {fly} from 'svelte/transition'
  import {router} from '@spaceavocado/svelte-router'
  import translations from '../../assets/lang.json'
  import * as spark from '../helpers'
  import {onMount} from 'svelte'
  import {socket} from '../stores/socket'
  import {settings} from '../stores/settings'

  let locked = '0'
  let language = translations[$settings.language]
  let address = ''
  let web

  $: web = $router.currentRoute.query.platform === 'web'

  function done () {
    // navigate home
    $router.replace('/')
  }

  function play () {
    // ka-fucking-ching!
    let audio = new Audio(require('../../assets/kaching.mp3'))
    let audioPromise = audio.play()

    if (audioPromise !== undefined) {
      audioPromise.then(_ => {
        // autoplay started!
      }).catch(error => {
        // autoplay was prevented
        console.log(error)
      })
    }
  }

  onMount(async () => {
    // set the status
    locked = $router.currentRoute.params.status
    // get address
    address = $router.currentRoute.query.address || await spark.getAddress($settings.account)
    // stop listening for tx events
    $socket.emit('unsubscribe', address.replace(/ /g, ''))
    console.log('not listening')
    // update xpub index on successful tx
    let index = localStorage.getItem('index')
    index = parseFloat(index) + 1
    localStorage.setItem('index', index)
    play()
  })
</script>

<style>
  p {
    color: var(--dark);
    margin: 1% auto;
    width: 92%;
    text-align: center;
    font-size: 1.85em;
  }
  #lock {
    width: 0.76em;
  }
  /* charge button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 0.75em;
    border-radius: 0.4em;
    width: 80%;
    height: 2.47em;
    border: 1px solid var(--primary);
    background: var(--primary);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
