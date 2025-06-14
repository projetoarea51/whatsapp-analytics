import TeamProfileClientPage from "./TeamProfileClientPage"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TeamPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6">
      <Link href="/dashboard" className="inline-block mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Dashboard
        </Button>
      </Link>

      <TeamProfileClientPage params={params} />
    </div>
  )
}
