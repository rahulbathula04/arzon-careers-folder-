import { ArzonHomeIntelligence } from "@/components/home/ArzonHomeIntelligence";

/**
 * Homepage composition retained under its existing export so the root route,
 * analytics hooks and campaign integrations remain unchanged.
 */
export function ArzonHomeV2() {
  return <ArzonHomeIntelligence />;
}
