import { useRouter } from "next/navigation";
import { isFavorite } from "@/lib/toggleFavourite";
import { StarIcon } from "lucide-react";
import { CharacterType } from "@/types/api";
import { motion } from "framer-motion";

type PropsType = {
  data: CharacterType;
  id: number;
  originId: number;
};

export default function PersonCard({ data, id, originId }: PropsType) {
  const { name } = data;
  const router = useRouter();

  return (
    <motion.section
      onClick={() => router.push("/character/" + id)}
      className="cursor-pointer p-md border border-slate-800 bg-default rounded-xl w-60 h-60"
      layoutId={"characterData-" + id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 0.1 * originId,
      }}
    >
      <div className="flex">
        <h2 className="mb-md mr-md">{name}</h2>
        {isFavorite("char-" + id) ? (
          <StarIcon fill="red" stroke="red" />
        ) : (
          <StarIcon />
        )}
      </div>
    </motion.section>
  );
}
