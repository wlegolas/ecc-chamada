'use server';

import { google } from 'googleapis';
import { googleAuth } from '@/lib/googleapi';
import { getFirstAndSecondName } from '@/lib/utils';

export type Attendance = {
  id: string;
  couple: string;
  husband: string;
  wife: string;
  group: string;
};

type SpreadsheetRow = string | number | boolean | null;

function normalizeSpreadsheetValues(rows: SpreadsheetRow[][] | null | undefined): Array<Attendance> {
  if (!rows?.length) {
    return [];
  }

  const [_header, ...availableRows] = rows;

  return availableRows.map((row, index) => {
    const [id, husband, wife, group] = row;
    const couple = `${getFirstAndSecondName(String(wife ?? ''))} & ${getFirstAndSecondName(String(husband ?? ''))}`;

    return {
      id: String(id ?? `row-${index}`),
      husband: String(husband ?? ''),
      wife: String(wife ?? ''),
      group: String(group ?? ''),
      couple,
    };
  });
}

export async function getCoupleData() {
  const auth = googleAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const data = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Dados!A1:Z',
  });

  return normalizeSpreadsheetValues(data.data.values);
}
