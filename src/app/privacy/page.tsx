import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

const section = "mt-4 rounded-xl bg-orange-200 p-4 text-sm sm:text-base";
const heading = "font-semibold text-gray-800";
const link = "font-semibold text-orange-700 underline";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-orange-100 px-4 py-10 font-sans">
      <div className="mx-auto max-w-2xl rounded-2xl bg-orange-300 p-4 text-yellow-900 shadow-2xl sm:p-6">
        <Link href="/" className="text-sm font-semibold text-orange-700">
          Paw Point Clicker
        </Link>
        <h1 className="mt-1 text-2xl font-semibold text-gray-800 sm:text-3xl">
          Privacy
        </h1>
        <p className="mt-1 text-sm">Last updated 5 November 2026</p>
        <p className={section}>
          Paw Point Clicker is an idle game made by Kevin Liu. You can play
          without signing in.
        </p>

        <section className={section}>
          <h2 className={heading}>Signing in</h2>
          <p className="mt-1">
            Sign in with Google or Discord to save your progress across devices
            and join the leaderboard. From Google, the game receives your name,
            email address and profile picture.
          </p>
        </section>

        <section className={section}>
          <h2 className={heading}>Where it&apos;s kept</h2>
          <p className="mt-1">
            Your progress is saved in your browser. While you&apos;re signed in,
            it is also saved every 30 seconds to the game&apos;s database on
            Google Firebase, under your email address, with your name and
            picture. It stays there until you ask for it to be deleted. Your
            sign-in is kept in a cookie in your browser until you sign out, or
            for 30 days after your last visit.
          </p>
        </section>

        <section className={section}>
          <h2 className={heading}>Leaderboard</h2>
          <p className="mt-1">
            Every visitor can see the leaderboard: your name, picture and score.
            Your email address is never shown.
          </p>
        </section>

        <section className={section}>
          <h2 className={heading}>Visits</h2>
          <p className="mt-1">
            The site counts visits with Vercel Web Analytics, which sets no
            cookies.
          </p>
        </section>

        <section className={section}>
          <h2 className={heading}>Sharing</h2>
          <p className="mt-1">Nothing about you is sold or shared.</p>
        </section>

        <section className={section}>
          <h2 className={heading}>Deleting your data</h2>
          <p className="mt-1">
            To have your saved game deleted, email{" "}
            <a className={link} href="mailto:k.bowen.liu@gmail.com">
              k.bowen.liu@gmail.com
            </a>{" "}
            from the address you sign in with. You can remove the game&apos;s
            access to your Google account at{" "}
            <a className={link} href="https://myaccount.google.com/connections">
              myaccount.google.com/connections
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
