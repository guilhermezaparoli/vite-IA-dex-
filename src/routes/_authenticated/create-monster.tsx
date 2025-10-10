import { createFileRoute } from '@tanstack/react-router'
import { CreateMonster } from '../../pages/createMonster'

export const Route = createFileRoute('/_authenticated/create-monster')({
  component: CreateMonster,
})
