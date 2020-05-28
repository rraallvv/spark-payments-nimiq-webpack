<div id="connection">
  <h1 id='red'>{language.connected}</h1>
  <h1 id='dark'>{language.internet}</h1>
</div>

<script>
  import {router} from '@spaceavocado/svelte-router';
  import translations from '../../../assets/lang.json';
  import {settings} from '../store/settings';
  import {socket} from '../store/socket';

  let language = translations[$settings.language];

  $socket.on('connect', () => {
    if (localStorage.getItem('account')) {
      $router.replace('/')
    } else {
      $router.replace('/settings')
    }
  });

</script>

<style scoped>
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
