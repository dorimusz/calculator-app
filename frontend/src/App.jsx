import './App.css';
import Calculator from './components/Calculator';
import content from './content/content';

function App() {
  return (
    <div className="container">
      <h1 className='title'>{content.title}</h1>
      <div className='description'>
        <p>{content.howToUse}</p>
        <p>{content.memory}</p>
      </div>

      <Calculator />
    </div>
  );
}

export default App;
