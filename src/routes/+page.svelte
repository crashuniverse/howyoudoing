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

  const sortedGroups = Object.entries(groupedStatuses)
    .sort((a, b) => new Date(b?.[1]?.[0]?.when) - new Date(a?.[1]?.[0]?.when));

  function getRowsFromGroup(d) {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth();
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const rows = Math.ceil(numberOfDays / 7);
    return new Array(rows);
  }

  function getCurrentCell(d, rowIndex, colIndex) {
    const date = new Date(d?.[0]?.when);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDate = new Date(year, month, 1);
    const firstDateDay = firstDate.getDay();
    // to find the corresponding date, we subtract first day and add 2 for some reason
    const isFound = d?.find(i => new Date(i?.when).getDate() === 7 * rowIndex + colIndex - firstDateDay + 2);
    return isFound;
  }

  function getStatusClass(status='empty') {
    if (status === 'great') {
      return 'status-great';
    } else if (status === 'good') {
      return 'status-good';
    } else if (status === 'ok') {
      return 'status-ok';
    } else if (status === 'bad') {
      return 'status-bad';
    }
    return '';
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
      {#each sortedGroups as groupedItem}
        <h3>{groupedItem?.[0]}</h3>
        <div class="calendar">
          <div class="row header">
            {#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as day}
              <div class="cell header-cell">{day}</div>
            {/each}
          </div>
          {#each getRowsFromGroup(groupedItem?.[1]?.[0].when) as item, index}
            <div class="row">
              {#each new Array(7) as cell, indexCell}
                <div class="cell {getStatusClass(getCurrentCell(groupedItem?.[1], index, indexCell)?.status)}">&nbsp;</div>
              {/each}
            </div>
          {/each}
        </div>
        <br /><br />
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

  .status-row {
    display: flex;
  }

  .calendar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .row {
    display: flex;
    gap: 10px;
  }
  
  .cell {
    width: 40px;
    height: 40px;
    background-color: #fafafa;
  }
  
  .cell.header-cell {
    background-color: initial;
    height: initial;
  }

  .status-great {
    background-color: #1abc9c;
  }

  .status-good {
    background-color: #bbf7d0;
  }

  .status-ok {
    background-color: #fecaca;
  }
  
  .status-bad {
    background-color: #e74c3c;
  }
</style>