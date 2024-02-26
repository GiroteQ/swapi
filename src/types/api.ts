import { z } from 'zod';

const CharacterSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string(),
  films: z.array(z.string()).nonempty().optional(),
  species: z.array(z.string()).optional(),
  vehicles: z.array(z.string()).optional(),
  starships: z.array(z.string()).optional(),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

const ResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(CharacterSchema),
});

export type CharacterType = z.infer<typeof CharacterSchema>;
export type AllCharactersType = z.infer<typeof ResponseSchema>;