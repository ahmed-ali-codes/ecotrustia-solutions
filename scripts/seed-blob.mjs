/**
 * Seed script — uploads existing local JSON data to Vercel Blob.
 *
 * Run ONCE after creating the Blob store:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... node scripts/seed-blob.mjs
 *
 * This reads the local data/ files and uploads them to the Blob store
 * so the production site has access to the same data.
 */

import { put } from '@vercel/blob';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function seedFile(localPath, blobPathname) {
  const fullPath = join(ROOT, localPath);
  if (!existsSync(fullPath)) {
    console.log(`⏭  Skipping ${localPath} (file not found)`);
    return;
  }

  const content = readFileSync(fullPath, 'utf-8');
  console.log(`📤 Uploading ${localPath} → ${blobPathname} ...`);

  const blob = await put(blobPathname, content, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });

  console.log(`   ✅ Done → ${blob.url}`);
}

async function seedImage(localPath, blobPathname) {
  const fullPath = join(ROOT, localPath);
  if (!existsSync(fullPath)) {
    console.log(`⏭  Skipping image ${localPath} (file not found)`);
    return null;
  }

  const buffer = readFileSync(fullPath);
  console.log(`📤 Uploading image ${localPath} → ${blobPathname} ...`);

  const blob = await put(blobPathname, buffer, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  console.log(`   ✅ Done → ${blob.url}`);
  return blob.url;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN is not set.');
    console.error('   Get it from: Vercel Dashboard → Storage → Your Blob Store');
    console.error('   Run: BLOB_READ_WRITE_TOKEN=vercel_blob_rw_... node scripts/seed-blob.mjs');
    process.exit(1);
  }

  console.log('🌱 Seeding Vercel Blob store...\n');

  // 1. Read the projects JSON and upload portfolio images first
  const projectsPath = join(ROOT, 'data', 'projects.json');
  if (existsSync(projectsPath)) {
    const projects = JSON.parse(readFileSync(projectsPath, 'utf-8'));

    // Upload each project's image to blob and update the image URL
    for (const project of projects) {
      if (project.image && project.image.startsWith('/portfolio/')) {
        const localImagePath = `public${project.image}`;
        const blobPathname = project.image.substring(1); // remove leading /
        const blobUrl = await seedImage(localImagePath, blobPathname);
        if (blobUrl) {
          project.image = blobUrl; // replace local path with blob URL
        }
      }
    }

    // Now upload the updated projects.json with blob URLs
    console.log(`📤 Uploading data/projects.json with updated image URLs ...`);
    const blob = await put('data/projects.json', JSON.stringify(projects, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    });
    console.log(`   ✅ Done → ${blob.url}\n`);
  }

  // 2. Seed blogs
  await seedFile('data/blogs.json', 'data/blogs.json');

  // 3. Seed contacts
  await seedFile('data/contacts.json', 'data/contacts.json');

  console.log('\n🎉 Seeding complete! Your data is now in Vercel Blob.');
  console.log('   Deploy your app and the admin dashboard will work in production.');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
