import { createFileRoute } from "@tanstack/react-router";
import { MyMonsters } from "../../pages/myMonsters";

export const Route = createFileRoute("/_authenticated/my-monsters")({
  component: MyMonsters,
});
