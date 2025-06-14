"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Trash2, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type User = {
  id: string
  name: string
  email: string
  role: "ADMIN" | "ANALYST"
  status: "ACTIVE" | "PENDING"
  avatarUrl?: string
  linkedInUrl?: string
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    avatarUrl: "/placeholder-user.jpg",
    linkedInUrl: "https://linkedin.com/in/johndoe",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "ANALYST",
    status: "ACTIVE",
    avatarUrl: "/placeholder-user.jpg",
    linkedInUrl: "https://linkedin.com/in/janesmith",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "ANALYST",
    status: "PENDING",
    linkedInUrl: "https://linkedin.com/in/robertjohnson",
  },
]

export default function UsersSettingsPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [newUserLinkedIn, setNewUserLinkedIn] = useState("")

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!userToDelete) return

    setUsers(users.filter((user) => user.id !== userToDelete.id))
    setIsDeleteDialogOpen(false)
    setUserToDelete(null)

    toast({
      title: "User Removed",
      description: "The user has been removed successfully.",
    })
  }

  const handleInviteUser = () => {
    if (!newUserLinkedIn.trim()) {
      toast({
        title: "LinkedIn URL Required",
        description: "Please enter a valid LinkedIn URL.",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, this would send an invitation
    const newUser: User = {
      id: `user-${users.length + 1}`,
      name: "New Analyst",
      email: "pending@example.com",
      role: "ANALYST",
      status: "PENDING",
      linkedInUrl: newUserLinkedIn,
    }

    setUsers([...users, newUser])
    setNewUserLinkedIn("")
    setIsInviteDialogOpen(false)

    toast({
      title: "Invitation Sent",
      description: "The user has been invited to join the workspace.",
    })
  }

  const toggleUserRole = (userId: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            role: user.role === "ADMIN" ? "ANALYST" : "ADMIN",
          }
        }
        return user
      }),
    )

    toast({
      title: "User Role Updated",
      description: "The user's role has been updated successfully.",
    })
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <Button onClick={() => setIsInviteDialogOpen(true)} className="modernize-btn-primary">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Card className="modernize-card">
        <CardHeader>
          <CardTitle>Workspace Users</CardTitle>
          <CardDescription>Manage users who have access to this workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
              <div className="col-span-4">User</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {users.map((user) => (
                <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {user.linkedInUrl && (
                        <a
                          href={user.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3 text-sm truncate">
                    {user.status === "PENDING" ? "Pending acceptance" : user.email}
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                        {user.role === "ADMIN" ? "Admin" : "Analyst"}
                      </Badge>
                      {user.status === "ACTIVE" && (
                        <Button variant="ghost" size="icon" onClick={() => toggleUserRole(user.id)} className="h-6 w-6">
                          <Pencil className="h-3 w-3" />
                          <span className="sr-only">Change Role</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Badge variant={user.status === "ACTIVE" ? "success" : "secondary"}>
                      {user.status === "ACTIVE" ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Enter the LinkedIn URL of the user you want to invite. They will receive an invitation to join as an
              Analyst.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="linkedin-url" className="text-sm font-medium">
                LinkedIn URL
              </label>
              <Input
                id="linkedin-url"
                placeholder="https://linkedin.com/in/username"
                value={newUserLinkedIn}
                onChange={(e) => setNewUserLinkedIn(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser} className="modernize-btn-primary">
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {userToDelete?.name} from this workspace? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
