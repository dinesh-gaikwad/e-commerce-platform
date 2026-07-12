import axios from 'axios';
import { env } from '../config/env.js';

const client = axios.create({ baseURL: 'https://store.steampowered.com/api', timeout: 15000 });

export async function fetchSteamAppDetails(appId) {
  const { data } = await client.get('/appdetails', { params: { appids: appId, cc: env.STEAM_COUNTRY, l: env.STEAM_LANG } });
  const payload = data?.[String(appId)];
  if (!payload?.success) throw new Error('Steam appdetails fetch failed');

  const d = payload.data || {};
  const price = d.price_overview || {};
  const release = d.release_date || {};

  return {
    steamAppId: String(appId),
    title: d.name || '',
    description: d.short_description || '',
    releaseDate: release.date ? new Date(release.date) : null,
    genres: (d.genres || []).map((g) => g.description).filter(Boolean),
    tags: (d.categories || []).map((c) => c.description).filter(Boolean),
    screenshots: (d.screenshots || []).map((s) => s.path_full || s.path_thumbnail).filter(Boolean),
    trailerUrl: d.movies?.[0]?.mp4?.max || '',
    price: typeof price.final === 'number' ? Number((price.final / 100).toFixed(2)) : 0,
    currency: price.currency || 'USD'
  };
}
