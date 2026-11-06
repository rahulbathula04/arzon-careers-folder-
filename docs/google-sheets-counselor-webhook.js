/**
 * Arzon Global — Google Sheets Counselor Leads Webhook
 * 
 * SETUP INSTRUCTIONS (Takes ~60 seconds):
 * 1. Open the Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4/edit
 * 2. Click "Extensions" > "Apps Script" in the top menu.
 * 3. Delete any code in the editor and replace it with this entire script.
 * 4. Click the blue "Deploy" button (top right) > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "Counselor Leads Webhook".
 * 7. Set "Execute as": "Me (your email)".
 * 8. Set "Who has access": "Anyone" (This allows the website server to post leads).
 * 9. Click "Deploy", approve permissions if prompted, and copy the Web App URL.
 * 10. Add the Web App URL to your .env file:
 *     GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/..."
 */

function doPost(e) {
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);

    var spreadsheetId = data.spreadsheetId || "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4";
    var sheetName = data.sheetName || (data.type === "whatsapp_click" ? "WhatsApp Click Stream" : "Counselor Leads");
    
    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    if (data.row && Array.isArray(data.row)) {
      sheet.appendRow(data.row);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", appended: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", service: "Arzon Counselor Leads Webhook" }))
    .setMimeType(ContentService.MimeType.JSON);
}
