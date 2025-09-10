import { useQuery } from "@tanstack/react-query";
import { makeTypesQuery } from "../queryFactory/makeTypesQuery";

export const useFetchAllTypes = () => {
    return useQuery(makeTypesQuery.allFetch());
}