import { useListContext } from './ListProvider';
import { Card } from './components/Card';
import styles from './App.module.css';

function App() {
  const { toggleListItem, list } = useListContext();

  return (
    <div className={styles.App}>
      <header className="App-header">
        <h1>Tasks</h1>
      </header>
      <main>
        <ul>
          {list.map(item => (
            <Card
              key={item.id}
              id={item.id}
              checked={item.checked}
              value={item.text}
              onClick={() => toggleListItem(item.id)}
            />
          ))}
          <Card />
        </ul>
      </main>
    </div>
  );
}

export default App;
