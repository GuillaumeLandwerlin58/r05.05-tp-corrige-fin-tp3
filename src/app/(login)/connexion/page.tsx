"use client";
import React, {useCallback, useState} from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { TextInput, PasswordInput, Box } from '@mantine/core';
import {Button, NoticeMessage, NoticeMessageData} from 'tp-kit/components';
import {ProductFiltersResult} from "../../../types";
import {variant} from "@mantine/styles/lib/theme/functions/fns/variant/variant";

const schema = z.object({
    email: z.string().email({ message: 'L\'email doit être au format valide' }),
    password: z.string().min(6, { message: 'Le mot de passe doit faire au moins 6 caractères' }),
});



const Connexion = () => {

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    function addError() {
        setNotices(n => [...n, { type: "error", message: "Erreur de connexion" }]);
    }

    function addSuccess() {
        setNotices(n => [...n, { type: "success", message: "Connexion réussi" }]);
    }

    function removeNotice(index) {
        setNotices(n => {
            delete(n[index]);
            return Object.values(n);
        });
    }

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });


    return (
        <Box maw={340} mx="auto">
            <ul>
                {notices.map((notice, i) => <NoticeMessage
                    key={i}
                    {...notice}
                    onDismiss={() => removeNotice(i)}
                />)}
            </ul>
            <form  onSubmit={form.onSubmit((values) => console.log(values))} className="space-y-8 mt-16">
                <TextInput
                    withAsterisk
                    label="Adresse email"
                    placeholder="lin.guini@barilla.it..."
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    withAsterisk
                    label="Mot de passe"
                    placeholder="Ke$$a..."
                    {...form.getInputProps('password')}
                />
                <div>
                    <Button type="submit" fullWidth onClick={addError}>
                        Se connecter
                    </Button>
                    <Button type="button" fullWidth variant="ghost" onClick={() => {
                        window.location.href = "/inscription"
                    }}>
                        Créer un compte
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default Connexion;