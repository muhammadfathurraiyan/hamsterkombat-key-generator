"use client";
import { emulateProgress, generateKey, login } from "@/lib//actions";
import { useState } from "react";
import { FaCopy, FaX } from "react-icons/fa6";
import Button from "../ui/Button";
import Card from "../ui/Card";

const EVENTS_DELAY = 20000;
type TGames = {
  [key: number]: {
    name: string;
    appToken: string;
    promoId: string;
    img: string;
  };
};
const games: TGames = {
  1: {
    name: "Riding Extreme 3D",
    appToken: "d28721be-fd2d-4b45-869e-9f253b554e50",
    promoId: "43e35910-c168-4634-ad4f-52fd764a843f",
    img: "/img/r3d.png",
  },
  2: {
    name: "Chain Cube 2048",
    appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2",
    promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3",
    img: "/img/cc2.png",
  },
  3: {
    name: "My Clone Army",
    appToken: "74ee0b5b-775e-4bee-974f-63e7f4d5bacb",
    promoId: "fe693b26-b342-4159-8808-15e3ff7f8767",
    img: "/img/mca.png",
  },
  4: {
    name: "Train Miner",
    appToken: "82647f43-3f87-402d-88dd-09a90025313f",
    promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954",
    img: "/img/tm.png",
  },
  5: {
    name: "Merge Away",
    appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833",
    promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4",
    img: "/img/ma.png",
  },
};

export default function Generator() {
  const [isGenerate, setIsGenerate] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [gameTitle, setGameTitle] = useState("");
  const [progressMessage, setProgressMessage] = useState("");

  const data = Object.keys(games);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllKeys = () => {
    const allKeysText = keys.join("\n");
    copyToClipboard(allKeysText);
  };

  const handleClose = () => {
    setIsGenerate(false);
    setKeys([]);
    window.location.reload();
  };

  const generateClientId = () => {
    const timestamp = Date.now();
    const randomNumbers = Array.from({ length: 19 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    return `${timestamp}-${randomNumbers}`;
  };

  const handleGenerateKeys = async (data: FormData) => {
    const id = data.get("id") as string;
    const keyCount = 4;
    const game = games[parseInt(id)];

    try {
      const generatedKeys = [];
      for (let i = 0; i < keyCount; i++) {
        const clientId = generateClientId();
        const clientToken = await login(clientId, game.appToken);
        for (let attempt = 0; attempt < 11; attempt++) {
          if (!isGenerate) {
            setIsGenerate(true);
            setGameTitle(game.name);
          }
          setProgressMessage(
            `Generating key ${i + 1} of ${keyCount}, attempt ${attempt + 1}...`
          );
          const hasCode = await emulateProgress(clientToken, game.promoId);
          if (hasCode) break;
          await new Promise((resolve) => setTimeout(resolve, EVENTS_DELAY));
        }

        const key = await generateKey(clientToken, game.promoId);
        generatedKeys.push(key);
      }

      setKeys(generatedKeys);
      setProgressMessage("Keys generated successfully!");
    } catch (error) {
      setProgressMessage(
        "Failed to generate keys." +
          " " +
          error +
          " " +
          "Please refresh the page!"
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        {data.map((key) => {
          const id = parseInt(key);
          return (
            <Card
              key={id}
              action={handleGenerateKeys}
              id={id}
              title={games[id].name}
              src={games[id].img}
            />
          );
        })}
      </div>
      <div
        className={`${
          isGenerate ? "visible opacity-100 z-30" : "invisible opacity-0 -z-10"
        } fixed inset-0 bg-background/90 flex items-center justify-center`}
      >
        <div className="flex flex-col relative items-center gap-4 justify-center rounded-xl bg-gradient-to-b from-border to-background w-[400px] p-6">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3"
          >
            <FaX size={18} />
          </button>
          <h2 className="text-2xl font-medium my-2 text-center">
            Generating keys for {gameTitle}
          </h2>
          {keys.length !== 4 ? (
            <svg
              aria-hidden="true"
              className="inline size-14 text-border animate-spin fill-secondary"
              viewBox="0 0 100 101"
              aria-label="Loading..."
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            <div className="w-full grid gap-2">
              <table className="w-full border border-border">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-lg">Key</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((key, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-2 py-1 border-r border-border text-lg">
                        {key}
                      </td>
                      <td className="px-2 p-1 text-right w-5">
                        <button
                          type="button"
                          className="flex items-center justify-center"
                          onClick={() => copyToClipboard(key)}
                        >
                          <FaCopy
                            size={22}
                            className="text-secondary hover:text-primary transition-all"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button onClick={copyAllKeys} variants="generate">
                Copy all!
              </Button>
            </div>
          )}
          <div className="text-lg font-medium text-center">
            {progressMessage}
          </div>
        </div>
      </div>
    </>
  );
}
