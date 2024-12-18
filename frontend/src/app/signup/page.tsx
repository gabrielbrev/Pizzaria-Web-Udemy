import Image from "next/image";
import Link from "next/link";
import logoImg from "/public/logo.svg";
import styles from '../page.module.scss';
import { api } from "@/services/app";
import { redirect } from "next/navigation";

export default function SignUp() {
    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if (name === '' || email === '' || password === '') {
            return;
        }

        try {
            api.post("/user", {
                name,
                email,
                password
            });
        } catch(err) {
            console.log("error");
            console.log(err);
            return;
        }

        redirect("/");
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image 
                src={logoImg}
                alt='Logo da pizzaria'
                />
                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input 
                            type="text"
                            required
                            name='name'
                            placeholder='Digite seu nome'
                            className={styles.input}
                        />

                        <input 
                            type="email"
                            required
                            name='email'
                            placeholder='Digite seu email'
                            className={styles.input}
                        />

                        <input 
                            type="password"
                            required
                            name='password'
                            placeholder='*****'
                            className={styles.input}
                        />

                        <button type='submit'>
                            Cadastrar
                        </button>
                    </form>

                    <Link href='/' className={styles.text}>
                        Já possui uma conta? Faça o login
                    </Link>

                </section>
            </div>
        </>
    );
}