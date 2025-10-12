import { createFileRoute } from "@tanstack/react-router";
import { ChangePassword } from "../../pages/changePassword";

export const Route = createFileRoute("/_authenticated/change-password")({
  component: ChangePassword,
});
