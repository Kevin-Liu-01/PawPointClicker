"use client";
import React, { useEffect, useRef, useState } from "react";
import Toolbar from "./components/toolbar";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";
import Achievements from "./components/acheivementsModal";
import useLocalStorage from "./utilities/useLocalStorage";

// A helper that returns a namespaced storage key.
function getStorageKey(key: string, session: any) {
  if (session?.user?.email) {
    return `user_${session.user.email}_${key}`;
  }
  return `guest_${key}`;
}

export default function HomePage({ session }: any) {
  // Use our helper so that our useLocalStorage keys are namespaced appropriately.
  const [proxName, setProxName] = useLocalStorage(
    getStorageKey("proxName", session),
    "Random Prox",
  );

  // Game state variables
  const [count, setCount] = useLocalStorage(getStorageKey("count", session), 0);
  const [lifeTimeEarnings, setLifetimeEarnings] = useLocalStorage(
    getStorageKey("lifeTimeEarnings", session),
    0,
  );
  const [clickMultiplier, setClickMultiplier] = useLocalStorage(
    getStorageKey("clickMultiplier", session),
    1,
  );
  const [totalEarnings, setTotalEarnings] = useLocalStorage(
    getStorageKey("totalEarnings", session),
    0,
  );

  // Prestige variables
  const [prestige, setPrestige] = useLocalStorage(
    getStorageKey("prestige", session),
    0,
  );
  const [prestigeThreshold, setPrestigeThreshold] = useLocalStorage(
    getStorageKey("prestigeThreshold", session),
    1000000,
  );

  // User clicks
  const [userClicks, setUserClicks] = useLocalStorage(
    getStorageKey("userClicks", session),
    0,
  );

  // Collectors
  const [latemeal, setLatemeal] = useLocalStorage(
    getStorageKey("latemeal", session),
    0,
  );
  const [scanner, setScanner] = useLocalStorage(
    getStorageKey("scanner", session),
    0,
  );
  const [deliveries, setDeliveries] = useLocalStorage(
    getStorageKey("frist", session),
    0,
  );
  const [resco, setResco] = useLocalStorage(getStorageKey("resco", session), 0);
  const [farms, setFarms] = useLocalStorage(getStorageKey("farms", session), 0);
  const [mine, setMine] = useLocalStorage(getStorageKey("mine", session), 0);
  const [factories, setFactories] = useLocalStorage(
    getStorageKey("factories", session),
    0,
  );
  const [bank, setBank] = useLocalStorage(getStorageKey("bank", session), 0);
  const [lab, setLab] = useLocalStorage(getStorageKey("lab", session), 0);
  const [temple, setTemple] = useLocalStorage(
    getStorageKey("temple", session),
    0,
  );
  const [spaceStation, setSpaceStation] = useLocalStorage(
    getStorageKey("spaceStation", session),
    0,
  );

  // Achievement Modal Control
  const [acheivements, setAcheivements] = useLocalStorage(
    "achievements",
    false,
  );

  // (Optional) Keep game start time if you need a fixed timestamp reference.
  const [gameStartTime, setGameStartTime] = useLocalStorage(
    getStorageKey("time", session),
    "",
  );

  // New: Play time counter in seconds (only counts when the tab is active)
  const [playTime, setPlayTime] = useLocalStorage(
    getStorageKey("playTime", session),
    0,
  );

  // A flag to ensure that remote data is imported before further saving occurs.
  const [hasImportedUserData, setHasImportedUserData] = useState(false);

  // Helper to clean up stored values
  function parseStoredValue(key: string, value: string) {
    // Only adjust for proxName because that’s where the issue is
    if (key === "proxName") {
      // Remove extra quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
      }
    }
    return value;
  }

  // ─── 1. Always Migrate Raw Guest Keys to Guest Namespace ───────────────
  useEffect(() => {
    const keysToMigrate = [
      "proxName",
      "count",
      "lifeTimeEarnings",
      "clickMultiplier",
      "totalEarnings",
      "prestige",
      "prestigeThreshold",
      "userClicks",
      "latemeal",
      "scanner",
      "frist", // deliveries stored under "frist"
      "resco",
      "farms",
      "mine",
      "factories",
      "bank",
      "lab",
      "temple",
      "spaceStation",
      "time",
      "achievements",
      "playTime",
    ];

    // For each key, check if the non-namespaced key is present.
    keysToMigrate.forEach((key) => {
      const rawValue = localStorage.getItem(key);
      if (rawValue !== null) {
        // Set state accordingly
        switch (key) {
          case "proxName":
            const cleanedValue = parseStoredValue(key, rawValue);
            setProxName(cleanedValue);
            break;
          case "count":
            setCount(Number(rawValue));
            break;
          case "lifeTimeEarnings":
            setLifetimeEarnings(Number(rawValue));
            break;
          case "clickMultiplier":
            setClickMultiplier(Number(rawValue));
            break;
          case "totalEarnings":
            setTotalEarnings(Number(rawValue));
            break;
          case "prestige":
            setPrestige(Number(rawValue));
            break;
          case "prestigeThreshold":
            setPrestigeThreshold(Number(rawValue));
            break;
          case "userClicks":
            setUserClicks(Number(rawValue));
            break;
          case "latemeal":
            setLatemeal(Number(rawValue));
            break;
          case "scanner":
            setScanner(Number(rawValue));
            break;
          case "frist":
            setDeliveries(Number(rawValue));
            break;
          case "resco":
            setResco(Number(rawValue));
            break;
          case "farms":
            setFarms(Number(rawValue));
            break;
          case "mine":
            setMine(Number(rawValue));
            break;
          case "factories":
            setFactories(Number(rawValue));
            break;
          case "bank":
            setBank(Number(rawValue));
            break;
          case "lab":
            setLab(Number(rawValue));
            break;
          case "temple":
            setTemple(Number(rawValue));
            break;
          case "spaceStation":
            setSpaceStation(Number(rawValue));
            break;
          case "time":
            setGameStartTime(rawValue);
            break;

          case "playTime":
            setPlayTime(Number(rawValue));
            break;
          default:
            break;
        }
        // Now move the raw key value into the guest namespace.
        localStorage.removeItem(key);
        localStorage.setItem(`guest_${key}`, rawValue);
      }
    });
  }, []); // Run once on mount regardless of login status

  // ─── 2. Function to Migrate Guest Namespace Keys to a User Namespace ─────────
  const migrateGuestKeysToUser = () => {
    const keysToMigrate = [
      "proxName",
      "count",
      "lifeTimeEarnings",
      "clickMultiplier",
      "totalEarnings",
      "prestige",
      "prestigeThreshold",
      "userClicks",
      "latemeal",
      "scanner",
      "frist", // deliveries stored under "frist"
      "resco",
      "farms",
      "mine",
      "factories",
      "bank",
      "lab",
      "temple",
      "spaceStation",
      "time",
      "achievements",
      "playTime",
    ];

    keysToMigrate.forEach((key) => {
      const guestKey = `guest_${key}`;
      const userKey = `user_${session.user.email}_${key}`;
      const guestValue = localStorage.getItem(guestKey);
      if (guestValue !== null) {
        // Update state with the guest value
        switch (key) {
          case "proxName":
            const cleanedValue = parseStoredValue(key, guestValue);
            setProxName(cleanedValue);
            break;
          case "count":
            setCount(Number(guestValue));
            break;
          case "lifeTimeEarnings":
            setLifetimeEarnings(Number(guestValue));
            break;
          case "clickMultiplier":
            setClickMultiplier(Number(guestValue));
            break;
          case "totalEarnings":
            setTotalEarnings(Number(guestValue));
            break;
          case "prestige":
            setPrestige(Number(guestValue));
            break;
          case "prestigeThreshold":
            setPrestigeThreshold(Number(guestValue));
            break;
          case "userClicks":
            setUserClicks(Number(guestValue));
            break;
          case "latemeal":
            setLatemeal(Number(guestValue));
            break;
          case "scanner":
            setScanner(Number(guestValue));
            break;
          case "frist":
            setDeliveries(Number(guestValue));
            break;
          case "resco":
            setResco(Number(guestValue));
            break;
          case "farms":
            setFarms(Number(guestValue));
            break;
          case "mine":
            setMine(Number(guestValue));
            break;
          case "factories":
            setFactories(Number(guestValue));
            break;
          case "bank":
            setBank(Number(guestValue));
            break;
          case "lab":
            setLab(Number(guestValue));
            break;
          case "temple":
            setTemple(Number(guestValue));
            break;
          case "spaceStation":
            setSpaceStation(Number(guestValue));
            break;
          case "time":
            setGameStartTime(guestValue);
            break;

          case "playTime":
            setPlayTime(Number(guestValue));
            break;
          default:
            break;
        }
        // Remove from guest namespace and copy into user namespace
        localStorage.removeItem(guestKey);
        localStorage.setItem(userKey, guestValue);
      }
    });
  };

  // ─── 3. Initialize or Import User Data Based on Backend Existence ─────────────
  useEffect(() => {
    if (session?.user?.email) {
      async function initializeUser() {
        try {
          const res = await fetch("/api/getUserData");
          const { data, error } = await res.json();
          if (error) {
            console.error("Error from API:", error);
            // Even in error, we attempt migration from guest namespace.
            migrateGuestKeysToUser();
          } else if (data) {
            // If backend data exists, import it and do not migrate guest data.
            // This ensures any local guest progress is ignored in favor of the saved account data.
            setProxName(data.proxName ? data.proxName : "Random Prox");
            setCount(data.count ?? 0);
            setLatemeal(data.latemeal ?? 0);
            setLifetimeEarnings(data.lifeTimeEarnings ?? 0);
            setClickMultiplier(data.clickMultiplier ?? 1);
            setDeliveries(data.deliveries ?? 0);
            setFactories(data.factories ?? 0);
            setFarms(data.farms ?? 0);
            setResco(data.resco ?? 0);
            setScanner(data.scanner ?? 0);
            setMine(data.mine ?? 0);
            setBank(data.bank ?? 0);
            setLab(data.lab ?? 0);
            setTemple(data.temple ?? 0);
            setSpaceStation(data.spaceStation ?? 0);
            setTotalEarnings(data.totalEarnings ?? 0);
            setPrestige(data.prestige ?? 0);
            setUserClicks(data.userClicks ?? 0);
            setPrestigeThreshold(data.prestigeThreshold ?? 1000000);
            if (data.gameStartTime) {
              setGameStartTime(data.gameStartTime);
            } else {
              const now = new Date().toISOString();
              setGameStartTime(now);
            }
            if (typeof data.playTimeSeconds === "number") {
              setPlayTime(data.playTimeSeconds);
            }
          } else {
            // If no backend data exists, this is the first login.
            // Migrate guest data into user namespaced keys and
            // the game will later save the migrated progress.
            migrateGuestKeysToUser();
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          // On fetch error, still try migrating the guest data
          migrateGuestKeysToUser();
        } finally {
          setHasImportedUserData(true);
        }
      }
      initializeUser();
    } else {
      // When not logged in, simply mark import as complete.
      setHasImportedUserData(true);
    }
  }, [session]);

  // ─── 4. INITIALIZE GAME START TIME (OPTIONAL) ─────────────────────────────
  useEffect(() => {
    if (!gameStartTime) {
      const startTime = new Date().toISOString();
      setGameStartTime(startTime);
    }
  }, []);

  // ─── 5. TRACK PLAY TIME ONLY WHILE ACTIVE ─────────────────────────────
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    const handleFocus = () => setIsPlaying(true);
    const handleBlur = () => setIsPlaying(false);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Increment playTime every second only while the tab is active.
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setPlayTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, setPlayTime]);

  // ─── PRESTIGE FUNCTION ─────────────────────────────────────────────
  const handlePrestige = () => {
    if (lifeTimeEarnings >= prestigeThreshold) {
      setPrestige((prev) => prev + 1);
      setPrestigeThreshold(Math.round(Math.pow(prestigeThreshold, 1.15)));
      setCount(0);
      setTotalEarnings(0);
      setClickMultiplier(1);
      setLatemeal(0);
      setScanner(0);
      setDeliveries(0);
      setResco(0);
      setFarms(0);
      setMine(0);
      setFactories(0);
      setBank(0);
      setLab(0);
      setTemple(0);
      setSpaceStation(0);
    } else {
      alert(
        `You need ${(prestigeThreshold - count)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} more Paw Points to Prestige!`,
      );
    }
  };

  // ─── PASSIVE INCOME CALCULATION ─────────────────────────────────────────────
  const calculateIncome = (amount: number, rate: number, prestige: number) =>
    Math.round(amount * rate * Math.pow(1.05, prestige));

  const components = [
    { amount: clickMultiplier, rate: 1 },
    { amount: latemeal, rate: 2 },
    { amount: scanner, rate: 8 },
    { amount: deliveries, rate: 47 },
    { amount: resco, rate: 260 },
    { amount: farms, rate: 1400 },
    { amount: mine, rate: 7800 },
    { amount: factories, rate: 44000 },
    { amount: bank, rate: 260000 },
    { amount: lab, rate: 1600000 },
    { amount: temple, rate: 10000000 },
    { amount: spaceStation, rate: 65000000 },
  ];

  const passiveIncome = components.reduce(
    (total, { amount, rate }) =>
      total + calculateIncome(amount, rate, prestige),
    0,
  );

  // ─── INCREASE COUNTS EVERY SECOND ─────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + passiveIncome);
      setLifetimeEarnings((prev) => prev + passiveIncome);
      setTotalEarnings((prev) => prev + passiveIncome);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    clickMultiplier,
    latemeal,
    farms,
    deliveries,
    resco,
    factories,
    scanner,
    mine,
    bank,
    lab,
    temple,
    spaceStation,
    prestige,
  ]);

  // ─── TRACK PREVIOUS COUNT ─────────────────────────────────────────────
  const oldCountRef = useRef(count);
  useEffect(() => {
    oldCountRef.current = count;
  }, [count]);

  const totalPowerUps =
    clickMultiplier +
    latemeal +
    scanner +
    deliveries +
    resco +
    farms +
    factories +
    mine +
    bank +
    lab +
    temple +
    spaceStation;

  const unlocked =
    (clickMultiplier > 0 ? 1 : 0) +
    (latemeal > 0 ? 1 : 0) +
    (scanner > 0 ? 1 : 0) +
    (deliveries > 0 ? 1 : 0) +
    (resco > 0 ? 1 : 0) +
    (farms > 0 ? 1 : 0) +
    (mine > 0 ? 1 : 0) +
    (factories > 0 ? 1 : 0) +
    (bank > 0 ? 1 : 0) +
    (lab > 0 ? 1 : 0) +
    (temple > 0 ? 1 : 0) +
    (spaceStation > 0 ? 1 : 0);

  // ─── GATHER GAME DATA FOR SAVING ─────────────────────────────────────────────
  const gatherGameData = () => ({
    session: session,
    proxName,
    count,
    lifeTimeEarnings,
    clickMultiplier,
    totalEarnings,
    prestige,
    prestigeThreshold,
    userClicks,
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
    gameStartTime,
    playTimeSeconds: playTime,
    lastSaved: new Date().toISOString(),
  });

  // ─── SETUP A REF TO HOLD THE LATEST GAME DATA ─────────────────────────────
  const gameDataRef = useRef(gatherGameData());

  // Update the gameDataRef whenever any of the game-related state changes.
  useEffect(() => {
    gameDataRef.current = gatherGameData();
  }, [
    proxName,
    count,
    lifeTimeEarnings,
    clickMultiplier,
    totalEarnings,
    prestige,
    prestigeThreshold,
    userClicks,
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
    gameStartTime,
    playTime,
  ]);

  // ─── SAVE GAME DATA EVERY 30 SECONDS (ONLY FOR LOGGED IN USERS AFTER DATA IMPORT) ─────
  useEffect(() => {
    if (!session || !hasImportedUserData) return;

    const interval = setInterval(() => {
      // Always use the latest game data from the ref.
      console.log("Saving game data...");
      const gameData = gameDataRef.current;
      fetch("/api/saveGameData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameData }),
      }).catch((err) => console.error("Error saving game data: ", err));
    }, 30000);

    return () => clearInterval(interval);
  }, [session, hasImportedUserData]);

  // ─── FETCH USER DATA FROM BACKEND ─────────────────────────────────────────────
  useEffect(() => {
    if (session?.user?.email) {
      async function fetchUserData() {
        console.log(`Fetching user data for ${session?.user.name}.`);
        try {
          const res = await fetch("/api/getUserData");
          const { data, error } = await res.json();
          console.log("Fetched data from backend:", data);
          if (error) {
            console.error("Error from API:", error);
            setHasImportedUserData(true);
            return;
          }
          if (data) {
            // Import the saved data
            setProxName(data.proxName ? data.proxName : "Random Prox");
            setCount(data.count ?? 0);
            setLatemeal(data.latemeal ?? 0);
            setLifetimeEarnings(data.lifeTimeEarnings ?? 0);
            setClickMultiplier(data.clickMultiplier ?? 1);
            setDeliveries(data.deliveries ?? 0);
            setFactories(data.factories ?? 0);
            setFarms(data.farms ?? 0);
            setResco(data.resco ?? 0);
            setScanner(data.scanner ?? 0);
            setMine(data.mine ?? 0);
            setBank(data.bank ?? 0);
            setLab(data.lab ?? 0);
            setTemple(data.temple ?? 0);
            setSpaceStation(data.spaceStation ?? 0);
            setTotalEarnings(data.totalEarnings ?? 0);
            setPrestige(data.prestige ?? 0);
            setUserClicks(data.userClicks ?? 0);
            setPrestigeThreshold(data.prestigeThreshold ?? 1000000);
            if (data.gameStartTime) {
              setGameStartTime(data.gameStartTime);
            } else {
              const now = new Date().toISOString();
              setGameStartTime(now);
            }
            if (typeof data.playTimeSeconds === "number") {
              setPlayTime(data.playTimeSeconds);
            }
          }
          // If backend data exists, we leave any remaining guest data alone.
          setHasImportedUserData(true);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setHasImportedUserData(true);
        }
      }
      fetchUserData();
    } else {
      // For guest users, import is already complete.
      setHasImportedUserData(true);
    }
  }, [session]);

  return (
    <div className="relative grid w-full grid-cols-1 font-sans sm:h-screen sm:grid-cols-2 sm:overflow-hidden">
      <Toolbar session={session} setAcheivements={setAcheivements} />
      <Achievements
        stats={{
          count,
          prestigeLevel: prestige,
          lifeTimeEarnings,
          clickMultiplier,
          latemeal,
          farms,
          deliveries,
          resco,
          factories,
          scanner,
          mine,
          bank,
          lab,
          temple,
          spaceStation,
          totalEarnings,
          totalEfficiencyBoost: Math.round(Math.pow(1.05, prestige) * 100),
          passiveIncome,
          upgradesUnlocked: unlocked,
          collectors: totalPowerUps,
          playTime: playTime,
          userClicks,
          hiddenFeaturesUnlocked: 0,
        }}
        achievements={acheivements}
        setAchievements={setAcheivements}
      />
      <ProxMenu
        proxName={proxName}
        setProxName={setProxName}
        count={count}
        setCount={setCount}
        oldCount={oldCountRef.current}
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
        scanner={scanner}
        totalEarnings={totalEarnings}
        setTotalEarnings={setTotalEarnings}
        lifeTimeEarnings={lifeTimeEarnings}
        setLifetimeEarnings={setLifetimeEarnings}
        passiveIncome={passiveIncome}
        prestige={prestige}
        collectors={{
          latemeal,
          farms,
          deliveries,
          resco,
          factories,
          scanner,
          mine,
          bank,
          lab,
          temple,
          spaceStation,
        }}
        userClicks={userClicks}
        setUserClicks={setUserClicks}
      />
      <PowerUpMenu
        count={count}
        setCount={setCount}
        lifeTimeEarnings={lifeTimeEarnings}
        totalEarnings={totalEarnings}
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
        lateMeal={latemeal}
        setLateMeal={setLatemeal}
        scanner={scanner}
        setScanner={setScanner}
        deliveries={deliveries}
        setDeliveries={setDeliveries}
        resco={resco}
        setResco={setResco}
        farms={farms}
        setFarms={setFarms}
        mine={mine}
        setMine={setMine}
        factories={factories}
        setFactories={setFactories}
        bank={bank}
        setBank={setBank}
        lab={lab}
        setLab={setLab}
        temple={temple}
        setTemple={setTemple}
        spaceStation={spaceStation}
        setSpaceStation={setSpaceStation}
        prestige={prestige}
        handlePrestige={handlePrestige}
        prestigeThreshold={prestigeThreshold}
        passiveIncome={passiveIncome}
        userClicks={userClicks}
        playTime={playTime}
      />
    </div>
  );
}
