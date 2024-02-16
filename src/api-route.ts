import type { NextApiRequest, NextApiResponse } from "next";

type PublicEnv = { [key: string]: string };

const publicEnv: PublicEnv = {
  ...Object.keys(process.env).reduce(
    (prev: { [key: string]: string }, key: string) => {
      if (key.startsWith("NEXT_PUBLIC_")) {
        prev[key] = process.env[key] ?? "";
      }
      return prev;
    },
    {}
  ),
};

const publicEnvString = JSON.stringify(publicEnv);

export function createApiRoute() {
  return function handler(_req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
    res.write(`window.__NEXT_PUBLIC_ENV__ = ${publicEnvString};`);
    res.end();
  };
}
