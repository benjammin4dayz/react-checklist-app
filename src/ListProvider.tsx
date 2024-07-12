/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ConfettiExplosion from 'react-confetti-explosion';
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
  const [_isExploding, _setIsExploding] = useState(false);

  const _handleExplode = (state: boolean) => {
    _setIsExploding(false);
    if (state === false) {
      _setIsExploding(true);
    }
  };

  // create
  const createListItem = useCallback((text: string) => {
    const newId = uuidv4();
    setList(list => [...list, { __id: newId, text, checked: false }]);
  }, []);

  // read
  const getListItem = (id: string) => {
    return list.find(l => l.__id === id) || null;
  };

  // update
  const updateListItem = (id: string, text: string) => {
    setList(list => list.map(l => (l.__id === id ? { ...l, text } : l)));
    return getListItem(id) || null;
  };
  const toggleListItem = (id: string) => {
    const item = getListItem(id);
    if (item) {
      _handleExplode(item.checked);
      setList(list =>
        list.map(l => (l.__id === id ? { ...l, checked: !l.checked } : l))
      );
    }
    return item || null;
  };

  // delete
  const deleteListItem = (id: string) => {
    setList(list => list.filter(l => l.__id !== id));
  };

  useEffect(() => {
    saveList(list);
  }, [list]);

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        createListItem,
        getListItem,
        updateListItem,
        toggleListItem,
        deleteListItem,
      }}
    >
      {_isExploding && (
        // TODO: improve this implementation.
        // use a ref or move it elsewhere? memoize the list and use effects?
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '50%',
            transform: 'translate(0, -50%)',
            pointerEvents: 'none',
          }}
        >
          <ConfettiExplosion
            duration={1750}
            particleCount={200}
            onComplete={() => _setIsExploding(false)}
          />
        </div>
      )}
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
        { __id: 'sl33p', text: 'Sleep', checked: false },
        { __id: 'c0f3', text: 'Coffee', checked: true },
        { __id: 'd3v', text: 'Dev', checked: true },
        { __id: 'f0u4', text: '', checked: false },
        {
          __id: 'f1v3',
          text: 'More than twenty-five characters',
          checked: false,
        },
      ]
    : [];
}
