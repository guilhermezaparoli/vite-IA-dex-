import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMonster } from "../createMonster";
import { makeMonstersQuery } from "../queries/queryFactory/makeMonstersQuery";

export function useCreateMonster() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createMonster,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: makeMonstersQuery.all()
            })
        }
    })
}