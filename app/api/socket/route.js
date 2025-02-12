export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response('WebSocket endpoint - use WS protocol', { 
    status: 426, // 426 Upgrade Required
    headers: {
      'Upgrade': 'websocket'
    }
  });
}