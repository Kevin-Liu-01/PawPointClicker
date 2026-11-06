// src/app/api/getUserData/route.ts

import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import firestore from "../../utilities/firestore";
export async function GET() {
  const session = await auth();
  const userId = session?.user?.email;

  if (!userId) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const userDoc = await firestore.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 },
      );
    }

    // Return the document data exactly as it is in Firestore
    const data = userDoc.data();
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data. " + error.message },
      { status: 500 },
    );
  }
}
