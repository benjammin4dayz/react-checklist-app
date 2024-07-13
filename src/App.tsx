import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragMoveEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useListContext } from './ListProvider';
import { TaskCard } from './components/TaskCard';
import styles from './App.module.css';

import { AddTaskDialog } from './components/AddTaskDialog';

function App() {
  const { toggleListItem, list, setList } = useListContext();

  const [items, setItems] = useState(
    list.map((item, index) => ({ id: `${index}`, ...item }))
  );

  useEffect(() => {
    setItems(list.map((item, index) => ({ id: `${index}`, ...item })));
  }, [list]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <ul style={{ display: 'grid', gap: '0.7rem' }}>
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map(item => (
                <TaskCard
                  key={item.__id}
                  id={item.__id}
                  sortableId={item.id}
                  checked={item.checked}
                  value={item.text}
                  onClick={() => toggleListItem(item.__id)}
                />
              ))}
            </SortableContext>
          </ul>
        </DndContext>
        <AddTaskDialog />
      </Paper>
    </Box>
  );

  function handleDragEnd(event: DragMoveEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // pay attention to how state is being set here- it must be synchronized!
      // mutate the data at the source and the effects should propagate
      setList(list => {
        const startIndex = items.findIndex(item => item.id === active.id);
        const endIndex = items.findIndex(item => item.id === over?.id);
        return arrayMove(list, startIndex, endIndex);
      });
    }
  }
}

export default App;
