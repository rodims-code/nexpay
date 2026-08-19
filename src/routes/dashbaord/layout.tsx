import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashbaord/layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashbaord/layout"!</div>
}
