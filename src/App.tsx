import { ModeToggle } from './components/mode-toggle'
import { PageHeader, PageHeaderHeading } from './components/page-header'
import { useAuth } from './hooks/use-auth'
import { LogOut } from 'lucide-react'

import { Auth } from './modules/auth';
import { Main } from './main';
import { Button } from './components/ui/button';

function App() {
  const { isAuth, logout } = useAuth();

  return (
    <div className="min-h-svh">
      <header>
        <PageHeader className="justify-between items-center">
          <PageHeaderHeading>AtrifactMMO Light client</PageHeaderHeading>
          <div className="flex gap-1">
            {isAuth && (
              <Button variant="outline" size="icon" onClick={logout}>
                <LogOut />
              </Button>
            )}
            <ModeToggle />
          </div>
        </PageHeader>
      </header>
      <main className="container pb-8">
        {isAuth ? <Main /> : <Auth />}
      </main>
    </div>
  )
}

export default App
