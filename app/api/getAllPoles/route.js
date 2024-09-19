import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
import { config } from "dotenv";

config();
const pb = new PocketBase(process.env.dbip);
const POLES_COLLECTION = "Poles"; // Use a constant for collection name

export async function GET() {
  try {
    // Fetch all records from the "Poles" collection sorted by creation date (descending)
    const records = await pb.collection(POLES_COLLECTION).getFullList({
      sort: "-created",
    });

    // Return the fetched records as JSON
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("Error fetching poles:", error);
    // Return a 500 Internal Server Error status with an error message
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
