"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import PersonCard from "@/components/sections/personCard";
import { getPeoples } from "@/lib/apiCalls/people";
import { querykeys } from "@/lib/apiCalls/queryKeys";
import { useInView } from "framer-motion";
import React from "react";
import { Shell } from "lucide-react";
import { AllCharactersType } from "@/types/api";

export default function Home() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<AllCharactersType, Error>({
    queryKey: [querykeys.people],
    getNextPageParam: (lastPage) => {
      return lastPage.next
        ? new URL(lastPage.next).searchParams.get("page")
        : undefined;
    },
    queryFn: ({ pageParam = 1 }) => getPeoples(pageParam),
  });

  const infiniteLoader = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(infiniteLoader);

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <main className="p-24 gap-sm flex flex-col">
        <h1 className="bg-red-950 border border-red-900 rouded-xl">
          Oops, something went wrong! It seems like server problems. Try again
          later.
        </h1>
      </main>
    );
  }
  return (
    <main className="p-24 gap-sm flex flex-col">
      <h1 className="text-5xl font-bold">Star Wars Characters</h1>
      {isLoading && <Shell className="animate-spin mx-auto mt-xl" />}
      {data?.pages[0].count && (
        <span>Maximum number of characters: {data.pages[0].count}</span>
      )}
      <div className="flex flex-wrap gap-md flex-row max-w-[1250px]">
        {data?.pages.map((group, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {group.results.map((character, resultIndex) => {
              const characterId =
                pageIndex * data.pages[pageIndex].results.length +
                resultIndex +
                1;

              return (
                <PersonCard
                  data={character}
                  id={characterId}
                  originId={resultIndex}
                  key={`person-card-${characterId}`}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div ref={infiniteLoader} className="w-full h-px">
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </main>
  );
}
