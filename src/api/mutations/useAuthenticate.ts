import { useMutation } from "@tanstack/react-query";
import { authenticate } from "../autenticate";

export function useAuthenticate() {
  return useMutation({
    mutationFn: authenticate,
  });
}
