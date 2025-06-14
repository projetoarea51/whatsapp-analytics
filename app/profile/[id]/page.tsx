import type { Metadata } from "next"
import ProfilePageClient from "./ProfilePageClient"

export const metadata: Metadata = {
  title: "Perfil do Contato | WhatsApp Analytics",
  description: "Visualize informações detalhadas sobre este contato",
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfilePageClient params={params} />
}
