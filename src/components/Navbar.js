import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-2" />
                <span className="font-semibold text-gray-500 text-lg">Bad News</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link href="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Home</Link>
            <Link href="/quiz" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Quiz</Link>
            <Link href="/redes" className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300">Redes</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}