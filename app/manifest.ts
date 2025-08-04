import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Asana Task Calendar',
    short_name: 'Asana Calendar',
    description: 'Transform your Asana project exports into beautiful, interactive calendars. Visualize deadlines, track progress, and plan your work like never before.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#667eea',
    icons: [
      {
        src: '/api/icon?size=192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/api/icon?size=512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'business', 'utilities'],
    shortcuts: [
      {
        name: 'Import Tasks',
        short_name: 'Import',
        description: 'Import your Asana tasks',
        url: '/?action=import',
        icons: [{ src: '/api/icon?size=96', sizes: '96x96' }],
      },
    ],
  };
}