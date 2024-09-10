import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bad News Photocard Quiz</h1>
      <p className="text-xl mb-8">¿Qué photocard de Bad News te tocaría?</p>
      <Link href="/quiz" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Comenzar Quiz
      </Link>
    </main>
  )
}