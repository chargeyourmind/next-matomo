<h1 align="center">
  <img src="https://res.cloudinary.com/cym/image/upload/c_scale,w_500/v1613391261/opensource/nextjs_matomo.png" />
  <p align="center">Next.js Matomo</p>
  <p align="center" style="font-size: 0.5em">Matomo analytics for Next.js applications</p>
</h1>

<br>

- Basic SPA Matomo Setup
- Will track `next/router` route changes `routeChangeComplete` event

## Usage

Add the `init` call in your `_app.ts` :

```jsx
import React from 'react'

import { init } from '@cym/next-matomo'

const MyApp = () => {
  useEffect(() => {
    init({ url: 'https://matomo.example.com', siteId: '1' })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
```

Will track routes changes by default.

### Exclude tracking routes:

This wont track `/signin` or any url containing `?token=`.

```js
init({
  url: 'https://matomo.example.com',
  siteId: '1',
  excludeUrlsPatterns: [/^\/signin/, /\?token=.+/],
})
```

### Track custom events:

```js
import { push } from '@cym/next-matomo'

push(['trackEvent', 'button', 'signup'])
```

### Credits:

The package is based on: https://github.com/SocialGouv/matomo-next. We have changed the package to Typescript and extended it because necessary changes are not merged.
