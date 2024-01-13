import supabase from '$lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const { data: statuses, error: statusesError } = await supabase
      .from('statuses')
      .select('*')
      .order('when');

  const { data: authData, error: authError } = await supabase.auth.getUser();  
  const user = authData?.user;

  return {
    statuses,
    user,
  };
}
