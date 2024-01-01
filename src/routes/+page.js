import supabase from '$lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
export async function load() {
  const { data: statuses, error } = await supabase
      .from('statuses')
      .select('*')
      .order('when');

  return {
    statuses,
  };
}
