<script>
  import { createClient } from '@supabase/supabase-js';
  const supabaseUrl = 'https://mpafrxyswyoyqactbzvv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWZyeHlzd3lveXFhY3RienZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTgwNjEsImV4cCI6MjAxODQ3NDA2MX0.zLUNSBrnRsWmAKCOvJo7mC_9viQ1N7Fn6qD2n9d7-5I';
  const supabase = createClient(supabaseUrl, supabaseKey);

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

<h1>how you doing</h1>
<h2>signup</h2>
<div>
  {#if isAuthenticated === false}
    <form>
      <label for="email">
        <div>Email</div>
        <input id="email" name="email" bind:value={email} />
      </label>
      <br /><br />
      <label for="password">
        <div>Password</div>
        <input type="password" id="password" name="password" bind:value={password} />
      </label>
      <br /><br />
      <div>
        <button on:click={signup}>Signup</button>
      </div>
      <br /><br />
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

<style>
  .error {
    color: #c0392b;
  }
</style>