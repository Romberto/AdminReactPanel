import React, { useEffect } from 'react'
import { useTelegramLoginMutation } from '../../../api/authApi'
import { setAuth } from '../slices'
import { useAppDispatch } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { loadTelegramWidget } from '../../../utils/telegram'

export default function TelegramLoginPage() {
  const [telegramLogin] = useTelegramLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const botName = import.meta.env.VITE_TG_BOT || ''

  useEffect(() => {
    // create global handler
    // @ts-ignore
    window.handleTelegramAuth = async function (user: any) {
      try {
        const res = await telegramLogin(user).unwrap()
        dispatch(setAuth(res))
        navigate('/dashboard')
      } catch (err) {
        alert('Telegram login failed')
      }
    }
    if (botName) {
      loadTelegramWidget(botName, 'handleTelegramAuth')
    }
    return () => {
      // cleanup
      // @ts-ignore
      delete window.handleTelegramAuth
      const root = document.getElementById('tg-widget-root')
      if (root) root.innerHTML = ''
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl mb-4">Telegram Login</h2>
        <div id="tg-widget-root" />
        {!botName && <p className="text-sm text-slate-500">Set VITE_TG_BOT=<span className="font-mono">your_bot_username</span> in .env to enable widget.</p>}
      </div>
    </div>
  )
}
