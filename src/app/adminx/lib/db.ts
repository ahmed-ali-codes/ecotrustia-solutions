import { z } from 'zod';

export const BlogSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: z.string(),
  content: z.string().min(1),
  short_description: z.string(),
  imageUrl: z.string().optional(),
  date: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type Blog = z.infer<typeof BlogSchema>;

export const ProjectSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string(),
  link: z.string().optional(),
  metaDescription: z.string().optional(),
  technologies: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;