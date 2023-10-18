'use client'
import {useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {AuthContext} from '@/components/AuthProvider'
import {API_URL} from '@/app/constants'
import {UserInfo} from '@/components/AuthProvider'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {authenticated} = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (authenticated) {
      router.push('/')
      return
    }
  }, [authenticated])

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      })

      const data = await res.json()
      if (res.ok) {
        const user: UserInfo = {
          username: data.username,
          id: data.id,
        }

        localStorage.setItem('user_info', JSON.stringify(user))
        return router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <form className="flex flex-col md:w-1/5">
        <div className="text-center text-3xl font-bold">
          <span className="text-blue-500">Welcome!</span>
        </div>

        <input
          type="text"
          placeholder="email"
          className="mt-8 rounded-md border-2 border-gray-500 p-3 focus:border-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          className="mt-4 rounded-md border-2 border-gray-500 p-3 focus:border-blue-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-6 rounded-md bg-blue-500 p-3 font-bold text-white"
          onClick={submitHandler}>
          Login
        </button>
      </form>
    </div>
  )
}
