<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import supabase from '$lib/supabaseClient';

  let isLoggedIn = false;
  let isLoading = true;
  let user;
  let statuses;
  let groupedStatuses = {};

  async function getStatuses() {
    const { data: statuses, error } = await supabase
      .from('statuses')
      .select('*')
      .order('when');
    if (error) {
      console.error(error?.message);
    }
    return statuses;
  }

  onMount(async() => {
    statuses =  await getStatuses();
    statuses.forEach((i) => {
      const monthAndYear = new Date(i?.when).toLocaleString('en-US', {month: 'long', year: 'numeric'});
      groupedStatuses[monthAndYear] = (groupedStatuses[monthAndYear] || []).concat(i);
    });

    const { data, error } = await supabase.auth.getUser();
    if (!error) {
      user = data?.user;
      isLoggedIn = true;
      isLoading = false;
    } else if (error) {
      console.error(error?.message);
      isLoggedIn = false;
      setTimeout(() => {
        goto('/login');
      }, 2000);
      isLoading = false;
    }
  });
</script>

<body>
  <header>
    <h1>how you doing</h1>
    <nav>
      <ul>
        <li>
          <a href="/new">add new status</a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    {#if isLoading}
      <div>Loading...</div>
    {:else}
      {#if isLoggedIn}
        {#if statuses}
          <div>
            {#each Object.entries(groupedStatuses) as groupedItem}
              <h3>{groupedItem?.[0]}</h3>
              <div>
                {#each groupedItem?.[1] as item}
                  <div>{new Date(item?.when).getUTCDate()} - {item?.status}</div>
                {/each}
              </div>
            {/each}
          </div>
        {/if}
      {:else}
        <div>User not logged in. Redirecting to <a href="/login">Login</a>.</div>
      {/if}
    {/if}
  </main>
</body>

<style>
  :root {
    --color-link: #0f79ce;
  }

  main {
    padding: 1rem;
  }

  nav {
    margin-bottom: 0;
  }
</style>