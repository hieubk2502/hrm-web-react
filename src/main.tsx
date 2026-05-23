import {createRoot} from 'react-dom/client'
import { AuthProvider } from './store/authStore'
import { PermissionProvider } from './store/permissionStore'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <PermissionProvider>
            <App/>
        </PermissionProvider>
    </AuthProvider>
)
