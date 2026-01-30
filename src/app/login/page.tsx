import Login from "@/components/Login";
import Main from "@/components/Main";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export const metadata = {
    title: "Broodl | Login",
};

export default function LoginPage() {
    return (
        <Main>
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        </Main>
    )
}