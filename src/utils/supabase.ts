import {SupabaseClient} from "@supabase/supabase-js";

export const getUser = async (supabase: SupabaseClient) => {
    const { data, error } = await supabase.auth.getSession()
    return data
}