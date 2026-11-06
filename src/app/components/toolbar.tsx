"use client";
import { useState, useEffect } from "react";
import { Box, Flex, Text, Tooltip } from "@radix-ui/themes";
import {
  TrophyIcon,
  AwardIcon,
  InfoIcon,
  MessageCircleQuestionIcon,
  GithubIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import Link from "next/link";
import useLocalStorage from "../utilities/useLocalStorage";
import Leaderboard from "./leaderboardModal";
import WelcomeModal from "./welcomeModal";
import FAQ from "./faqModal";

export default function Toolbar({
  session,
  setAcheivements,
}: {
  session: any;
  setAcheivements: (achievements: boolean) => void;
}) {
  // Modal States
  const [leaderboard, setLeaderboard] = useLocalStorage("leaderboard", false);
  const [welcome, setWelcome] = useLocalStorage("welcome", false);
  const [faq, setFaq] = useLocalStorage("faq", false);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage("isFirstVisit", true);

  // Player Data
  const [players, setPlayers] = useState<any[]>([]);
  const [avatarBorder, setAvatarBorder] = useState(
    "/images/avatarborders/circle.webp",
  ); // default border for signed in user
  const [userPosition, setUserPosition] = useState(0); // default position for signed in user

  // Check if the user has seen the welcome modal before (the first time they visit the site)
  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenModal && isFirstVisit) {
      setWelcome(true);
      setIsFirstVisit(false);
    }
  }, [isFirstVisit]);

  useEffect(() => {
    async function fetchLeaderboard() {
      console.log("Fetching leaderboard data...");
      try {
        const res = await fetch("/api/getAllUserData");
        const { data, error } = await res.json();
        if (error) {
          console.error("Error fetching leaderboard data:", error);
          return;
        }
        // Sort players by total lifetime earnings (descending)
        const sortedPlayers = data.sort(
          (a: { lifeTimeEarnings: number }, b: { lifeTimeEarnings: number }) =>
            b.lifeTimeEarnings - a.lifeTimeEarnings,
        );
        setPlayers(sortedPlayers);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
      }
    }

    // Fetch immediately then set up a recurring interval every 2 minutes.
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 120000);

    // Clean up on unmount.
    return () => clearInterval(interval);
  }, []);

  function getBorderImage(rank: number) {
    switch (rank) {
      case 1:
        return "/images/avatarborders/scales.webp";
      case 2:
        return "/images/avatarborders/fire.webp";
      case 3:
        return "/images/avatarborders/regal.webp";
      case 4:
        return "/images/avatarborders/galaxy.webp";
      case 5:
        return "/images/avatarborders/bluegem.webp";
      case 6:
        return "/images/avatarborders/redgem.webp";
      case 7:
        return "/images/avatarborders/crown.webp";
      case 8:
        return "/images/avatarborders/royal.webp";
      case 9:
        return "/images/avatarborders/diamond.webp";
      case 10:
        return "/images/avatarborders/gemstone.webp";
      default:
        return "/images/avatarborders/circle.webp";
    }
  }

  // Look for the current session's user in the leaderboard players.
  useEffect(() => {
    if (session && session.user && players.length > 0) {
      const userIndex = players.findIndex((player) => player.you);
      if (userIndex !== -1) {
        // userIndex is zero-based so rank is userIndex + 1.
        const rank = userIndex + 1;
        setUserPosition(rank);
        setAvatarBorder(getBorderImage(rank));
      } else {
        // If not found in leaderboard, use the default.
        setAvatarBorder("/images/avatarborders/crown.webp");
      }
    } else {
      // If no user session, use guest border.
      setAvatarBorder("/images/avatarborders/guest.webp");
    }
  }, [session, players]);

  return (
    <>
      {/* Modals */}
      <Leaderboard
        isOpen={leaderboard}
        setIsOpen={setLeaderboard}
        players={players}
      />
      <WelcomeModal isOpen={welcome} setIsOpen={setWelcome} />
      <FAQ isOpen={faq} setIsOpen={setFaq} />

      {/* Toolbar */}
      <Flex
        align="center"
        justify="center"
        className="fixed bottom-[0.5rem] left-[calc(50%-12.35rem)] z-30 m-4 gap-[0.42rem] rounded-xl border border-orange-500 bg-orange-400/95 p-2 sm:left-2 sm:top-[calc(100vh-6rem)]"
      >
        {/* <PawPrintIcon
          // src="/images/prox.svg"
          // alt="Prox"
          className="mx-0.5 h-10 w-auto rounded-full border border-orange-600 bg-orange-500 p-1.5 text-orange-800"
        /> */}
        <Flex className="mr-2 w-[7.5rem]">
          <Flex
            justify="center"
            align="center"
            className="absolute mt-[-4rem] h-20 w-20"
          >
            <Tooltip
              content={
                session
                  ? "You are signed in as " + session.user.name + "!"
                  : "Sign in to save your progress!"
              }
            >
              <img
                src={
                  session ? avatarBorder : "/images/avatarborders/guest.webp"
                }
                alt="avatarborder"
                className="absolute z-10 min-h-[6rem] min-w-[6rem]"
              />
            </Tooltip>
            <img
              src={session ? session?.user.image : "/images/guest.png"}
              alt={session && session.user?.name}
              className="z-5 absolute mt-[0.1rem] h-20 w-20"
            />
            {session && (
              <Tooltip
                content={`You are ranked #${userPosition} among all users globally!`}
              >
                <div
                  onClick={() => setLeaderboard(true)}
                  className="absolute right-[-0.9rem] top-[-0.5rem] cursor-pointer"
                >
                  <Text className="relative z-10 rounded-full border-2 border-orange-600 bg-orange-500 p-[0.25rem] text-xs font-bold text-yellow-100 sm:text-sm">
                    #{userPosition}
                  </Text>
                </div>
              </Tooltip>
            )}
            <p className="absolute bottom-0 z-20 rounded-md border border-white bg-orange-500 px-2 text-center text-xs text-white">
              {session ? (
                <span className="truncate">{session.user?.name}</span>
              ) : (
                <span>Guest</span>
              )}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="z-5 absolute bottom-[-0.35rem] right-[-3rem] truncate rounded-r-lg border border-orange-700 bg-orange-500 py-2 pl-4 pr-2 text-sm font-semibold no-underline transition hover:bg-orange-300"
            >
              {session ? (
                <Tooltip content="Sign out">
                  <LogOutIcon className="size-6" />
                </Tooltip>
              ) : (
                <Tooltip content="Sign in">
                  <LogInIcon className="size-6" />
                </Tooltip>
              )}
            </Link>
          </Flex>
        </Flex>
        <Box className="h-8 border border-r-[0.025rem] border-black" />
        <Tooltip content="Info">
          <button
            onClick={() => setWelcome(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <InfoIcon />
          </button>
        </Tooltip>
        <Tooltip content="FAQ">
          <button
            onClick={() => setFaq(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <MessageCircleQuestionIcon />
          </button>
        </Tooltip>
        <Tooltip content="Achievements">
          <button
            onClick={() => setAcheivements(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <AwardIcon />
          </button>
        </Tooltip>
        <Tooltip content="Leaderboard">
          <button
            onClick={() => setLeaderboard(true)}
            className="relative overflow-hidden rounded-lg border border-orange-500 bg-orange-300 hover:scale-[1.02] hover:bg-orange-200"
          >
            <TrophyIcon className="relative z-10 mx-2.5 my-2 text-orange-600" />
          </button>
        </Tooltip>
        <Tooltip content="GitHub Repository">
          <a
            href="https://github.com/TigerAppsOrg/PawPointClicker/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-[-1.65rem] hidden rounded-r-lg border border-black/40 bg-orange-100/80 px-1 py-1 text-gray-700 hover:scale-[1.02] hover:bg-orange-200/80 sm:flex"
          >
            <GithubIcon size={16} />
          </a>
        </Tooltip>
      </Flex>
    </>
  );
}
