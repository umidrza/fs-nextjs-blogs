import Link from "next/link"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
    >
      {children}
    </Link>
  )
}

export default NavLink