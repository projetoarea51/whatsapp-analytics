"use client"
import type { ParticipationRankingProps } from "../../types"
import { UserListItem } from "./UserListItem"
import { userService } from "../../services/user-service"
import { useEffect, useState } from "react"

export function ParticipationRanking({ type, groupId, limit = 5 }: ParticipationRankingProps) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true)
        const filters = {
          isTeamMember: type === "team",
          groupId,
          limit,
        }

        const data = await userService.getUsers(filters)
        setUsers(data)
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [type, groupId, limit])

  const title = type === "team" ? "Ranking de Participação (Equipe)" : "Ranking de Participação (Prospects)"

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="p-4 text-center">Carregando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="p-4 text-center text-red-500">Erro ao carregar dados</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {users.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Nenhum {type === "team" ? "membro da equipe" : "prospect"} encontrado
        </div>
      ) : (
        <div className="divide-y">
          {users.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              metrics={user.metrics}
              showSentiment={type === "prospects"}
              showResponseTime={type === "team"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
