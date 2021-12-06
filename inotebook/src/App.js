import './App.css';
import { About } from './components/About';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <div>
      <NoteState>
      <Router>
        <Navbar/>
        <Alert message={'This is alert'}/>
        <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<Home/>} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
