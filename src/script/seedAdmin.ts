import { prisma } from "../lib/prisma";

async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin222 Saheb",
            email: "admin2222@admin.com",
            role: "ADMIN",
            password: "admin1234"
        };

        const existingUser = await prisma.user.findUnique({ where: { email: adminData.email } });
        if (existingUser) {
            console.log("Admin already exists ✅");
            return;
        }

        console.log("***** Creating Admin via API...");

        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:4000" // ✅ manually set origin
            },
            body: JSON.stringify(adminData),
            credentials: "include"
        });

        const result = await signUpAdmin.json();
        console.log("Fetch ok:", signUpAdmin.ok);
        console.log("API Response:", result);

        if (!signUpAdmin.ok) {
            throw new Error(`Failed to create admin via API. Status: ${signUpAdmin.status}`);
        }

        await prisma.user.update({
            where: { email: adminData.email },
            data: { emailVerified: true }
        });

        console.log("Admin created successfully ✅");

    } catch (err) {
        console.error("Error seeding admin:", err);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin();
