"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";

function AdminGuard({ children }: { children: ReactNode }) {
    const { admin, loading } = useAdminAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !admin && pathname !== "/admin/login") {
            router.replace("/admin/login");
        }
    }, [admin, loading, pathname, router ]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Checking admin session...
            </div>
        );
    }

    return <>{children}</>;
}

export default function AdminLayout({ children }: {children: ReactNode}) {
    return (
        <AdminAuthProvider>
            {children}
        </AdminAuthProvider>
    );
};