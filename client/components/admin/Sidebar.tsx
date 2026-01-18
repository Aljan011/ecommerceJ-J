"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Users", href: "/admin/users" },
];

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="w-64 bg-white border-r">
            <div className="p-6 font-bold text-xl border-b">Admin Panel</div>

            <nav className="p-4 space-y-2">
                {links.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 rounded-md ${pathname === link.href
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );

}