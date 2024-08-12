import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useState } from 'react';

export function Auth() {
  const { auth } = useAuth();

  const [token, setToken] = useState<string>('')

  return (
    <form onSubmit={e => {
      e.preventDefault()
      auth(token)
    }}>
      <div className="flex flex-col justify-center items-center">
        <div className="grid w-full max-w-sm items-center gap-3">
          <div className="grid w-full max-w-sm items-center gap-1">
            <Label htmlFor="auth-token">Your auth token</Label>
            <Input id="auth-token" type="password" value={token} onChange={e => setToken(e.target.value)} />
          </div>
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  )
}