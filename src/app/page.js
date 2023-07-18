import Image from 'next/image'
import {DatePicker} from "@/components/DatePicker/DatePicker";

export default function Home() {
  return (
    <main className="absolute top-0 w-screen min-h-screen bg-gray-100">
      <DatePicker/>
    </main>
  )
}
