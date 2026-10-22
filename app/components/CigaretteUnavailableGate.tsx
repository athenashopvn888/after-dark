import CigaretteUnavailable from "./CigaretteUnavailable";
import { isGatedCigarettePath } from "../lib/cigaretteCatalog";
import { getWebGate } from "../lib/cigaretteFeed";

/** Renders nothing while cigarettes follow the coded switch or are on. */
export default async function CigaretteUnavailableGate({ pathname }: { pathname: string }) {
  if (!isGatedCigarettePath(pathname)) return null;
  if ((await getWebGate()) !== "unavailable") return null;
  return <CigaretteUnavailable />;
}
