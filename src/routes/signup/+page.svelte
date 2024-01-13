<script>
  import supabase from '$lib/supabaseClient';

  let email;
  let password;
  let isLoading;
  let isAuthenticated = false;
  let errorMessage;

  async function signup(event) {
    event.preventDefault();
    isLoading = true;
    errorMessage = '';
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    isLoading = false;
    isAuthenticated = data?.user?.role === 'authenticated';
    errorMessage = error?.message;
  }
</script>

<body>
  <header>
    <h1>how you doing</h1>
  </header>
  <main>
    <h2>Signup</h2>
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
            <button on:click={signup}>Signup</button>
          </div>
          <br/>
          <div>Already have an account? <a href="/login">Login</a></div>
          {#if isLoading}
          <div>Creating user ...</div>
          {/if}
          {#if errorMessage}
          <div class="error">{errorMessage}</div>
          {/if}
        </form>
      {:else}
        <div>User created</div>
        <div>
          <a href="/login">Login</a>
        </div>
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