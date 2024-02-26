import type { AllCharactersType, CharacterType } from "@/types/api";
import fetchFromApi from "../fetchFromApi";

export const getPeoples = (page: number): Promise<AllCharactersType> => fetchFromApi(`/people/?page=${page}`);

export const getSelectedChar = (id: number): Promise<CharacterType> => fetchFromApi(`/people/${id}`);
