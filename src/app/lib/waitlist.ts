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

const WAITLIST_ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

export async function submitToWaitlist(data: {
  email: string;
  roles: string[];
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
      Role_Child_AdditionalNeeds: data.roles.includes("A child or young person with additional needs") ? "Yes" : "No",
      Role_Older_Adult: data.roles.includes("An older adult") ? "Yes" : "No",
      Role_LongTerm_Condition: data.roles.includes("Someone with a long-term condition") ? "Yes" : "No",
      Role_Professional: data.roles.includes("I work with caregiving families professionally") ? "Yes" : "No",
      Created: "x-sheetmonkey-current-date-time", 
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit to waitlist");
  }

  return { success: true };
}
