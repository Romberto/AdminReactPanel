import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLoginMutation } from '../../../api/authApi'
import { useAppDispatch } from '../../../hooks'
import { setAuth } from '../slices'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
})

type Form = z.infer<typeof schema>

export default function LoginPage() {
  const { register, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) })
  const [loginMutation, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data: Form) => {
    try {
      const res = await loginMutation(data).unwrap()
      dispatch(setAuth(res))
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <label className="block mb-2">Login
          <input className="border p-2 w-full" {...register('login')} />
        </label>
        <label className="block mb-2">Password
          <input type="password" className="border p-2 w-full" {...register('password')} />
        </label>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit" disabled={isLoading}>Sign in</button>
          <a className="ml-auto text-sm text-blue-600" href="/login/telegram">Telegram login</a>
        </div>
      </form>
    </div>
  )
}
