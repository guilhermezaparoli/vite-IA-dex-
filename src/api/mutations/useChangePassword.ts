import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../changePassword";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
