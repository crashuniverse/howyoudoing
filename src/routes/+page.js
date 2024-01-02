import supabase from '$lib/supabaseClient';

export async function load() {
  const { data: statuses, error } = await supabase
      .from('statuses')
      .select('*')
      .order('when');

  return {
    statuses,
  };
}
