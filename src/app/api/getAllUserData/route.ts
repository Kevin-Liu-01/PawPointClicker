// src/app/api/getAllUserData/route.ts
import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import firestore from "../../utilities/firestore";

export async function GET() {
  try {
    const viewer = await auth();
    const snapshot = await firestore.collection("users").get();
    const leaderboardData: any[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Pick only the fields needed for the leaderboard modal
      const {
        session,
        proxName,
        lifeTimeEarnings,
        prestige,
        clickMultiplier,
        latemeal,
        scanner,
        deliveries, // adjust if your stored key is different (e.g. "frist")
        resco,
        farms,
        mine,
        factories,
        bank,
        lab,
        temple,
        spaceStation,
      } = data;

      // Documents are keyed by email; send only the public name and picture.
      leaderboardData.push({
        id: leaderboardData.length,
        you: doc.id === viewer?.user?.email,
        session: {
          user: { name: session?.user?.name, image: session?.user?.image },
        },
        proxName,
        lifeTimeEarnings,
        prestige,
        clickMultiplier,
        latemeal,
        scanner,
        deliveries,
        resco,
        farms,
        mine,
        factories,
        bank,
        lab,
        temple,
        spaceStation,
      });
    });

    return NextResponse.json({ data: leaderboardData });
  } catch (error: any) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch all user data. " + error.message },
      { status: 500 },
    );
  }
}
