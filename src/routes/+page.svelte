<script>
  import { createClient } from '@supabase/supabase-js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const supabaseUrl = 'https://mpafrxyswyoyqactbzvv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWZyeHlzd3lveXFhY3RienZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTgwNjEsImV4cCI6MjAxODQ3NDA2MX0.zLUNSBrnRsWmAKCOvJo7mC_9viQ1N7Fn6qD2n9d7-5I';
  const supabase = createClient(supabaseUrl, supabaseKey);
  let isLoggedIn = false;
  let isLoading = true;
  let user;
  let statuses;

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
        <br /><br />
        {#if statuses}
          <div>
            {#each statuses as item}
              <div>{new Date(item?.when).getUTCDate()} - {item?.status}</div>
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

  nav {
    margin-bottom: 0;
  }
</style>