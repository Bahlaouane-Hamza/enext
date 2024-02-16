/// <reference types="node" />
import { Head as BaseHead } from "next/document";

export class Head extends BaseHead {
  getScripts(files: any) {
    const scripts: JSX.Element[] = super.getScripts(files);
    // @ts-ignore
    const path = this.props.scriptPath;

    scripts.unshift(
      <NextPublicEnvLoader
        key="next-public-env"
        scriptPath={path ?? "/api/_ENV"}
      />
    );

    return scripts;
  }
}

const NextPublicEnvLoader = ({ scriptPath }: { scriptPath: string }) => {
  return <script id="__NEXT_PUBLIC_ENV__" src={scriptPath} />;
};

export function env(name: string) {
  return typeof window !== "undefined"
    ? (window as any).__NEXT_PUBLIC_ENV__[name]
    : process.env[name];
}
