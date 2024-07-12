import type { Nullable } from './generic';
import type { StateSetter } from './react';

export type ListItem = {
  __id: string;
  text: string;
  checked: boolean;
};

export type ListContext = Nullable<{
  list: ListItem[];
  setList: StateSetter<ListItem[]>;
  createListItem: (text: string) => void;
  getListItem: (id: string) => Nullable<ListItem>;
  updateListItem: (id: string, text: string) => Nullable<ListItem>;
  toggleListItem: (id: string) => Nullable<ListItem>;
  deleteListItem: (id: string) => void;
}>;
