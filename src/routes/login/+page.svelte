<script>
  import { createClient } from '@supabase/supabase-js';
  import { goto } from '$app/navigation';

  const supabaseUrl = 'https://mpafrxyswyoyqactbzvv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWZyeHlzd3lveXFhY3RienZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTgwNjEsImV4cCI6MjAxODQ3NDA2MX0.zLUNSBrnRsWmAKCOvJo7mC_9viQ1N7Fn6qD2n9d7-5I';
  const supabase = createClient(supabaseUrl, supabaseKey);

  let email;
  let password;
  let isLoading;
  let isAuthenticated = false;
  let errorMessage;

  async function login(event) {
    event.preventDefault();
    isLoading = true;
    errorMessage = '';
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    isLoading = false;
    isAuthenticated = data?.user?.role === 'authenticated';
    errorMessage = error?.message;

    if (!error) {
      setTimeout(() => {
        goto('/');
      }, 1000);
    }
  }
</script>

<body>
  <header>
    <h1>how you doing</h1>
  </header>
  <main>
    <h2>login</h2>
    <div>
      {#if isAuthenticated === false}
        <form>
          <label for="email">
            <div>Email</div>
            <input id="email" name="email" bind:value={email} />
          </label>
          <label for="password">
            <div>Password</div>
            <input type="password" id="password" name="password" bind:value={password} />
          </label>
          <div>
            <button on:click={login}>Login</button>
          </div>
          {#if isLoading}
          <div>Logging in user ...</div>
          {/if}
          {#if errorMessage}
          <div class="error">{errorMessage}</div>
          {/if}
        </form>
      {:else}
        <div>Logged in. Redirecting to statuses.</div>
      {/if}
    </div>
  </main>
</body>

<style>
  :root {
    --color-link: #0f79ce;
  }

  .error {
    color: #c0392b;
  }

  button {
    padding: 0.4rem 1.6rem;
  }
</style>