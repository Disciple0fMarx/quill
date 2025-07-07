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
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-2 space-y-3 sm:p-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{title}</h1>
        {children}
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {footerText} <Link to={footerLink} className="font-medium text-green-600 hover:underline dark:text-green-500">{footerLinkText}</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthLayout
