// app/api/keystatic/route.ts
export const runtime = "edge";

import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// Keep these exports exactly like this
export const { GET, POST } = makeRouteHandler({ config });