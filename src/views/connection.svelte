<div id="connection" in:fly={{x: 20, duration: 500}}>
  <h1 id='red'>{language.connected}</h1>
  <h1 id='dark'>{language.internet}</h1>
</div>

<script>
  import {fly} from 'svelte/transition'
  import {router} from '@spaceavocado/svelte-router'
  import translations from '../../assets/lang.json'
  import {settings} from '../stores/settings'
  import {socket} from '../stores/socket'

  let language = translations[$settings.language]

  $socket.on('connect', () => {
    if (localStorage.getItem('account')) {
      $router.replace('/')
    } else {
      $router.replace('/settings')
    }
  })
</script>

<style>
  h1 {
    font-size: 2.45em;
    text-align: center;
  }

  #red {
    color: var(--red);
  }

  #dark {
    color: var(--dark);
  }
</style>
