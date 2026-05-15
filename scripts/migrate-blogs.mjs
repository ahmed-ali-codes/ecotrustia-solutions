import { promises as fs } from 'fs';
import path from 'path';

const blogsFilePath = path.join(process.cwd(), 'final-web-app/data/blogs.json');

async function migrateBlogs() {
  try {
    const data = await fs.readFile(blogsFilePath, 'utf-8');
    const blogs = JSON.parse(data);

    const migratedBlogs = blogs.map((blog, index) => {
      const newBlog = { ...blog };

      // Ensure there is an ID
      if (!newBlog.id) {
        newBlog.id = (index + 1).toString();
      }

      // Ensure there is a slug, creating one from the title if it's missing
      if (!newBlog.slug) {
        newBlog.slug = newBlog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      }

      return newBlog;
    });

    await fs.writeFile(blogsFilePath, JSON.stringify(migratedBlogs, null, 2));
    console.log('Blog migration completed successfully.');

  } catch (error) {
    console.error('Error migrating blogs:', error);
  }
}

migrateBlogs();