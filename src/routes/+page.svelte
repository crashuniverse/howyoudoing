<script>
    import { goto } from '$app/navigation';
    import feelingHappyIllustration from '$lib/undraw_feeling_happy_jymo.svg';
  
    function signup() {
      goto('/signup');
    }
  </script>
  
  <body>
    <header>
      <h1>how you doing</h1>
    </header>
    <main>
      <section class="poster">
        <div class="left">
          <img src={feelingHappyIllustration} width="600px" alt="feeling happy" />
        </div>
        <div class="right">
          <div class="what">How you feel everyday is important. This app keeps an everyday record of
            how you feel at the end of day.</div>
          <div class="signup-container">
            <button on:click={signup}>Get started</button>
          </div>
          <div class="login-container">
            Already have an account?&nbsp;<a href="/login">Login</a>
          </div>
        </div>
      </section>
    </main>
  </body>
  
  <style>
    :root {
      --color-link: #0f79ce;
    }

    body header {
      padding: 1rem;
    }
  
    main {
      padding: 1rem;
    }

    .right {
      padding: 16px;
    }

    .signup-container {
      margin-top: 16px;
      display: flex;
      justify-content: center;
    }

    .login-container {
      display: flex;
      justify-content: center;
      margin-top: 8px;
    }

    @media(min-width: 1024px) {
      h1 {
        margin-top: 0;
      }

      .poster {
        justify-content: initial;
        flex-direction: row;
        flex-wrap: initial;
        padding: 16px;
      }

      .left {
        flex-basis: 65%;
      }

      .right {
        flex-basis: 35%;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }

      .what {
        font-size: 2em;
        font-weight: 100;
      }

      .login-container {
        margin-top: 16px;
      }
    }
  </style>