"use client";

import { useEffect, useState } from "react";
import { fetchAdminStats, AdminStats } from "@/services/admin.service";

export default function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminStats()
            .then(setStats)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading stats...</p>;
    if (!stats) return <p>Failed to load stats</p>;

    const cards = [
        { label: "Users", value: stats.users },
        { label: "Categories", value: stats.categories },
        { label: "Products", value: stats.products },
        { label: "Orders", value: stats.orders },
        { label: "Revenue", value: `₹ ${stats.revenue}` },
    ]

    return (
        <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {cards.map(card => (
          <div
            key={card.label}
            className="bg-white rounded-lg shadow p-6"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-semibold mt-2">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
    );
}
