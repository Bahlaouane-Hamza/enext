# 🌐 Next.js Runtime Public Environment

**Effortlessly populate your environment at runtime, not just at build time.**

🌟 **Highlights:**
- **Isomorphic Design:** Works seamlessly on both server and browser, and even in middleware.
- **Next.js 13 & 14 Ready:** Fully compatible with the latest Next.js features.
- **`.env` Friendly:** Use `.env` files during development, just like standard Next.js.

### 🤔 Why `env-nextjs`?

In the modern software development landscape, the "[Build once, deploy many][build-once-deploy-many-link]" philosophy is key. This principle, essential for easy deployment and testability, is a [cornerstone of continuous delivery][fundamental-principle-link] and is embraced by the [twelve-factor methodology][twelve-factor-link]. However, front-end development, particularly with Next.js, often lacks support for this - requiring separate builds for different environments. `env-nextjs` is our solution to bridge this gap in Next.js.

### 📦 Introducing `env-nextjs`

`env-nextjs` dynamically injects environment variables into your Next.js application at runtime using a `script` tag loaded before any other script. This approach adheres to the "build once, deploy many" principle, allowing the same build to be used across various environments without rebuilds.


### 🚀 Getting Started

Install with `npm install env-nextjs`.

In your `src/pages/_document.js`, replace the `Head` component with the following:

```js
// src/pages/_document.js
import { Html, Main, NextScript } from "next/document";
import { Head } from "env-nextjs";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

The `Head` component automatically exposes all environment variables prefixed with `NEXT_PUBLIC_` to the browser as `window.__NEXT_PUBLIC_ENV__`.

Add `src/pages/api/_ENV.js`

```js
// src/pages/api/_ENV.js
import { createApiRoute } from "env-nextjs/api-route"

export default createApiRoute()
```

This route is used to bypass Next.js cache & static generation.

### 🧑‍💻 Usage

Access your environment variables easily:

#### From Components & Pages.
```jsx
// src/pages/some-page.jsx
import { env } from 'env-nextjs';

export default function SomePage() {
  const NEXT_PUBLIC_FOO = env('NEXT_PUBLIC_FOO');
  return <main>NEXT_PUBLIC_FOO: {NEXT_PUBLIC_FOO}</main>;
}

export async function getServerSideProps() {
  console.log(
    "env from getServerSideProps",
    env("NEXT_PUBLIC_BASE_URL")
  );
  return { props: { } };
}
```

#### From Middlewares.
```js
// src/middleware.js
import { NextResponse } from 'next/server'
import { env } from 'env-nextjs';

export function middleware(request) {
  console.log("env inside middleware", env("NEXT_PUBLIC_BASE_URL"));
  ...
  return response
}
```

#### From Anywhere.
```js
// src/sdk/client.js
import { Client } from 'client'
import { env } from 'env-nextjs';

const client = new Client({
    host: env("NEXT_PUBLIC_BASE_URL")
})
```

### 📚 Acknowledgments

Kudos to the [next-runtime-env](next-runtime-env-repo) project for the README.

---


[build-once-deploy-many-link]: https://www.mikemcgarr.com/blog/build-once-deploy-many.html
[fundamental-principle-link]: https://cloud.redhat.com/blog/build-once-deploy-anywhere
[twelve-factor-link]: https://12factor.net
[pages-router-branch-link]: https://github.com/expatfile/next-runtime-env/tree/1.x
[next-runtime-env-repo]: https://github.com/expatfile/next-runtime-env
