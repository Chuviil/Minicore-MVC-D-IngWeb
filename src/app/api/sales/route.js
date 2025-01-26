import { getSalesByDateRange } from "../../../db/db";
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');
  const data = await getSalesByDateRange(fromDate, toDate);
  return NextResponse.json(data);
}
