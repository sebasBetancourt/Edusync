import { AppProvider } from './components/AppContext'
import { Header } from './components/Header'
import { AppSidebar } from './components/AppSidebar'
import { Footer } from './components/Footer'
import { SettingsPanel } from './components/SettingsPanel'
import { Dashboard } from './components/Dashboard'
import { LoansManagement } from './components/LoansManagement'
import { ClientsManagement } from './components/ClientsManagement'
import { PaymentsManagement } from './components/PaymentsManagement'
import { ReportsSection } from './components/ReportsSection'
import { SettingsSection } from './components/SettingsSection'
import { useApp } from './components/AppContext'

function AppContent() {
  const { activeSection } = useApp()

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'loans':
        return <LoansManagement />
      case 'clients':
        return <ClientsManagement />
      case 'payments':
        return <PaymentsManagement />
      case 'reports':
        return <ReportsSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar - Full Height */}
      <AppSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with Breadcrumbs */}
        <Header />
        
        {/* Content Area - Scrollable */}
        <main className="flex-1 overflow-auto">
          <div className="container max-w-none p-4 md:p-6 pb-20">
            {renderContent()}
          </div>
        </main>
        
        {/* Fixed Footer */}
        <Footer />
      </div>
      
      {/* Settings Panel */}
      <SettingsPanel />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}