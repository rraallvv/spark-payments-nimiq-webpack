<form autocomplete='off' in:fly={{x:20, duration: 500}}>
  <p>{language.donate}</p>
  <!-- amount display -->
  <input bind:value={price} id="donate-box" on:mousedown={noSelect} on:input={setTwoNumberDecimal} on:click={moveCursor} bind:this={input} type='text' class='input pad'>
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
  <br>
  <!-- charge button -->
  <button on:click|preventDefault={donate} class="charge">{language.pay}</button>
</form>

<script>
  import {fly} from 'svelte/transition';
  import swal from 'sweetalert';
  import {router} from '@spaceavocado/svelte-router';
  import translations from '../../../assets/lang.json';
  import {settings} from '../store/settings';

  let language = translations[$settings.language];
  let currency = $settings.currency;
  let price = '0.00';
  let input;

  $: {
    let newValue = price;
    if (newValue.length > 2) {
      newValue = newValue.replace('.', '')
      price = `${newValue.substr(0, newValue.length - 2)}.${newValue.substr(newValue.length - 2)}`
    } else {
      price = newValue
    }
  }

  function setTwoNumberDecimal(e) {
    price = parseFloat(price).toFixed(2)
  }

  function moveCursor() {
    let len = price.length
    input.setSelectionRange(len, len)
  }

  function noSelect() {
    return false
  }

  // begins purchase
  function donate() {
    // if amount is empty, notify merchant and stop function
    if (price === '' || parseFloat(price === 0)) { // string vs int?
      swal('Error!', language.errors.price, 'error')
      return
    }
    // show QR page and pass data
    $router.push(`/sale/${price}%20${currency}?address=${$router.currentRoute.query.address}`)
  }

</script>

<style scoped>
  /* remove outlines from form */
  form input:focus,
  form button:focus {
    outline: none;
  }
  p {
    float: left;
    margin-left: 10%;
    margin-bottom: 0vw;
    margin-top: 0.65em;
    color: var(--dark);
  }
  /* dropdown box */
  select {
    width: 80%;
    font-size: 1.5em;
    background: var(--light);
    margin: 0.4em;
    border-radius: 0.2em;
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
  #donate-box {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  ::-moz-selection {
    background: transparent;
  }
  ::selection {
    background: transparent;
  }
</style>
