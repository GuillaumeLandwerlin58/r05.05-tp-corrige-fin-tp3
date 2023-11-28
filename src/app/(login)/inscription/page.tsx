"use client";

import React from 'react';
import {useForm} from "@mantine/form";
import {PasswordInput, TextInput, Box} from "@mantine/core";
import {Button} from "tp-kit/components";
import * as z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    nom: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type schema = {
    email: string;
    password: string;
    nom: string;
}


export default function Inscription(){
    const form = useForm(
        {
            initialValues: {
                email: "",
                password: ""
            },
        }
    );

    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values)=>console.log(values))} className="space-y-8 mt-16">
                <TextInput
                    withAsterisk
                    variant="filled"
                    label="Nom"
                    placeholder="Entrez votre nom"
                    {...form.getInputProps("nom")}
                />

                <TextInput
                    withAsterisk
                    variant="filled"
                    label="Adresse e-mail"
                    placeholder="Entrez votre adresse e-mail"
                    {...form.getInputProps("email")}
                />

                <PasswordInput
                    withAsterisk
                    variant="filled"
                    label="Mot de passe"
                    placeholder="Entrez votre mot de passe"
                    {...form.getInputProps("password")}
                />

                <Button
                    variant="primary"
                    type="submit"
                >
                    Se connecter
                </Button>
                <Button
                    variant="ghost"
                    type="button"
                >
                    Déja un compte ? Se connecter
                </Button>


            </form>
        </Box>
    );
}
