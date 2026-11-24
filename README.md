# shipfig-demo

A tiny pagination library, used as a sandbox repository for
[Shipfig](https://github.com/silentworks/shipfig).

```ts
import { paginate } from "./src/index.ts";

paginate(["a", "b", "c", "d", "e"], 2, 2);
// { items: ["c", "d"], page: 2, totalPages: 3, hasPrevious: true, hasNext: true, ... }
```

Requires Node.js 24 or later (TypeScript runs directly via type stripping).

```bash
npm ci
npm test
npm run typecheck
```
