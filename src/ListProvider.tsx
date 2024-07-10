/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ListContext, ListItem, FCWithChildren } from './typings';

const ListContext = createContext<ListContext>(null);

const useListContext = () => {
  const ctx = useContext(ListContext);
  if (!ctx) {
    throw new Error('useListContext must be used within a ListProvider');
  }
  return ctx;
};

const ListProvider: FCWithChildren = ({ children }) => {
  const [list, setList] = useState<ListItem[]>(restoreSavedList());

  // create
  const createListItem = useCallback((text: string) => {
    const newId = uuidv4();
    setList(list => [...list, { id: newId, text, checked: false }]);
  }, []);

  // read
  const getListItem = (id: string) => {
    return list.find(l => l.id === id) || null;
  };

  // update
  const updateListItem = (id: string, text: string) => {
    setList(list => list.map(l => (l.id === id ? { ...l, text } : l)));
    return getListItem(id) || null;
  };
  const toggleListItem = (id: string) => {
    setList(list =>
      list.map(l => (l.id === id ? { ...l, checked: !l.checked } : l))
    );
    return getListItem(id) || null;
  };

  // delete
  const deleteListItem = (id: string) => {
    setList(list => list.filter(l => l.id !== id));
  };

  useEffect(() => {
    saveList(list);
  }, [list]);

  return (
    <ListContext.Provider
      value={{
        list,
        createListItem,
        getListItem,
        updateListItem,
        toggleListItem,
        deleteListItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { useListContext, ListProvider };

function saveList(list: ListItem[]) {
  localStorage.setItem('list', JSON.stringify(list));
}

function restoreSavedList(): ListItem[] {
  const list = localStorage.getItem('list');
  return list
    ? (JSON.parse(list) as ListItem[])
    : import.meta.env.DEV
    ? [
        { id: '1', text: 'Sleep', checked: false },
        { id: '2', text: 'Coffee', checked: true },
        { id: '3', text: 'Dev', checked: true },
        { id: '4', text: '', checked: false },
        { id: '5', text: 'More than twenty-five characters', checked: false },
      ]
    : [];
}
