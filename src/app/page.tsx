import { type Attendance, AttendancesTable, columns } from '@/components/attendances';

async function getData(): Promise<Array<Attendance>> {
  return [
    {
      id: '728ed52f',
      couple: 'Daiane & Weslley',
      group: 'www.felicidade.com',
    },
    {
      id: '728ed52b',
      couple: 'Silvia & Wederson',
      group: 'www.felicidade.com',
    },
    {
      id: '728ed52c',
      couple: 'Erica & Fabrício',
      group: 'Amigos de Cristo',
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <AttendancesTable
      columns={columns}
      data={data}
    />
  );
}
