import './App.css';
import Datatable from './component/Datatable';

function App() {
  return (
    <div className="App container my-12">
      <div className="w-full flex flex-row my-12">
        <div className="w-8/12">
          <h2 className='text-left'>Introductie tekst dat bovenaan de pagina staat</h2>
        </div>
        <div className="grid justify-items-end w-4/12">
          {/* hier moet een knop */}
          <button className='flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Add new</button>
        </div>
      </div>

      


      <Datatable />

    </div>
  );
}

export default App;
