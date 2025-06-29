// src/App.tsx
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout> {/* If you have a global layout */}
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
