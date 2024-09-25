
import PocketBase from "pocketbase";


export const pb = new PocketBase(process.env.NEXT_PUBLIC_dbip);

export async function getidbyPoleid(poleid) {
  console.log("getidbyPoleid");
  const record = await pb
    .collection("Poles")
    .getFirstListItem(`poleid="${poleid}"`);
  return record.id;
}

export async function getpolebyid(id) {
  console.log("getpolebyid");
  const record = await pb.collection("Poles").
  getOne(id, {
    fields: 'poleid'
  })
  return record.poleid;
}

export async function getTimeDataSorted(pid, numOfRecords = 20) {
  console.log("getTimeDataSorted");
  const poleid = await getidbyPoleid(pid);
  const records = await pb
    .collection("leakagePoleData")
    .getList(1, numOfRecords, {
      filter: `pole="${poleid}"`,
      sort: "-time",
      fields: "current, time, pole, critical",
    });
  // console.log(records.items);
  for (let recObj of records.items) {
    recObj.pole = await getpolebyid(recObj.pole);
    recObj.time = recObj.time.match(/\d{2}:\d{2}:\d{2}/)[0]; //input: 2024-09-23 17:32:39.974Z
  }
  return records.items;
}


function dmsToDecimal(degrees, minutes, seconds, direction) {
  // Convert DMS (Degrees, Minutes, Seconds) to decimal degrees
  let decimal = Math.abs(degrees) + minutes / 60 + seconds / 3600;

  // If the direction is South or West, make the value negative
  if (direction === "S" || direction === "W") {
    decimal = -decimal;
  }

  return decimal;
}

// Function to parse both latitude and longitude from a full map location string
export function convertCoords(locationString) {
  // Regular expression to capture both latitude and longitude in the format: D°M'S"N D°M'S"E
  const regex = /(\d+)[°\s](\d+)[\'\s](\d+(\.\d+)?)["]?\s*([NSEW])/g;

  // Find matches for latitude and longitude
  const matches = [...locationString.matchAll(regex)];

  if (matches.length !== 2) {
    throw new Error("Invalid map location format");
  }

  // Parse latitude
  const latDegrees = parseInt(matches[0][1], 10);
  const latMinutes = parseInt(matches[0][2], 10);
  const latSeconds = parseFloat(matches[0][3]);
  const latDirection = matches[0][5];
  const lat = dmsToDecimal(latDegrees, latMinutes, latSeconds, latDirection);

  // Parse longitude
  const lonDegrees = parseInt(matches[1][1], 10);
  const lonMinutes = parseInt(matches[1][2], 10);
  const lonSeconds = parseFloat(matches[1][3]);
  const lonDirection = matches[1][5];
  const lng = dmsToDecimal(lonDegrees, lonMinutes, lonSeconds, lonDirection);

  return { lat, lng };
}