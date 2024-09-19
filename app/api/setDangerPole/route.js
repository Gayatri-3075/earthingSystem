import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
import { config } from "dotenv";
config();

const pb = new PocketBase(process.env.dbip);
const POLES_COLLECTION = "Poles"; // Use constant for collection name

export async function POST(request) {
  try {
    // Parse incoming request data
    const { pid, danger } = await request.json();

    // Validate inputs
    if (!pid || typeof danger === "undefined") {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Fetch the first record with matching poleid
    let record = await pb
      .collection(POLES_COLLECTION)
      .getFirstListItem(`poleid="${pid}"`);

    // Return early if the pole is not found
    if (!record) {
      return NextResponse.json({ message: "Pole not found" }, { status: 404 });
    }

    // Update the record with the new danger level
    const updatedRecord = await pb
      .collection(POLES_COLLECTION)
      .update(record.id, { danger });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("Error updating pole:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
