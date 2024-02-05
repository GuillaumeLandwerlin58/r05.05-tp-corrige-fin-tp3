import {PropsWithChildren} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getUser} from "../../utils/supabase";
import {redirect} from "next/navigation";


export default async function Layout ({children}: PropsWithChildren) {
    const supabase = createServerComponentClient({cookies})
    const user = await getUser(supabase);
    if (user) {
        redirect('/mon-compte')
    }
    return <>{children}</>
}


