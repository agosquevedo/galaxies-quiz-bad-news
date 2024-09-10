import Link from 'next/link'

export default function RedesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Nuestras Redes</h1>
      <Link href="https://www.instagram.com/thenewgalaxies" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-xl">
        Síguenos en Instagram
      </Link>
    </main>
  )
}