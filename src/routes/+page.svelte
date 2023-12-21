<script>
  import { createClient } from '@supabase/supabase-js';
  import { onMount } from 'svelte';
  const supabaseUrl = 'https://mpafrxyswyoyqactbzvv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWZyeHlzd3lveXFhY3RienZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTgwNjEsImV4cCI6MjAxODQ3NDA2MX0.zLUNSBrnRsWmAKCOvJo7mC_9viQ1N7Fn6qD2n9d7-5I';
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function getStatuses() {
    let { data: statuses, error } = await supabase
      .from('statuses')
      .select('*')
      .order('when');
    return statuses;
  }

  let user;
  let statuses;

  onMount(async() => {
   statuses =  await getStatuses();
   const { data, error } = await supabase.auth.getUser();
   user = data?.user;
  });
</script>

<h1>how you doing</h1>
<a href="/new">add new status</a>
<br /><br />
{#if statuses}
  <div>
    {#each statuses as item}
      <div>{new Date(item?.when).getUTCDate()} - {item?.status}</div>
    {/each}
  </div>
{/if}
