"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import userRegister from "@/libs/userRegister";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const router = useRouter();
    const [regUser, setRegUser] = useState<RegisterUser>({
        name: "",
        email: "",
        tel: "",
        password: "",
        role: "member",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setRegUser({
            ...regUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async () => {
        setError("");

        if(!regUser.name || !regUser.email || !regUser.tel || !regUser.password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (regUser.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsSubmitting(true);

        try {
            await userRegister(regUser);

            const loginResult = await signIn("credentials", {
                email: regUser.email,
                password: regUser.password,
                redirect: false,
            });

            if (loginResult?.error) {
                setError("Account created, but automatic sign-in failed. Please sign in.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (registerError) {
            setError(registerError instanceof Error ? registerError.message : "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="mx-auto mt-20 max-w-md px-6 pb-12">
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-gray-900">Register</h1>

                <div className="mt-6 space-y-4">
                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Name</span>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" name="name" type="text" value={regUser.name} onChange={updateField} required />
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" name="email" type="email" value={regUser.email} onChange={updateField} required />
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Telephone</span>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" name="tel" type="tel" value={regUser.tel} onChange={updateField} required />
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Role</span>
                        <select className="w-full rounded-lg border border-gray-300 px-3 py-2" name="role" value={regUser.role} onChange={updateField}>
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" name="password" type="password" minLength={6} value={regUser.password} onChange={updateField} required />
                    </label>

                    {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                    <button
                        className="w-full rounded-lg bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                </div>
                <p className="mt-5 text-center text-sm text-gray-600">
                    Already registered? <Link className="font-medium text-cyan-700" href="/api/auth/signin">Sign in</Link>
                </p>
            </div>
        </main>
    );
}
