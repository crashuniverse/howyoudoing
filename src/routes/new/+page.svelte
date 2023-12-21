<script>
  import { createClient } from '@supabase/supabase-js';
  const supabaseUrl = 'https://mpafrxyswyoyqactbzvv.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWZyeHlzd3lveXFhY3RienZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4OTgwNjEsImV4cCI6MjAxODQ3NDA2MX0.zLUNSBrnRsWmAKCOvJo7mC_9viQ1N7Fn6qD2n9d7-5I';
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function saveStatus(status, when) {
    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    let { data, error } = await supabase
      .from('statuses')
      .insert({
        status,
        when,
        user_id: dataUser?.user?.id,
      });
    return data;
  }

  let status = 'good';
  const date = new Date();
  const todayInString = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let when = todayInString;

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

<h1>how you doing</h1>
<h2>add new status</h2>
<form>
  <div>
    <label for="status">
      <select value={status} on:change={handleSelectStatus}>
        <option value="good">good</option>
        <option value="ok">ok</option>
        <option value="notok">not ok</option>
        <option value="bad">bad</option>
      </select>
    </label>
  </div>
  <br />
  <div>
    <label for="when">
      <input type="date" value={when} on:change={handleSelectDate} />
    </label>
  </div>
  <br />
  <div>
    <button on:click={handleClick}>save</button>
  </div>
</form>
