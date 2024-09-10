import dynamic from 'next/dynamic';

const QuizClient = dynamic(() => import('../../components/QuizClient'), { ssr: false });

export default function QuizPage() {
  return <QuizClient />;
}