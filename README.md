# KC Prajapati India

Marketing website for KC Prajapati India, a premium tile and marble contracting practice founded in 2000 and based in Chhattisgarh, India. Founded by Kailash Prajapati and Manish Prajapati.

**Primary tagline:** 26 Years of Crafting Excellence.
**Secondary tagline:** Precision in Every Piece. Excellence in Every Finish.

## Stack

- Vite, React 19, TypeScript
- React Router 7 (lazy-loaded routes)
- Framer Motion for reveals and transitions
- Lenis for smooth scrolling (disabled under `prefers-reduced-motion`)
- Tailwind CSS v4, Lucide icons

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # eslint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home (hero, introduction, founders, expertise, work, why KC, journey, contact, footer) |
| `/about` | Our Story |
| `/expertise` | Services and materials |
| `/portfolio` | Our Work (illustrative studies, filterable, lightbox) |
| `/contact` | Contact (preview form) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `*` | Not found |

## Source of truth

- `src/data/site.ts`: brand name, founders, navigation, contact details
- `src/data/services.ts`: services, principles, timeline, process, materials
- `src/data/work.ts`: gallery studies and categories
- `index.html`: default SEO metadata, Open Graph and Twitter tags, JSON-LD
- `src/hooks/usePageMeta.ts`: per-page title, description and social metadata

## Placeholders to replace before launch

These items were deliberately left as placeholders because no verified information was supplied:

- **Phone, email, address, and social links.** Shown as "Available on request" in `src/data/site.ts`.
- **Founder portraits.** Monogram cards are shown with "Portrait forthcoming". `FounderPortrait` accepts an optional real `image` prop.
- **Project photography.** Gallery items are labelled "Illustrative" stock studies. Replace them with real KC project photos and captions, and remove the illustrative labels.
- **Contact form.** The form is a preview. It validates input and shows a confirmation, but it does not transmit data. Connect it to a form backend or email service before launch.
- **Domain.** Open Graph image URLs are relative in `index.html` and resolved to absolute URLs at runtime in `usePageMeta`. Set the production domain in the JSON-LD and canonical URLs once it is known.
- **Structured data.** The JSON-LD `GeneralContractor` block uses only verified information. Add `telephone`, `email`, `address`, and `sameAs` only once they are confirmed.

## Image credits

All images in `public/images/kc/` are Pexels stock photographs. See `public/images/kc/CREDITS.md` for attribution details.

## Deployment

`vercel.json` rewrites all paths to `/index.html` so client-side routes work on refresh and direct links.

## Launch checklist

- [ ] Replace stock imagery with real KC project photography and captions
- [ ] Add founder portraits (with consent)
- [ ] Confirm and add contact details, address, and social profiles
- [ ] Connect the contact form to a real submission endpoint
- [ ] Set the production domain in canonical, OG, and JSON-LD URLs
- [ ] Confirm all Pexels photographer credits in `CREDITS.md`
- [ ] Run `npm run build` and `npm run lint`
- [ ] Check Lighthouse and accessibility scores on desktop and mobile
