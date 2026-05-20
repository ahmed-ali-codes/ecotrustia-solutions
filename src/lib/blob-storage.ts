/**
 * Vercel Blob Storage helpers.
 *
 * All JSON data (projects, blogs, contacts) and uploaded images are stored
 * in Vercel Blob so the admin dashboard works in production (Vercel's
 * filesystem is read-only).
 *
 * Requires the BLOB_READ_WRITE_TOKEN environment variable — created
 * automatically when you add a Blob store in the Vercel dashboard.
 */

import { put, get, del, list } from '@vercel/blob';

// ─── JSON Data helpers ───────────────────────────────────────────────

/**
 * Read a JSON data file from the Blob store.
 * Falls back to an empty array when the blob doesn't exist yet.
 */
export async function readJsonBlob<T = unknown>(pathname: string): Promise<T[]> {
  try {
    const result = await get(pathname, { access: 'public' });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return [];
    }

    // Collect the stream into a string
    const reader = result.stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const text = new TextDecoder().decode(
      chunks.reduce((acc, chunk) => {
        const merged = new Uint8Array(acc.length + chunk.length);
        merged.set(acc);
        merged.set(chunk, acc.length);
        return merged;
      }, new Uint8Array(0)),
    );

    return JSON.parse(text) as T[];
  } catch (error: unknown) {
    // BlobNotFoundError or network hiccup — treat as empty
    const blobError = error as { code?: string };
    if (blobError?.code === 'blob_not_found') {
      return [];
    }
    console.error(`[blob-storage] Error reading ${pathname}:`, error);
    return [];
  }
}

/**
 * Write (overwrite) a JSON data file in the Blob store.
 */
export async function writeJsonBlob<T = unknown>(
  pathname: string,
  data: T[],
): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

// ─── Image upload helper ─────────────────────────────────────────────

/**
 * Upload a base64-encoded image to Vercel Blob.
 * Returns the public blob URL (a full https:// URL) if the input is a
 * base64 data-URI; otherwise returns the input string unchanged.
 */
export async function uploadImageToBlob(imageValue: string): Promise<string> {
  if (!imageValue || !imageValue.startsWith('data:image')) {
    return imageValue; // already a URL or empty — pass through
  }

  const matches = imageValue.match(
    /^data:image\/([A-Za-z-+/]+);base64,(.+)$/,
  );
  if (!matches || matches.length !== 3) {
    return imageValue;
  }

  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const fileName = `portfolio/portfolio_${Date.now()}.${ext}`;

  const blob = await put(fileName, buffer, {
    access: 'public',
    addRandomSuffix: false,
    contentType: `image/${matches[1]}`,
  });

  return blob.url; // full public URL
}

// ─── Blob deletion helper ────────────────────────────────────────────

/**
 * Delete an image from the Blob store by its URL.
 * Only deletes if the URL points to a Vercel Blob store.
 */
export async function deleteImageFromBlob(imageUrl: string): Promise<void> {
  if (imageUrl && imageUrl.includes('blob.vercel-storage.com')) {
    try {
      await del(imageUrl);
    } catch (error) {
      console.error('[blob-storage] Error deleting image:', error);
    }
  }
}
