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

  const statusesStrings = {
    great: 'great',
    good: 'good',
    ok: 'ok',
    bad: 'bad',
  };

  function getStatusColor(status='bad') {
    return statusesStrings[status];
  }
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
      {#each Object.entries(groupedStatuses) as groupedItem}
        <h3>{groupedItem?.[0]}</h3>
        <div>
          {#each groupedItem?.[1] as item}
            <div class="status-container">
              <span>{new Date(item?.when).getUTCDate()} - {item?.status}</span>
              <div class="status-color {getStatusColor(item?.status)}" title={item?.status}>&nbsp;</div>
            </div>
          {/each}
        </div>
      {/each}
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

  .status-container {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .status-color {
    width: 10px;
    height: 10px;
  }
  
  .status-color.great {
    background-color: #1abc9c;
  }

  .status-color.good {
    background-color: #BBF7D0;
  }

  .status-color.ok {
    background-color: #fecaca;
  }
  
  .status-color.bad {
    background-color: #e74c3c;
  }
</style>