# Juliia Sweet — Project Conventions

## Image Rules (MANDATORY for all new images)

### 1. Alt Text — SEO-rich, bilingual
Every `<Image>` must have a descriptive bilingual alt using the `t()` helper:
```tsx
alt={t({ ru: "Описание на русском — Juliia Sweet", en: "Description in English — Juliia Sweet Miami" })}
```
- Include **brand name** ("Juliia Sweet") and **location** ("Miami") in English alt
- Include **cake type** or **occasion** (birthday, wedding, bento, celebration)
- Never use generic alt like "image", "photo", "cake 1"
- For decorative-only images, use `alt=""`

### 2. Format — WebP only for new uploads
- All new images in `public/` must be `.webp` format
- Convert before adding: `cwebp -q 80 input.png -o output.webp`
- Next.js auto-serves AVIF/WebP via `<Image>` component, but source files should still be WebP to keep repo small

### 3. Image Component — always use Next.js `<Image>`
```tsx
import Image from "next/image";

<Image
  src="/path/to/image.webp"
  alt={t({ ru: "...", en: "..." })}
  width={800}       // or use fill + sizes
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
  loading="lazy"    // use priority={true} only for above-fold hero
/>
```
- Always provide `sizes` attribute for responsive images
- Use `priority` only for hero/above-fold images
- Use `fill` + parent container for aspect-ratio images

### 4. File naming
- Lowercase, kebab-case: `birthday-cake-pink.webp`
- Prefix by category: `cake-`, `dessert-`, `review-`, `filling-`

## i18n
- All user-facing text must be bilingual `{ ru: "...", en: "..." }`
- Default language: English (Miami market)
- Russian auto-detected via browser language

## SEO
- SITE_URL is defined in: layout.tsx, sitemap.ts, robots.ts, JsonLd.tsx
- When domain changes, update all 4 files
