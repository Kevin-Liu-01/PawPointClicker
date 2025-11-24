"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Flex, Text, Separator } from "@radix-ui/themes";
import {
  MouseIcon,
  MousePointerClickIcon,
  SquareArrowOutUpRightIcon,
  XIcon,
} from "lucide-react";

export default function WelcomeModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  // useEffect(() => {
  //   const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
  //   if (!hasSeenModal) {
  //     props.setIsOpen(true);
  //   }
  // }, []);

  const handleClose = () => {
    // localStorage.setItem("hasSeenWelcomeModal", "true");
    props.setIsOpen(false);
  };

  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.setIsOpen}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-orange-300 p-4 shadow-2xl sm:p-6">
        <Dialog.Title className="flex items-center gap-2 text-sm font-semibold text-gray-800 sm:text-base md:text-2xl">
          <img
            src="/images/prox.svg"
            alt="Prox"
            className="mr-1 h-10 w-10 rounded-full"
          />{" "}
          Welcome to PawPointClicker!
        </Dialog.Title>
        <Box className="mt-2 text-yellow-900">
          <Separator orientation="horizontal" size="4" className="mb-4" />
          <Box className="rounded-xl bg-orange-200 p-4 text-xs font-medium sm:text-sm md:text-lg">
            <Text className="font-semibold">Cookie Clicker for Princeton!</Text>{" "}
            PawPointClicker is a fun and engaging idle game where you collect
            Paw Points by clicking and purchasing powerful collectors. Click
            your way to greatness!
            <Flex className="mt-3 rounded-lg border-2 border-blue-400/50 bg-blue-300/70 p-3 text-xs font-semibold text-blue-700 sm:text-sm">
              <MousePointerClickIcon className="my-auto mr-4 size-5 text-blue-600" />
              <Box className="my-auto">
                PawPointClicker {">>>"} iClicker !!!{" "}
              </Box>
            </Flex>
          </Box>

          <Box className="mt-3 text-xs sm:mt-4 sm:text-base">
            Start by clicking on the giant prox to earn points. Spend your
            points on generators to automate your earnings and unlock unique
            abilities!
          </Box>
          <Box className="mt-3 text-xs sm:mt-4 sm:text-base">
            Click the "Prestige" button to reset your progress and earn a
            permanent bonus to your point generation.
          </Box>
          {/* <Box className="mt-3 rounded-xl bg-yellow-400 p-4">
            <Box className="text-lg font-medium">
              <span className="text-orange-800">Your First Goal:</span>
            </Box>
            <Flex align="center" className="mt-2">
              Earn{" "}
              <span className="mx-2 font-semibold text-green-600">100</span> Paw
              Points to unlock your first upgrade!
            </Flex>
          </Box> */}
          <Flex className="mt-3 rounded-lg border-2 border-orange-500/50 bg-orange-400/50 p-4 font-semibold text-orange-800 sm:mt-4">
            <MouseIcon className="my-auto mr-4 size-8 text-orange-700 sm:size-6" />
            <Box className="my-auto text-xs sm:text-sm md:text-base">
              Click away and start earning those Paw Points!
            </Box>
          </Flex>
        </Box>
        <Separator orientation="horizontal" size="4" className="my-5" />
        <Flex className="flex items-center gap-4">
          <a
            href="https://kevin-liu.tech/"
            className="flex items-center rounded-lg bg-orange-200 px-3 py-2 text-sm font-semibold text-orange-800 transition hover:bg-orange-100 hover:underline sm:px-4 sm:text-base"
          >
            <span className="mr-1 hidden xs:flex">By </span>{" "}
            <span> Kevin Liu '28</span>
            <SquareArrowOutUpRightIcon className="ml-1 inline-block h-5 w-5 sm:ml-2" />
          </a>
          <Dialog.Close asChild>
            <button
              onClick={handleClose}
              className="ml-auto rounded-lg border-2 border-orange-500/50 bg-orange-400 px-3 py-2 text-sm font-medium text-orange-100 transition hover:bg-orange-600 sm:px-4 sm:text-base"
            >
              Start Clicking!
            </button>
          </Dialog.Close>
        </Flex>
        <Dialog.Close asChild>
          <XIcon className="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer sm:m-7" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
