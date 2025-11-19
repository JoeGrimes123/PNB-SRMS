import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async ({ user, url }) => {
            console.log(`
===============================================
📧 EMAIL VERIFICATION
===============================================
To: ${user.email}
Subject: Verify your email address

Click the link below to verify your email:
${url}
===============================================
            `);
        },
    },
    trustedOrigins: ["http://localhost:5173"],
});
