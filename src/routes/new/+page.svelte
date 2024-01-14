<script>
  import { goto } from '$app/navigation';
  import supabase from '$lib/supabaseClient';

  async function saveStatus(status, when) {
    isLoading = true;
    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    let { data, error } = await supabase
      .from('statuses')
      .insert({
        status,
        when,
        user_id: dataUser?.user?.id,
      });
    isLoading = false;
    if (!error) {
      isCreated = true;
      setTimeout(() => {
        goto('/dashboard');
      }, 2000);
    }
    return data;
  }

  let status = 'good';
  const date = new Date();
  const todayInString = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let when = todayInString;
  let isLoading;
  let isCreated;

  function handleSelectStatus(event) {
    status = event.target.value;
  }

  function handleSelectDate(event) {
    when = event.target.value;
  }

  function handleClick() {
    saveStatus(status, when);
  }
</script>

<body>
  <header>
    <h1>how you doing</h1>
  </header>
  <main>
    <h2>add new status</h2>
    <form>
      <div>
        <label for="status">Status</label>
        <select id="status" value={status} on:change={handleSelectStatus}>
          <option value="great">great</option>
          <option value="good">good</option>
          <option value="ok">ok</option>
          <option value="bad">bad</option>
        </select>
      </div>
      <br />
      <div>
        <label for="when">When</label>
        <input id="when" type="date" value={when} on:change={handleSelectDate} />
      </div>
      <br />
      <div>
        <button on:click={handleClick}>save</button>
      </div>
      
    </form>
    {#if isCreated}
      <br /><br />
      <div>Status created. Redirecting to <a href="/">Statuses</a>.</div>
    {/if}
  </main>
</body>

<style>
  :root {
    --color-link: #0f79ce;
  }

  button {
    padding: 0.4rem 1.6rem;
  }
</style>
