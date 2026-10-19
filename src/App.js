import './App.css';
import Card from './components/ui/Card';
import Counter from './components/ui/Counter';
import Form from './components/ui/Form';
import List from './components/ui/List';

function App() {
  return (
    <main className="app">
      <Card name="Renz M Montana" description="Sir tara takbo???" />
      <Form />
      <Counter />
      <List />
    </main>
  );
}

export default App;
