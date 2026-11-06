// src/app/api/saveGameData/route.ts

import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import firestore from "../../utilities/firestore";

export async function POST(request: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.email;
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { gameData } = await request.json();
    if (!gameData) {
      return NextResponse.json({ error: "Missing game data" }, { status: 400 });
    }

    // Each player's document is keyed by the signed-in email.
    const userDoc = firestore.collection("users").doc(userId);

    // Set or merge the game data
    await userDoc.set(gameData, { merge: true });

    return NextResponse.json({ message: "Game data saved successfully" });
  } catch (error: any) {
    console.error("Error saving game data:", error);
    return NextResponse.json(
      { error: "Failed to save game data. " + error.message },
      { status: 500 },
    );
  }
}
