'use client';

import {useEffect, useState} from "react";
import {getUser} from "../../utils/supabase";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/gotrue-js/src/lib/types"
import {Button} from "tp-kit/components";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<Session>();
  const supabase = createClientComponentClient();

  useEffect(() => {
    getUser(supabase).then((user) => {
      if (user.session) {
        setUser(user.session)
      } else {
        router.push('/connexion')
      }
    })
  }, []);

  return (
      <div
          className="flex flex-col justify-center space-y-6"
      >
        <p
            className="text-2xl font-bold"
        >
          MON COMPTE
        </p>
        <p>
          Bonjour, {user?.user.user_metadata.name} !
        </p>
        <div>
          <p>
            Nom : {user?.user.user_metadata.name}
          </p>
          <p>
            Email : {user?.user.email}
          </p>
        </div>
        <Button
            onClick={() => {
              supabase.auth.signOut().then(() => {
                router.refresh()
              })
            }}
            variant="outline"
        >
          Se déconnecter
        </Button>
      </div>
  )
}