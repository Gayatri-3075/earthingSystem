import { getidbyPoleid } from "@/components/utils/utils";
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";


const pb = new PocketBase(process.env.dbip);
const POLES_COLLECTION = "Poles"; // Use constant for collection name

export async function POST(request) {
  try {
    // Parse incoming request data
    const { pid, leakage, critical = false} = await request.json();
    // Validate inputs
    if (!pid || typeof leakage === "undefined") {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Fetch the first record with matching poleid
    let recordid = await getidbyPoleid(pid);

    // Patch it to relation db
    const timeDbRecord = await pb.collection('leakagePoleData').create(
        {
          time: new Date(),
          current: Number(Number(leakage).toFixed(2)),
          critical: critical,
          pole: recordid,
        }
    )

    // Patch the record with the new danger level
    const updatedRecord = await pb
      .collection(POLES_COLLECTION)
      .update(recordid, { "leakage": Number(Number(leakage).toFixed(2)),
        "leakageDB+": [timeDbRecord.id],
        "critical": critical
      },
    );

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("Error updating pole:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
