import { google } from 'googleapis';

export function googleAuth() {
  return new google.auth.GoogleAuth({
    projectId: process.env.PROJECT_ID,
    credentials: {
      type: 'service_account',
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: 'googleapis.com',
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}
