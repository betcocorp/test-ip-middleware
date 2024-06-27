// app/api/check-ip/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const allowedIP = req.headers.get('x-allowed-ip') === 'true'
  console.log('Allowed IP Check:', allowedIP)
  return NextResponse.json({ allowedIP })
}
