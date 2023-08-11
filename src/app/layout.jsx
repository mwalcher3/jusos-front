

import '@styles/globals.scss'
import '@styles/color.mode.scss'
import '@styles/globalelements.scss'


// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

// see
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
// for metadata conventions

export const metadata = {
  title: "Jusos Heidelberg",
  content: "jusos, heidelberg, sozialistisch, spd Heidelberg, Jungsozialisten",
  manifest: "/manifest/manifest.json",
  description: 'Wir Jusos sind die Jungsozialist*innen in der SPD Heidelberg. Wir sind ' +
    'ein sozialistischer, feministischer, antifaschistischer und internationalistischer Richtungsverband. ' +
    'Bei uns engagieren sich junge Menschen zwischen 14 und 35 Jahren und setzen sich für eine gerechtere ' +
    'Gesellschaft ein.',
  icon: '/logos/jusosFavicon.png',
  shortcut: '/lgoos/jusosFavicon.png',
}

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
