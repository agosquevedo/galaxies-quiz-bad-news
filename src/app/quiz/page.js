import dynamic from 'next/dynamic'

const QuizApp = dynamic(() => import('@/components/QuizApp'), { ssr: false })

export default function QuizPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <QuizApp />
    </main>
  )
}