import { Link } from '@tanstack/react-router'

export function LegalLayout({ title, updatedAt, children }: { title: string; updatedAt: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-base-200 px-4 py-10"><article className="card mx-auto max-w-4xl bg-base-100 shadow-xl"><div className="card-body gap-8 p-6 sm:p-10"><div className="flex flex-wrap items-center justify-between gap-4"><Link to="/" className="btn btn-ghost btn-sm">NexPay</Link><span className="badge badge-outline">Mis à jour : {updatedAt}</span></div><h1 className="text-3xl font-bold">{title}</h1><div className="prose max-w-none">{children}</div></div></article></main>
}
