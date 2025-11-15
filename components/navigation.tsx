"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Activity, Shield } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/translator", label: "Translator" },
    { href: "/chatbot", label: "Chatbot" },
    { href: "/report-analyzer", label: "Report Analyzer" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MediCore</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>Privacy First</span>
          </div>
          {/* <Button variant="outline" size="sm" asChild>
            <Link href="/translator">Translator</Link>
          </Button> */}
          {/* <Button size="sm" asChild>
            <Link href="/report-analyzer">Analyze Report</Link>
          </Button> */}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                  <Shield className="h-4 w-4" />
                  <span>End-to-End Encryption</span>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/translator" onClick={() => setIsOpen(false)}>Translator</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/report-analyzer" onClick={() => setIsOpen(false)}>Analyze Report</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
