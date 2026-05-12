'use server';

import { google } from 'googleapis';
import { refresh } from 'next/cache';
import type { Attendance } from '@/app/actions';
import { googleAuth } from '@/lib/googleapi';

async function addRegister({ id, husband, wife, group }: Attendance) {
  const auth = googleAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Chamada!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[currentDate, id, husband, wife, group]],
    },
  });
}

export async function registerAttendance(formData: FormData) {
  const id = String(formData.get('id'));
  const husband = String(formData.get('husband'));
  const wife = String(formData.get('wife'));
  const couple = String(formData.get('couple'));
  const group = String(formData.get('group'));

  await addRegister({ id, husband, wife, couple, group });

  refresh();
}
