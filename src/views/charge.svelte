<svelte:window on:keydown={ handleKeydown }></svelte:window>

<form autocomplete='off' in:fly={{x: 20, duration: 500}}>
  <!-- amount display -->
  <input value={price} type='text' class='input pad' disabled>
  <br>
  <!-- number pad buttons -->
  <input on:click={() => add('1')} type='button' class='number' value='1'>
  <input on:click={() => add('2')} type='button' class='number' value='2'>
  <input on:click={() => add('3')} type='button' class='number' value='3'>
  <br>
  <input on:click={() => add('4')} type='button' class='number' value='4'>
  <input on:click={() => add('5')} type='button' class='number' value='5'>
  <input on:click={() => add('6')} type='button' class='number' value='6'>
  <br>
  <input on:click={() => add('7')} type='button' class='number' value='7'>
  <input on:click={() => add('8')} type='button' class='number' value='8'>
  <input on:click={() => add('9')} type='button' class='number' value='9'>
  <br>
  <input on:click={() => add('0')} type='button' class='number' value='0'>
  <input on:click={() => add('00')} type='button' class='number' value='00'>
  <input on:click={remove} type='button' class='material-icons delete' value='backspace'>
  <br>
  <!-- charge button -->
  <button on:click|preventDefault={purchase} class="charge">{language.charge}</button>
</form>

<script>
  import {fly} from 'svelte/transition'
  import translations from '../../assets/lang.json'
  import {router} from '@spaceavocado/svelte-router'
  import {settings} from '../stores/settings'
  import swal from 'sweetalert'
  import {BACKSPACE, ENTER, SPACE} from '../utils.js'

  let language = translations[$settings.language]
  let native = ''
  let price

  $: {
    if ($settings.currency.match(/COP|BYN|CLP|ISK|JPY|KRW|PYG|UGX|UYU|VND/g) !== null) {
      // these currencies have no decimals
      price = native || 0
    } else if ($settings.currency.match(/BHD|KWD|OMR/g) !== null) {
      // these currencies have 3 decimals
      price = parseFloat(native / 100).toFixed(3) || 0
    } else {
      // these currencies have 2 decimals
      price = parseFloat(native / 100).toFixed(2) || 0
    }
  }

  if (!localStorage.getItem('account')) {
    $router.push('/settings')
  }

  // adds pressed key to amount display
  function add (num) {
    native = native + num
  }

  // removes pressed key from amount display
  function remove () {
    native = native.slice(0, -1)
  }

  // begins purchase
  function purchase () {
    // if amount is empty, notify merchant and stop function
    if (native === '' || native === 0) { // string vs int?
      swal('Error!', language.errors.price, 'error')
      return
    }
    // show QR page and pass data
    $router.push(`/sale/${price}%20${$settings.currency}`)
  }

  function handleKeydown ({keyCode}) {
    if (swal.getState().isOpen) {
      return
    }
    switch (keyCode) {
      // Digits 0-9
      case 48: add('0'); break
      case 49: add('1'); break
      case 50: add('2'); break
      case 51: add('3'); break
      case 52: add('4'); break
      case 53: add('5'); break
      case 54: add('6'); break
      case 55: add('7'); break
      case 56: add('8'); break
      case 57: add('9'); break
      case BACKSPACE: remove(); break
      case ENTER: case SPACE: purchase(); break
    }
  }
</script>

<style>
  /* remove outlines from form */
  form input:focus,
  form button:focus {
    outline: none;
  }
  /* amount display */
  input[type="text"] {
    margin: 2%;
    background: var(--background);
    width: 80%;
    border: 1px solid #d5d5d5;
    border-radius: 0.2em;
    font-size: 3em;
    text-align: center;
  }
  /* number pad buttons */
  .number {
    background: var(--background);
    color: var(--secondary);
    border: none;
    border-radius: 50%;
    text-align: center;
    width: 22%;
    -webkit-appearance: none;
    margin: 1%;
    padding: 11% 0;
    font-size: 230%;
    line-height: 0;
    box-shadow: var(--primary) 0 0 1px 1px;
  }

  .number:active {
    background: var(--primary);
    color: #fff;
  }
  /* delete button */
  .delete {
    box-shadow: var(--red) 0 0 1px 1px;
    background: var(--background);
    color: var(--secondary);
    border: none;
    border-radius: 50%;
    text-align: center;
    width: 22%;
    -webkit-appearance: none;
    margin: 1%;
    padding: 11% 0;
    font-size: 230%;
    line-height: 0;
    display: inline-block;
    position: relative;
    vertical-align: bottom;
  }

  .delete:active {
    background: var(--red);
    color: #fff;
  }

  /* charge button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 0.75em;
    border-radius: 0.4em;
    width: 80%;
    height: 2.47em;
    border: 1px solid var(--green);
    background: var(--green);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
