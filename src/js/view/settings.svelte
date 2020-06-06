<div in:fly={{x:20, duration: 500}}>
  {#if camera}
  <div>
    <div class='video-wrapper'>
      <div class='guides-area'>
        <div class='guidetl'></div>
        <div class='guidetr'></div>
        <div class='guidebl'></div>
        <div class='guidebr'></div>
      </div>
      <div class='video-crop'>
        <video in:videoMounted />
      </div>
    </div>
    <button style="background: var(--red); border: 1px solid var(--red);" on:click={() => camera = false}>{language.cancel}</button>
  </div>
  {:else}
  <form autocomplete='off'>
    <p>{language.address}</p>
    <div id="wrap">
      <input id="address" bind:value={address} type='text' class='input settings' placeholder='NQ'>
      <button id="scan" on:click|preventDefault={() => camera = true}><div class='show-camera'/></button>
      <button id="wallet" on:click|preventDefault={wallet}><div class='pick-wallet'/></button>
    </div>
    <!-- <input bind:value={address} type='text' class='input settings'> -->
    <p>{language.password}</p>
    <div id="wrap">
      <input id="password" value={password} on:change={passwordChanged} type={passwordFieldType} class='input settings' placeholder={pw}>
      <button id="show-password" on:click|preventDefault={togglePasswordFieldType}><div class={passwordFieldType === "password" ? "pw-visible" : "pw-hidden"}/></button>
    </div>
    <p>{language.language}</p>
    <select bind:value={languages}>
      <option value="ar">العربية</option>
      <option value="de">Deutsch</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="it">Italiano</option>
      <option value="nl">Nederlands</option>
      <option value="pl">Polski</option>
      <option value="pt-br">Português</option>
      <option value="sk">Slovenština</option>
      <option value="zh-Hans">中文</option>
    </select>
    <p>{language.currency}</p>
    <select bind:value={currency}>
      <option value="AED">AED - United Arab Emirates Dirham</option>
      <option value="AFN">AFN - Afghan Afghani</option>
      <option value="ARS">ARS - Argentine Peso</option>
      <option value="AUD">AUD - Australian Dollar</option>
      <option value="BBD">BBD - Barbadian Dollar</option>
      <option value="BDT">BDT - Bangladeshi Taka</option>
      <option value="BGN">BGN - Bulgarian Lev</option>
      <option value="BHD">BHD - Bahraini Dinar</option>
      <option value="BMD">BMD - Bermudan Dollar</option>
      <option value="BND">BND - Brunei Dollar</option>
      <option value="BOB">BOB - Bolivian Boliviano</option>
      <option value="BRL">BRL - Brazilian Real</option>
      <option value="BTN">BTN - Bhutanese Ngultrum</option>
      <option value="BYN">BYN - Belarusian Ruble</option>
      <option value="BZD">BZD - Belize Dollar</option>
      <option value="CAD">CAD - Canadian Dollar</option>
      <option value="CHF">CHF - Swiss Franc</option>
      <option value="CLP">CLP - Chilean Peso</option>
      <option value="CNY">CNY - Chinese Yuan</option>
      <option value="COP">COP - Colombian Peso</option>
      <option value="CRC">CRC - Costa Rican Colon</option>
      <option value="CZK">CZK - Czech Republic Koruna</option>
      <option value="DKK">DKK - Danish Krone</option>
      <option value="DOP">DOP - Dominican Peso</option>
      <option value="EGP">EGP - Eqyptian Pound</option>
      <option value="ETB">ETB - Ethiopian Birr</option>
      <option value="EUR">EUR - Euro</option>
      <option value="GBP">GBP - British Pound</option>
      <option value="GEL">GEL - Georgian Lari</option>
      <option value="GHS">GHS - Ghanaian Cedi</option>
      <option value="GMD">GMD - Gambian Dalasi</option>
      <option value="GYD">GYD - Guyanaese Dollar</option>
      <option value="HKD">HKD - Hong Kong Dollar</option>
      <option value="HRK">HRK - Croatian Kuna</option>
      <option value="HUF">HUF - Hungarian Forint</option>
      <option value="IDR">IDR - Indonesian Rupiah</option>
      <option value="ILS">ILS - Israeli New Shekel</option>
      <option value="INR">INR - Indian Rupee</option>
      <option value="ISK">ISK - Icelandic Krona</option>
      <option value="JMD">JMD - Jamaican Dollar</option>
      <option value="JPY">JPY - Japanese Yen</option>
      <option value="KES">KES - Kenyan Shilling</option>
      <option value="KRW">KRW - South Korean Won</option>
      <option value="KWD">KWD - Kuwaiti Dinar</option>
      <option value="KYD">KYD - Cayman Islands Dollar</option>
      <option value="KZT">KZT - Kazakhstani Tenge</option>
      <option value="LAK">LAK - Laotian Kip</option>
      <option value="LKR">LKR - Sri Lankan Rupee</option>
      <option value="LRD">LRD - Liberian Dollar</option>
      <option value="LTL">LTL - Lithuanian Litas</option>
      <option value="MAD">MAD - Moroccan Dirham</option>
      <option value="MDL">MDL - Moldovan Leu</option>
      <option value="MKD">MKD - Macedonian Denar</option>
      <option value="MNT">MNT - Mongolian Tugrik</option>
      <option value="MUR">MUR - Mauritian Rupee</option>
      <option value="MWK">MWK - Malawian Kwacha</option>
      <option value="MXN">MXN - Mexican Peso</option>
      <option value="MYR">MYR - Malaysian Ringgit</option>
      <option value="MZN">MZN - Mozambican Metical</option>
      <option value="NAD">NAD - Namibian Dollar</option>
      <option value="NGN">NGN - Nigerian Naira</option>
      <option value="NIO">NIO - Nicaraguan Cordoba</option>
      <option value="NOK">NOK - Norwegian Krone</option>
      <option value="NPR">NPR - Nepalese Rupee</option>
      <option value="NZD">NZD - New Zealand Dollar</option>
      <option value="OMR">OMR - Omani Rial</option>
      <option value="PEN">PEN - Peruvian Sol</option>
      <option value="PGK">PGK - Papua New Guinean Kina</option>
      <option value="PHP">PHP - Philippine Peso</option>
      <option value="PKR">PKR - Pakistani Rupee</option>
      <option value="PLN">PLN - Polish Zloty</option>
      <option value="PYG">PYG - Paraguayan Guarani</option>
      <option value="QAR">QAR - Qatari Rial</option>
      <option value="RON">RON - Romanian Leu</option>
      <option value="RSD">RSD - Serbian Dinar</option>
      <option value="RUB">RUB - Russian Ruble</option>
      <option value="SAR">SAR - Saudi Riyal</option>
      <option value="SEK">SEK - Swedish Krona</option>
      <option value="SGD">SGD - Singapore Dollar</option>
      <option value="SOS">SOS - Somali Shilling</option>
      <option value="SRD">SRD - Surinamese Dollar</option>
      <option value="SSP">SSP - South Sudanese Pound</option>
      <option value="THB">THB - Thai Baht</option>
      <option value="TRY">TRY - Turkish Lira</option>
      <option value="TTD">TTD - Trinidad & Tobago Dollar</option>
      <option value="TWD">TWD - New Taiwan Dollar</option>
      <option value="TZS">TZS - Tanzanian Shilling</option>
      <option value="UAH">UAH - Ukranian Hryvnia</option>
      <option value="UGX">UGX - Ugandan Shilling</option>
      <option value="USD">USD - United States Dollar</option>
      <option value="UYU">UYU - Uruguayan Peso</option>
      <option value="VES">VES - Venezuelan Bolívar Soberano</option>
      <option value="VND">VND - Vietnamese Dong</option>
      <option value="YER">YER - Yemeni Rial</option>
      <option value="ZAR">ZAR - South African Rand</option>
    </select>
    <p>{language.format}</p>
    <select bind:value={format}>
      <option value="nimiq">NIMIQ (NIM)</option>
      <option value="luna">LUNA (10 µNIM)</option>
    </select>
    <button on:click|preventDefault={save} class="regular">{language.save}</button>
  </form>
  {/if}
</div>

<script>
  import {fly} from 'svelte/transition';
  import swal from 'sweetalert';
  import {validate} from 'public-address-validator';
  import {router} from '@spaceavocado/svelte-router';
  import translations from '../../../assets/lang.json';
  import {settings} from '../store/settings';
  import {site} from '../store/site';
  import HubApi from '@nimiq/hub-api';
  import QrScanner from 'qr-scanner';
  import QrScannerWorkerPath from '!!file-loader!../../../node_modules/qr-scanner/qr-scanner-worker.min.js';
  QrScanner.WORKER_PATH = QrScannerWorkerPath;
  let bitcoin = require('bitcoinjs-lib');

  let camera = false;
  let language;
  let languages = $settings.language;
  let pw;
  let address = $settings.account;
  let password = $settings.password;
  let currency = $settings.currency;
  let format = $settings.format;
  let passwordFieldType = 'password';

  $: {
    $settings.language = languages;
    language = translations[$settings.language];
    if (language !== '') {
      !localStorage.getItem('password') ? pw = language.errors.create : pw = language.errors.reset
    }
  }

  $: $settings.password = password;

  $: $settings.account = address;

  $: $settings.currency = currency;

  $: $settings.format = format;

  // saves input value to local storage and return home
  function save() {
    let acct = $settings.account
    const pw = $settings.password
    const storedPw = localStorage.getItem('password')
    // if address starts with 'nimiq:' we remove it
    if (acct.startsWith('nimiq:')) {
      $settings.account = acct.split(':')[1]
      acct = $settings.account
    }
    // validating the address form input
    if (!validate(acct, 'nimiq')) {
      swal('Error!', language.errors.address, 'error')
      console.log('not valid')
      return
    }
    acct = acct.toUpperCase().replace(/ /g, '').replace(/(.{4})/g, '$1 ').trim()
    $settings.account = acct
    // making sure there is a password
    if ((pw.length < 8 && storedPw === null) || (pw.length > 0 && pw.length < 8)) {
      swal('Error!', language.errors.password, 'error')
      console.log('pw not 8 chars')
      return
    }
    if (pw.length > 7) {
      localStorage.setItem('password', bitcoin.crypto.sha256($settings.password).join(''))
      $settings.password = ''
    }
    console.log('saved')
    // save settings to localStorage
    localStorage.setItem('account', $settings.account)
    localStorage.setItem('language', $settings.language)
    localStorage.setItem('currency', $settings.currency)
    localStorage.setItem('format', $settings.format)
    localStorage.setItem('index', 0)
    // go home
    $router.replace('/')
  }

  function togglePasswordFieldType() {
    passwordFieldType = passwordFieldType === 'password' ? 'text' : 'password';
  }

  function wallet() {
    const hubApi = new HubApi($site.hubUrl)
    hubApi.chooseAddress({appName: 'Spark'}).then(addressInfo => {
      address = addressInfo.address
    })
  }

  function passwordChanged({target}) {
    password = target.value;
  }

  function videoMounted(video) {
    const scanner = new QrScanner(video, data => {
      let acct = data
      // if address starts with 'nimiq:' we remove it
      if (acct.startsWith('nimiq:')) {
        acct = acct.split(':')[1]
      }
      if (data.includes('?')) {
        acct = acct.split('?')[0]
      }
      address = acct
      camera = false
      console.log(data)
      scanner.destroy()
    });
    scanner.start();
  }

</script>

<style scoped>
  #wrap {
    display: inline-block;
    position: relative;
    width: 100%;
  }

  #address {
    padding-right: 18%;
    width: 63.5%
  }

  #scan {
    position: absolute;
    top: 0.92em;
    right: 3em;
    font-size: 1.2em;
    margin: 0;
    width: 1.6em;
    height: 1.6em;
    border: none;
    background: none;
    color: grey;
  }

  #wallet {
    position: absolute;
    top: 0.92em;
    right: 1.5em;
    font-size: 1.2em;
    margin: 0;
    width: 1.6em;
    height: 1.6em;
    border: none;
    background: none;
    color: grey;
  }

  #password {
    padding-right: 18%;
    width: 63.5%
  }

  #show-password {
    position: absolute;
    top: 0.92em;
    right: 1.5em;
    font-size: 1.2em;
    margin: 0;
    width: 1.6em;
    height: 1.6em;
    border: none;
    background: none;
    color: grey;
  }

  p {
    float: left;
    margin-left: 10%;
    margin-bottom: 0vw;
    margin-top: 0.65em;
    color: var(--dark);
  }
  /* remove outlines from form */
  form input:focus,
  form button:focus {
    outline: none;
  }
  /* address input */
  input {
    margin: 2%;
    background: var(--light);
    width: 80%;
    border: 1px solid var(--info);
    border-radius: 0.4em;
    font-size: 1.5em;
    padding: 0.4em;
  }
  ::placeholder {
    color: var(--secondary);
  }
  /* dropdown boxes */
  select {
    width: 85%;
    font-size: 1.5em;
    background: var(--light);
    margin: 0.4em;
    border-radius: 0.2em;
    border: 1px solid var(--info);
  }
  /* save button */
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

  .guidetl {
    position: absolute;
    width: 10%;
    height: 10%;
    background-image: url('../assets/img/qr-guide.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .guidetr {
    position: absolute;
    right: 0;
    width: 10%;
    height: 10%;
    background-image: url('../assets/img/qr-guide.png');
    background-size: contain;
    background-repeat: no-repeat;
    transform: scaleX(-1);
  }

  .guidebl {
    position: absolute;
    bottom: 0;
    width: 10%;
    height: 10%;
    background-image: url('../assets/img/qr-guide.png');
    background-size: contain;
    background-repeat: no-repeat;
    transform: scaleY(-1);
  }

  .guidebr {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10%;
    height: 10%;
    background-image: url('../assets/img/qr-guide.png');
    background-size: contain;
    background-repeat: no-repeat;
    transform: scale(-1, -1);
  }

  .guides-area {
    position: absolute;
    width: var(--guides);
    padding-bottom: var(--guides);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .video-wrapper     {
    box-sizing: border-box;
    width: 100%;
    height: 27em;
    position: relative;
    overflow: hidden;
  }

  .pw-hidden {
    -webkit-mask: url("../assets/img/pw-hidden.svg") no-repeat;
    mask: url("../assets/img/pw-hidden.svg") no-repeat;
    background-color: var(--info);
    width: 1em;
    height: 1em;
  }

  .pw-visible {
    -webkit-mask: url("../assets/img/pw-visible.svg") no-repeat;
    mask: url("../assets/img/pw-visible.svg") no-repeat;
    background-color: var(--info);
    width: 1em;
    height: 1em;
  }

  .pick-wallet {
    -webkit-mask: url("../assets/img/wallet.svg") no-repeat;
    mask: url("../assets/img/wallet.svg") no-repeat;
    background-color: var(--info);
    width: 1em;
    height: 1em;
  }

  .show-camera {
    -webkit-mask: url("../assets/img/qr-scanner.svg") no-repeat;
    mask: url("../assets/img/qr-scanner.svg") no-repeat;
    background-color: var(--info);
    width: 1em;
    height: 1em;
  }

  .video-crop {
    left: 1em;
    top: 1em;
    width: calc(100% - 2em);
    height: calc(100% - 2em);
    position: relative;
    overflow: hidden;
    background: black;
  }

  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: relative;
    left: calc(50% - 50vw);
    top: calc(50% - 50vh);
  }
</style>
