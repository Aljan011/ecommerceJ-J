import axios from "@/lib/axios";

export interface AdminStats {
    users: number;
    categories: number;
    products: number;
    orders: number;
    revenue: number;
}

export const fetchAdminStats = async (): Promise<AdminStats> => {
    const res = await axios.get("/admin/stats");
    return res.data;
};