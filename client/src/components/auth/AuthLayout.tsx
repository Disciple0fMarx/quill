import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type AuthLayoutProps = {
  children: ReactNode
  title: string
  footerText: string
  footerLink: string
  footerLinkText: string
}

const AuthLayout = ({ 
  children, 
  title, 
  footerText, 
  footerLink, 
  footerLinkText 
}: AuthLayoutProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
      <p>
        {footerText} <Link to={footerLink}>{footerLinkText}</Link>
      </p>
    </div>
  )
}

export default AuthLayout
