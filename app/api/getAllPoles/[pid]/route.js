import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.dbip);

export async function GET(request, { params }) {
  const { pid } = params; // Access dynamic route parameter

  try {
    if (!pid) {
      return NextResponse.json({ message: "Invalid Pole ID" }, { status: 400 });
    }

    const record = await pb
      .collection("Poles")
      .getFirstListItem(`poleid="${pid}"`);

    if (!record) {
      return NextResponse.json({ message: "Pole not found" }, { status: 404 });
    }

    return NextResponse.json(record);
    
  } catch (error) {
    console.error("Error fetching pole:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
