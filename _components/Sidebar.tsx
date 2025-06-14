"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Home, LogOut, Menu, X, MessageSquare, Bell, Clock, Target } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Perfis",
    href: "/profiles",
    icon: Users,
  },
]

const settingsNavItems: NavItem[] = [
  {
    title: "Horários",
    href: "/settings/schedule",
    icon: Clock,
  },
  {
    title: "Equipes",
    href: "/settings/teams",
    icon: Users,
  },
  {
    title: "Alertas",
    href: "/settings/alerts",
    icon: Bell,
  },
  {
    title: "Alvos",
    href: "/settings/targets",
    icon: Target,
  },
  {
    title: "Usuários",
    href: "/settings/users",
    icon: Users,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Fechar o menu móvel quando a rota muda
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
    // Adicionar/remover classe no body para evitar rolagem quando o menu está aberto
    if (!isMobileOpen) {
      document.body.classList.add("overflow-hidden", "md:overflow-auto")
    } else {
      document.body.classList.remove("overflow-hidden", "md:overflow-auto")
    }
  }

  return (
    <>
      {/* Overlay para fechar o menu em dispositivos móveis */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => toggleMobileSidebar()} />
      )}

      {/* Mobile sidebar toggle */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleMobileSidebar}>
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col modernize-sidebar transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-[250px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700">
          <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
            {!isCollapsed && <span className="text-xl font-bold ml-2 text-blue-600">WA Analytics</span>}
            {isCollapsed && <MessageSquare className="h-6 w-6 text-blue-600" />}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <TooltipProvider delayDuration={0}>
            <nav className="space-y-6 px-2">
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700",
                          isCollapsed && "justify-center px-2",
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                ))}
              </div>

              <div className="space-y-1">
                <div className={cn("px-3 text-xs font-semibold text-muted-foreground", isCollapsed && "text-center")}>
                  {!isCollapsed && "Configurações"}
                </div>
                {settingsNavItems.map((item) => (
                  <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700",
                          isCollapsed && "justify-center px-2",
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                ))}
              </div>
            </nav>
          </TooltipProvider>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className={cn("flex items-center", isCollapsed && "justify-center")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="Usuário" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">João Silva</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            )}
            {!isCollapsed && (
              <Button variant="ghost" size="icon" className="ml-auto">
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
