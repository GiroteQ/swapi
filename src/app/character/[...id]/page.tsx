"use client";

import { querykeys } from "@/lib/apiCalls/queryKeys";
import {
  CakeIcon,
  Eye,
  Layers2,
  Ruler,
  Shell,
  Smile,
  StarIcon,
  Weight,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { extractIdFromMovieUrl } from "@/lib/extract";
import { getSelectedChar } from "@/lib/apiCalls/people";
import { isFavorite, toggleFavorite } from "@/lib/toggleFavourite";

export default function CharacterPage() {
  const { id } = useParams();
  const router = useRouter();
  const charId = id[0];

  const { data, isLoading } = useQuery({
    queryKey: [querykeys.selectedChar, charId],
    queryFn: () => getSelectedChar(Number(charId)),
  });

  const handleGoToMovieButton = (urlFromApi: string) => {
    const id = extractIdFromMovieUrl(urlFromApi);
    // do something other, anything you want

    router.push("/movies/" + id);
  };

  const handleGoToVehicleButton = (urlFromApi: string) => {
    const id = extractIdFromMovieUrl(urlFromApi);
    // do something other, anything you want

    router.push("/vehicle/" + id);
  };

  return (
    <main className="p-24">
      {isLoading && <Shell className="animate-spin" />}
      {data && <h1>{data.name}</h1>}
      <motion.div
        layoutId={"characterData-" + charId}
        className="flex flex-col min-h-[800px] gap-md p-24 border border-slate-700 rounded-xl mt-md bg-default"
      >
        {data && (
          <>
            <div
              className="mx-auto cursor-pointer"
              onClick={() => toggleFavorite("char-" + id)}
            >
              {isFavorite("char-" + id) ? (
                <StarIcon fill="red" stroke="red" />
              ) : (
                <StarIcon />
              )}
            </div>

            {data.gender && (
              <span className="ml-auto">Gender: {data.gender}</span>
            )}

            <div className="flex flex-row">
              <div className="w-1/2 child2nMarginBottomMd">
                {/* birth */}
                {data.birth_year && (
                  <>
                    <CakeIcon />
                    <p>{data.birth_year}</p>
                  </>
                )}
                {/* eye color */}
                {data.eye_color && (
                  <>
                    <Eye />
                    <p>{data.eye_color}</p>
                  </>
                )}
                {/* hair color */}
                {data.hair_color && (
                  <>
                    {/* couldnt find better icon :( ) */}
                    <Smile />
                    <p>{data.hair_color}</p>
                  </>
                )}
              </div>
              <div className="w-1/2 flex flex-col items-end child2nMarginBottomMd">
                {/* height */}
                {data.height && (
                  <>
                    <Ruler />
                    <p>{data.height}</p>
                  </>
                )}
                {/* mass */}
                {data.mass && (
                  <>
                    <Weight />
                    <p>{data.mass}</p>
                  </>
                )}
                {/* skin */}
                {data.skin_color && (
                  <>
                    <Layers2 />
                    <p>{data.skin_color}</p>
                  </>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-slate-900" />

            {data.homeworld && <button>Go to homeworld page</button>}

            <div className="flex flex-row gap-md">
              {data.films?.length && (
                <div className="flex flex-col w-1/2 gap-sm">
                  <h2>Character appeared in these films:</h2>
                  {data.films.map((url, id) => (
                    <button
                      key={"movieBtn" + id}
                      onClick={() => handleGoToMovieButton(url)}
                    >
                      Go to movie nr. {id + 1}
                    </button>
                  ))}
                </div>
              )}

              {data.vehicles?.length ? (
                <div className="flex flex-col w-1/2 gap-sm">
                  <h2>Character has these vehicles:</h2>
                  {data.vehicles?.map((url, id) => (
                    <button
                      key={"vehiclesBtn" + id}
                      onClick={() => handleGoToVehicleButton(url)}
                    >
                      Go to vehicle nr. {id + 1}
                    </button>
                  ))}
                </div>
              ) : (
                <span className="m-auto">
                  This character does not have any vehicle
                </span>
              )}
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
}
