'use server';

import { refresh } from 'next/cache';

function delayTwoSeconds(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

export async function registerAttendance(formData: FormData) {
  const couple = formData.get('couple');
  const group = formData.get('group');

  await delayTwoSeconds();

  console.log('=> Form values', { couple, group });

  refresh();
}
