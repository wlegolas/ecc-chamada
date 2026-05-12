import { getCoupleData } from '@/app/actions';
import { AttendancesTable } from '@/components/attendances';

export default async function Home() {
  const data = await getCoupleData();

  return <AttendancesTable data={data} />;
}
