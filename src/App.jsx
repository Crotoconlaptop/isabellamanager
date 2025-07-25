import ReservaForm from "./components/ReservaForm";
import ExportarReservas from "./components/ExportarReservas";

function App() {
  return (
    <div>
      <h1>Reservas del Bar</h1>
      <ReservaForm />
      <hr />
      <ExportarReservas />
    </div>
  );
}

export default App;
