import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const size = searchParams.get('size');

    // Determine dimensions based on size parameter
    const isSquare = size === 'square';
    const width = isSquare ? 600 : 1200;
    const height = isSquare ? 600 : 630;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Main content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: isSquare ? '40px' : '60px 40px',
              maxWidth: isSquare ? '500px' : '900px',
            }}
          >
            {/* Calendar Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isSquare ? '80px' : '100px',
                height: isSquare ? '80px' : '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px',
                marginBottom: isSquare ? '20px' : '30px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <svg
                width={isSquare ? '40' : '50'}
                height={isSquare ? '40' : '50'}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V5M16 2V5M3.5 9.08997H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="#667eea"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 13.7H15.7037M15.6947 17.7H15.7037M11.9955 13.7H12.0045M11.9955 17.7H12.0045M8.29639 13.7H8.30539M8.29639 17.7H8.30539"
                  stroke="#667eea"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: isSquare ? '28px' : '48px',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: isSquare ? '10px' : '20px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Asana Task Calendar
            </div>

            {/* Subtitle - only show on large format */}
            {!isSquare && (
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.4,
                  marginBottom: '30px',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                Transform Tasks into Visual Timeline
              </div>
            )}

            {/* Description - only show on large format */}
            {!isSquare && (
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: 1.5,
                  maxWidth: '600px',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                Transform your Asana exports into beautiful, interactive calendars. 
                Visualize deadlines and plan your work like never before.
              </div>
            )}

            {/* Feature highlights - only show on large format */}
            {!isSquare && (
              <div
                style={{
                  display: 'flex',
                  gap: '30px',
                  marginTop: '40px',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 500,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✓ Free to Use
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✓ No Account Required
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✓ Instant Import
                </div>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '300px',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '50%',
            }}
          />
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (e) {
    console.log(`Failed to generate the image: ${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}