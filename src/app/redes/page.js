import dynamic from 'next/dynamic';

const RedesClient = dynamic(() => import('../../components/RedesClient'), { ssr: false });

export default function Redes() {
  return <RedesClient />;
}