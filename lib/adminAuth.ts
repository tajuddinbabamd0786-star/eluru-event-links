import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "admin") {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Unauthorized access: Administrator role required" },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, user: session.user };
}
