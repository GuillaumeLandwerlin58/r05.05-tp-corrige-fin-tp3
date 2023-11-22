"use client";

import {useForm} from "@mantine/form";
import {PasswordInput, TextInput} from "@mantine/core";

export default function Connexion(){
  const form = useForm();

  return (
      <div>
          <TextInput
            withAsterisk
            variant="filled"
            label="Adresse e-mail"
            placeholder="Entrez votre adresse e-mail"
          />

          <PasswordInput
            withAsterisk
            variant="filled"
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
          />
      </div>
  );
}
