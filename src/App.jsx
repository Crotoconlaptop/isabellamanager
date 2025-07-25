import './App.css'
import ReservaForm from './components/ReservaForm'
import ExportarReservas from './components/ExportarReservas'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Reservas - Isabella</h1>

      </header>
      <main>
        <section className="form-section">
          <ReservaForm />
        </section>
        <section className="export-section">
          <ExportarReservas />
        </section>
      </main>
      <footer className="app-footer">
        <p>© 2025 GG</p>
      </footer>
    </div>
  )
}

export default App
