import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Construction Division | RACTYSH",
  description:
    "Legacy construction requests now route into the Ractysh Construction Division."
};

export default function InfrastructurePage() {
  redirect("/construction");
}
