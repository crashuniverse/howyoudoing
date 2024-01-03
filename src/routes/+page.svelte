<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let isLoading = true;
  let groupedStatuses = {};
  
  /** @type {import('./$types').PageData} */
  export let data;
  const { statuses, user } = data;

  onMount(async() => {
    if (!user) {
      setTimeout(() => {
        goto('/login');
      }, 2000);
    }
    isLoading = false;
  });

  statuses?.forEach((i) => {
    const monthAndYear = new Date(i?.when).toLocaleString('en-US', {month: 'long', year: 'numeric'});
    groupedStatuses[monthAndYear] = (groupedStatuses[monthAndYear] || []).concat(i);
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
    <h2>Statuses</h2>
    {#if statuses?.length}
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
    {#if isLoading}
      <div>Loading...</div>
    {:else if isLoading === false && !user}
      <div>User not logged in. Redirecting to <a href="/login">Login</a>.</div>
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