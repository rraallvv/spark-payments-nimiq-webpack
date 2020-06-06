<div id="app">
{#if path === "/"}
  <span on:click={navigateToSettings} id="menu"><div class="hamburger" /></span>
{/if}
{#if path === "/settings" && isStored()}
  <span on:click={cancel} id="menu"><div class="close" /></span>
{/if}
  <img class='logo' src='./assets/img/logo.png' alt='Spark'>
{#if connected}
  <span id="status" class="green">•</span>
{:else}
  <span id="status" class="red">•</span>
{/if}
  <div id="content">
    <RouterView />
  </div>
</div>

<script>
  import {site} from './store/site';
  import {settings} from './store/settings';
  import {router} from '@spaceavocado/svelte-router';
  import {socket} from './store/socket';
  import RouterView from '@spaceavocado/svelte-router/component/view';
  import {onMount} from 'svelte';
  import translations from '../../assets/lang.json';
  let bitcoin = require('bitcoinjs-lib');
  let path;
  let connected = false;
  let windowHeight;
  let windowWidth;
  let isMobile;
  let isSoftKeyboardVisible;

  $router.onNavigationChanged((_, to) => path = to.path);

  $router.navigationGuard(async (from, to, next) => {
    if (to.path !== '/settings') {
      next();
      return;
    }
    const language = translations[$settings.language]
    // for backwards compatibility (for now), we only ask for password if password exists
    if (localStorage.getItem('password') !== null) {
      let pw = await swal({
        title: language.errors.enter,
        buttons: [true, 'Ok'],
        content: {
          element: 'input',
          attributes: {
            type: 'password'
          }
        }
      })
      // if canceled - show user
      if (pw === null) {
        next('/')
        return
      }
      pw = bitcoin.crypto.sha256(pw).join('')
      // if password matches, show settings
      if (pw === localStorage.getItem('password')) {
        next()
        return
      }
      // if password doesn't match and one was typed, it's wrong - show user
      if (pw !== null) {
        await swal('Error!', language.errors.wrong, 'error')
        next('/')
      }
    } else {
      next()
    }
  });

  $socket.on('connect', () => connected = true);
  $socket.on('disconnect', () => connected = false);

  function resize() {
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth
    if (windowHeight / windowWidth < 2) {
      document.getElementById('app').style.width = (0.5 * windowHeight) + 'px'
      document.body.style.fontSize = (0.0225 * windowHeight) + 'px'
    } else {
      document.getElementById('app').style.width = '100%'
      document.body.style.fontSize = (0.045 * windowWidth) + 'px'
    }
    document.body.style.height = windowHeight + 'px'
    document.body.style.width = windowWidth + 'px'
  }

  // take us to settings page
  function navigateToSettings() {
    $router.push('/settings');
  }

  function cancel() {
    $router.replace('/');
  }

  // check if settings are stored
  function isStored() {
    return localStorage.getItem('account') && localStorage.getItem('password')
  }

  onMount(() => {
    // try to detect and set language automatically
    const lang = navigator.language.split('-')[0]
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', lang)
      $settings.language = lang
    }

    // detect mobile platform
    var hasTouchScreen = false;
    if ('maxTouchPoints' in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ('msMaxTouchPoints' in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      var mQ = window.matchMedia && matchMedia('(pointer:coarse)');
      if (mQ && mQ.media === '(pointer:coarse)') {
        hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }

    isMobile = hasTouchScreen;

    resize();

    window.addEventListener('resize', () => {
      if (isMobile) {
        if (windowWidth !== window.innerWidth) {
          resize()
          if (isSoftKeyboardVisible) {
            // TODO: find a better way to update windowWidth and windowHeight
            // instead of reloading the page on screen orientation changes
            // when the soft keyboard is visible
            window.location.reload();
          }
        } else {
          isSoftKeyboardVisible = windowHeight !== window.innerHeight;
        }
      } else {
        resize();
      }
    });
  });
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow:300');

#content {
  margin: 0 auto;
  text-align: center;
}

#menu {
  color: #b2b2b2;
  font-size: 200%;
  position: absolute;
  top: 10px;
  left: 20px;
}

.hamburger {
    -webkit-mask: url("./assets/img/menu.svg") no-repeat;
    mask: url("./assets/img/menu.svg") no-repeat;
    width: 1em;
    height: 1em;
    background: #b2b2b2;
}

.close {
    -webkit-mask: url("./assets/img/close.svg") no-repeat;
    mask: url("./assets/img/close.svg") no-repeat;
    width: 1em;
    height: 1em;
    background: #b2b2b2;
}

#status {
  font-size: 300%;
  position: absolute;
  top: -6px;
  right: 20px;
}

.red {
  color: var(--red);
}

.green {
  color: var(--green);
}

/* @font-face {
  font-family: Barlow;
  src: url('./assets/fonts/barlow.ttf');
} */

:root {
  --primary: #0087E8;
  --secondary: #6B6570;
  --background: #ededed;
  --info: #757575;
  --dark: #282727;
  --light: #fff;
  --red: #f10032;
  --green: #47cf73;
  --guides: 60%;
}

:global(*) {
  font-family: 'Barlow Semi Condensed',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  font-weight: 300;
  outline: none;
}

:global(body) {
  background: var(--background);
  padding: 0;
  width: 100%;
  margin: 0 auto;
}

#app {
  margin: auto;
}

img {
  display: block;
  margin: 0 auto;
  width: 69.5%;
  height: auto;
}

/*
.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
*/
</style>
