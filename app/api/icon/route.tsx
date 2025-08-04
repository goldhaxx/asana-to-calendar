import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sizeParam = searchParams.get('size');
    
    // Default to 192x192, allow custom sizes for manifest
    const size = sizeParam ? parseInt(sizeParam) : 192;
    const borderRadius = size >= 192 ? '32px' : '6px';
    const iconSize = Math.floor(size * 0.6);

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: borderRadius,
          }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2V5M16 2V5M3.5 9.08997H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6947 13.7H15.7037M15.6947 17.7H15.7037M11.9955 13.7H12.0045M11.9955 17.7H12.0045M8.29639 13.7H8.30539M8.29639 17.7H8.30539"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
      {
        width: size,
        height: size,
      }
    );
  } catch (e) {
    console.log(`Failed to generate the icon: ${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the icon`, {
      status: 500,
    });
  }
}