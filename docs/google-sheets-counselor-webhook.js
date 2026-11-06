/**
 * Arzon Global — Master Google Sheets Counselor Leads Automation Webhook (v3 - Sequential Append)
 * Master Spreadsheet ID: 1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4
 * 
 * AUTOMATION FEATURES:
 * 1. Sequential Numbering (Old to New): Calculates the next Lead # automatically
 *    (e.g., if there are 233 leads, the next lead automatically gets `#234`).
 * 2. Next-Row Appending: Every new lead is appended as the next row at the bottom,
 *    preserving the chronological order requested.
 * 3. Mandatory Fields Enforced:
 *    - Full Name (Mandatory)
 *    - Mobile Number (Mandatory)
 *    - Email Address (Mandatory)
 *    - College Name (Mandatory)
 *    - Interested Domain (Mandatory)
 * 4. 1-Click WhatsApp Hyperlink: Auto-generates a pre-filled direct WhatsApp link for counselors.
 * 
 * SETUP INSTRUCTIONS (Takes ~60 seconds):
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4/edit
 * 2. In the top Google Sheets menu, click "Extensions" > "Apps Script".
 * 3. Delete any code in the editor and paste this entire script.
 * 4. Click the blue "Deploy" button (top right) > "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set Description: "Arzon Lead Automation Webhook v3".
 * 7. Set "Execute as": "Me (your email)".
 * 8. Set "Who has access": "Anyone" (allows the platform backend to post new leads 24/7).
 * 9. Click "Deploy", authorize permissions when prompted, and COPY the Web App URL.
 * 10. Paste that Web App URL into your .env:
 *     GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "error", message: "No postData found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var spreadsheetId = data.spreadsheetId || "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4";
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheetName = data.sheetName || "Counselor Leads";
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    if (data.row && Array.isArray(data.row)) {
      var rowData = data.row.slice();
      var lastRow = sheet.getLastRow(); // e.g. 234 if 233 leads + 1 header
      var nextLeadNumber = "#" + Math.max(1, lastRow); // #234

      // Ensure Lead # is populated in column 1
      if (!rowData[0] || rowData[0] === "" || rowData[0] === "AUTO") {
        rowData[0] = nextLeadNumber;
      }

      // Append as the next chronological row
      sheet.appendRow(rowData);

      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: "success", 
          leadNumber: nextLeadNumber,
          rowNumber: lastRow + 1,
          timestamp: new Date().toISOString() 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "Empty row payload" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "ok", 
      service: "Arzon Counselor Leads Automation Webhook",
      spreadsheetId: "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4",
      version: "3.0"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
