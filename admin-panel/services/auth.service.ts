import api from "@/lib/axios";

interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: "ADMIN" | "USER";
    };
}

export async function adminLogin(email: string, password: string): Promise<LoginResponse> {
    const res = await api.post("/auth/login", {email, password});

    if (res.data.user.role !== "ADMIN") {
        throw new Error("access denied. Admins only");
    }

    return res.data;
}