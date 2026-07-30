import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lab = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lab' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    canonicalSlug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphen-separated canonical slug.'),
    readingTime: z.number().int().positive().optional(),
  }),
});

export const collections = { lab };
