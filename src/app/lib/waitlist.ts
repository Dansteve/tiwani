/**
 * SUBMIT TO GOOGLE SHEETS
 * 
 * Option 1: SheetMonkey (Easiest)
 * 1. Go to https://sheetmonkey.io and create a free account.
 * 2. Connect your Google Sheet.
 * 3. Copy the Form URL and paste it in the ENDPOINT variable below.
 * 
 * Option 2: Google Apps Script (100% Free, Custom)
 * 1. Create a Google Sheet.
 * 2. Go to Extensions > App Script.
 * 3. Paste a script that handles doPost (I can provide this code if you'd like).
 * 4. Deploy as a Web App (set 'Who has access' to 'Anyone').
 * 5. Paste the Web App URL in the ENDPOINT variable below.
 */

const WAITLIST_ENDPOINT = "REDACTED_WAITLIST_ENDPOINT"; 

export async function submitToWaitlist(data: {
  email: string;
  interests: string[];
  confirm: boolean;
}) {
  if (!WAITLIST_ENDPOINT) {
    console.warn("WAITLIST_ENDPOINT is not set. Data is only being logged to console.");
    console.log("Submission data:", data);
    return { success: true, mode: "development" };
  }

  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: data.email,
      Interest_EarlyAccess: data.interests.includes("I would be interested in early access to a tool like this") ? "Yes" : "No",
      Interest_UseWhenAvailable: data.interests.includes("I would be open to using this if it becomes available") ? "Yes" : "No",
      Interest_ShareFeedback: data.interests.includes("I would be happy to share feedback as it develops") ? "Yes" : "No",
      Interest_ContactedForInput: data.interests.includes("I would be open to being contacted for further input") ? "Yes" : "No",
      Confirmed: data.confirm ? "Yes" : "No",
      Created: "x-sheetmonkey-current-date-time", 
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit to waitlist");
  }

  return { success: true };
}
