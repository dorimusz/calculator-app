import './App.css';
import http from 'axios'
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="container">
      <h1>Try out this awesomely regular calculator!</h1>
      <Calculator />
    </div>
  );
}

export default App;
