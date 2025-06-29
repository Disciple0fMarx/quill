// src/components/Layout.tsx
import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children?: ReactNode // Explicitly type children
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <Header />
      <main>
        {children || <Outlet />} {/* Handle both cases */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout