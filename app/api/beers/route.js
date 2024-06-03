import { NextResponse } from "next/server";
import mongodbCon from "@/utils/mongodbCon";

// export async function GET(request) {
//   const query = request.nextUrl.searchParams;
//   return Response.json(beerMockData);
// };

export async function GET() {
  let conn;
  try {
    conn = await mongodbCon();
    const beersDb = conn.db('punkapi').collection('beers');
    const data = await beersDb.find().toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  } finally {
    await conn.close();
    console.log("Connection to database was closed!")
  }   
};