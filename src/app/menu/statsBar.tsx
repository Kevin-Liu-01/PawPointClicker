import React from "react";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
import {
  DollarSign,
  Star,
  Clock,
  MousePointer,
  HourglassIcon,
  TargetIcon,
  InfoIcon,
  ChevronsUpIcon,
} from "lucide-react";
import PrestigeModal from "./prestigeModal";
import formatNumberGenerators from "../utilities/formatNumberGenerators";

interface StatsBarProps {
  count: number;
  lifeTimeEarnings: number;
  totalEarnings: number;
  clickMultiplier: number;
  prestige: number;
  handlePrestige: () => void;
  prestigeThreshold: number;
  passiveIncome: number;
  userClicks: number;
  playTime: number;
}

interface StatsItemProps {
  label: string;
  value: string | number;
  tooltip?: string;
  Icon: React.ElementType;
  textColor: string;
}

const StatsItem: React.FC<StatsItemProps> = ({
  label,
  value,
  tooltip,
  Icon,
  textColor,
}) => (
  <Tooltip content={tooltip}>
    <Flex
      className={`h-full w-full items-center justify-center overflow-auto rounded-xl bg-gray-700 p-2 shadow-lg duration-150 ${textColor}`}
    >
      <Flex className="mr-1 flex-shrink-0 rounded-md bg-gray-600 p-2">
        <Icon className={`h-5 w-5 text-yellow-400`} />
      </Flex>
      <Flex className="flex-grow flex-col items-center text-center">
        <Text className="select-none text-[0.75rem] font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {label}
        </Text>
        <Text className="w-full truncate text-[0.75rem] font-medium text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {value}
        </Text>
      </Flex>
    </Flex>
  </Tooltip>
);

interface PrestigeButtonProps {
  prestige: number;
  handlePrestige: () => void;
  count: number;
  prestigeThreshold: number;
  prestigeBoost: string;
}

const PrestigeButton: React.FC<PrestigeButtonProps> = ({
  prestige,
  handlePrestige,
  count,
  prestigeThreshold,
  prestigeBoost,
}) => (
  <Flex className="relative flex-col gap-2 rounded-2xl border border-yellow-400 bg-yellow-400 p-2 transition-transform hover:scale-[1.02] sm:max-w-[9rem]">
    <Flex
      justify="center"
      align="center"
      className="relative h-full flex-row overflow-auto rounded-xl bg-yellow-500 px-2 py-2 font-bold text-yellow-50 shadow-inner"
    >
      <ChevronsUpIcon className="ml-[-0.70rem] mr-[-0.10rem] size-9 animate-pulse" />
      <Flex className="flex-col">
        <Text className="truncate text-lg sm:text-xl">
          {formatNumberGenerators(Number(prestigeBoost))}%
        </Text>
        <Text className="mt-[-0.35rem] text-xs">Boost</Text>
      </Flex>

      <Tooltip
        content={`Gain a ${formatNumberGenerators(Number(prestigeBoost))}% multiplier on all earnings.`}
      >
        <InfoIcon className="absolute right-1 top-1 ml-2 size-[0.85rem] cursor-pointer text-white opacity-70 hover:opacity-100" />
      </Tooltip>
    </Flex>

    {/* Prestige Button */}
    <PrestigeModal
      prestige={prestige}
      prestigeThreshold={prestigeThreshold}
      count={count}
      handlePrestige={handlePrestige}
    />
  </Flex>
);

export default function StatsBar({
  count,
  lifeTimeEarnings,
  totalEarnings,
  clickMultiplier,
  prestige,
  handlePrestige,
  prestigeThreshold,
  passiveIncome,
  userClicks,
  playTime,
}: StatsBarProps) {
  const prestigeBoost = ((Math.pow(1.05, prestige) - 1) * 100).toFixed(1);

  // Format milliseconds into days, hours, minutes, and seconds
  function formatSeconds(totalSeconds: number) {
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      // If there are days, then show days and the next significant unit:
      if (hours > 0) {
        return `${days} day${days > 1 ? "s" : ""}, ${hours} hour${hours > 1 ? "s" : ""}`;
      } else if (minutes > 0) {
        return `${days} day${days > 1 ? "s" : ""}, ${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else {
        return `${days} day${days > 1 ? "s" : ""}`;
      }
    } else if (hours > 0) {
      // No days, so use hours and the next significant unit:
      if (minutes > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}, ${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else if (seconds > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`;
      } else {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      }
    } else if (minutes > 0) {
      // Only minutes (and possibly seconds) exist:
      if (seconds > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`;
      } else {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
      }
    } else {
      // Only seconds available.
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
  }

  return (
    <Flex className="w-full flex-col gap-3 bg-gradient-to-tr from-blue-400 to-blue-500 p-3 shadow-lg sm:flex-row">
      <div className="grid w-full grid-cols-2 gap-2 overflow-auto rounded-2xl bg-gray-800 p-2 text-white shadow-md xl:grid-cols-3">
        <StatsItem
          label="Current Earnings"
          value={formatNumberGenerators(
            Number(totalEarnings.toString().replace(/[^0-9]/g, "")),
          )}
          tooltip="Total Paw Points earned for the current prestige level."
          Icon={DollarSign}
          textColor="hover:text-green-500"
        />
        <StatsItem
          label="Total Earnings"
          value={formatNumberGenerators(
            Number(lifeTimeEarnings.toString().replace(/[^0-9]/g, "")),
          )}
          tooltip="Total Paw Points earned over all prestiges."
          Icon={Star}
          textColor="hover:text-purple-400"
        />
        <StatsItem
          label="Passive Income"
          value={`${formatNumberGenerators(Number(passiveIncome))} / sec`}
          tooltip="Paw Points earned per second from all generators."
          Icon={Clock}
          textColor="hover:text-blue-400"
        />
        <StatsItem
          label="Points Per Click"
          value={`+${formatNumberGenerators(
            Number(Math.round(clickMultiplier * Math.pow(1.05, prestige))),
          )} (Max)`}
          tooltip="Maximum Paw Points generated per click."
          Icon={MousePointer}
          textColor="hover:text-red-400"
        />
        <StatsItem
          label="Total Clicks"
          value={
            formatNumberGenerators(
              Number(userClicks.toString().replace(/[^0-9]/g, "")),
            ) + " clicks"
          }
          tooltip="Total times you clicked the GigaProx."
          Icon={TargetIcon}
          textColor="hover:text-teal-400"
        />
        <StatsItem
          label="Time Played"
          value={formatSeconds(playTime) || "0 seconds"}
          tooltip="Total time spent playing."
          Icon={HourglassIcon}
          textColor="hover:text-yellow-400"
        />
      </div>
      <PrestigeButton
        prestige={prestige}
        handlePrestige={handlePrestige}
        count={count}
        prestigeThreshold={prestigeThreshold}
        prestigeBoost={prestigeBoost}
      />
    </Flex>
  );
}
