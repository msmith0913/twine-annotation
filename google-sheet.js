import { StepData } from "./scrolly.js";

// The Google Sheet below is a template. You can copy it to your Google Drive and use it to create your own scroll story.
// Use the URL from the browser address bar replacing the one below.
// Note that you must publish this sheet to the web for it to be accessible by the Google Sheets API.
// Google Sheet File menu -> Share-> Publish to Web -> Publish Entire Document as Web Page
// Also, you must Share the sheet so that anyone with a link can access it
// Share button at top right of sheet -> General Access -> Anyone with the link -> Viewer
var googleSheetURL =
  "https://docs.google.com/spreadsheets/d/1Nkq7DLecFxgwSs9tC0f_k0tTNTHPrsV3Bqf9L98aSuQ/edit?gid=0#gid=0";

// An API Key is required to read a google sheet from an application. It is generated at https://console.developers.google.com
// and if you plan to publish this scrolly story on your own standalone site, you will need to generate your own key.
// To generate your own key:
// 1. Go to https://console.developers.google.com
// 2. Create a new project with unique name (don't need a Parent Organization)
// 3. Enable APIs and Services
// 4. Search for Google Sheets API, click on it and then enable it
// 5. Choose Credentials from the left menu
// 6. Click on Create Credentials
// 7. Restrict the key under API restrictions and restrict to Google Sheets API
// 7. Copy the key and replace the one below
var googleApiKey = "AIzaSyA_HsSEP3PPc7CNU6xg3qxZYqJYKvX21cw";

const spreadsheetId = extractSpreadsheetIDFromURL(googleSheetURL);
function extractSpreadsheetIDFromURL(url) {
  return url.match(/\/d\/([a-zA-Z0-9-_]+)/)[1];
}

const apiEndpoint = createGoogleSheetsAPIEndpoint(spreadsheetId, googleApiKey);
function createGoogleSheetsAPIEndpoint() {
  return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Steps?key=${googleApiKey}`;
}

// Function to fetch data from Google Sheets
export async function fetchDataFromGoogleSheet() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    return convertGoogleSheetDataToStepDataArray(data.values);
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
  }
}

function convertGoogleSheetDataToStepDataArray(values) {
  values.shift(); // remove the header row

  const stepDataArray = values.map((row) => {
    const [contentType, FilePath, Latitude, Longitude, ZoomLevel, Text] = row;
    return new StepData(
      contentType,
      FilePath,
      Latitude,
      Longitude,
      ZoomLevel,
      Text
    );
  });
  return stepDataArray;
}
