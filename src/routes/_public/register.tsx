import { createFileRoute } from '@tanstack/react-router'
import { Register } from '../../pages/register'

export const Route = createFileRoute('/_public/register')({
  component: Register,
})
