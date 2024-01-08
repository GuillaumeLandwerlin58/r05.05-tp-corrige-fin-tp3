'use client';

import {z} from "zod";
import {useForm, zodResolver} from "@mantine/form";
import {PasswordInput, TextInput} from "@mantine/core";
import {Button, NoticeMessage, useZodI18n} from "tp-kit/components";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../../../utils/supabase";

const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export default function Inscription(){
    useZodI18n(z);
    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        validate: zodResolver(schema),
    });

    useEffect(() => {
        getUser(supabase).then((user) => {
            if (user.session) {
                router.push('/mon-compte')
            }
        });
    }, []);

    const supabase = createClientComponentClient();

    const router = useRouter();

    const [created, setCreated] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (values: FormValues) => {
        const { error } = await supabase.auth.signUp(
            {
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/api/auth/callback',
                    data: {
                        name: values.name
                    }
                }
            }
        )

        console.log(error)
        setCreated(true);
        setMessage((error) ? error.message : "Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter")
        setIsValid((!error))
    }

    return (
        <Box maw={340} mx="auto">
            <form
                className="flex items-center flex-col space-y-6 w-"
                onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >
                <p
                    className="text-left w-full text-2xl"
                >
                    Inscription
                </p>

                {
                    created &&
                    <NoticeMessage
                        className="w-full"
                        type={isValid ? "success" : "error"}
                        message={message}
                    />
                }

                <TextInput
                    className="w-full"
                    required
                    label="Nom"
                    description="Le nom qui sera utilisé pour vos commandes"
                    {...form.getInputProps('name')}
                />

                <TextInput
                    className="w-full"
                    required
                    label="Adresse email"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    className="w-full"
                    required
                    label="Mot de passe"
                    {...form.getInputProps('password')}
                />

                <Button
                    className="w-full cursor-pointer"
                    type="submit"
                >
                    S'inscrire
                </Button>

                <a onClick={() => router.push('/connexion')} className="">Déjà un compte ? Se connecter</a>
            </form>
        </Box>
    );
}