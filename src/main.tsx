import {createRoot} from 'react-dom/client'
import { PermissionProvider } from './store/permissionStore'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <PermissionProvider>
        <App/>
    </PermissionProvider>
)
