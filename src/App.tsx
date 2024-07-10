import { useListContext } from './ListProvider';
import { TaskCard } from './components/TaskCard';
import { Paper, Box } from '@mui/material';
import styles from './App.module.css';

import { AddTaskDialog } from './components/AddTaskDialog';

function App() {
  const { toggleListItem, list } = useListContext();

  return (
    <Box
      className={styles.App}
      component={'div'}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Paper style={{ width: '400px', padding: '1rem' }} elevation={3}>
        <header className="App-header">
          <h1>Tasks</h1>
        </header>
        <ul style={{ display: 'grid', gap: '0.7rem' }}>
          {list.map(item => (
            <TaskCard
              key={item.id}
              id={item.id}
              checked={item.checked}
              value={item.text}
              onClick={() => toggleListItem(item.id)}
            />
          ))}
        </ul>
        <AddTaskDialog />
      </Paper>
    </Box>
  );
}

export default App;
