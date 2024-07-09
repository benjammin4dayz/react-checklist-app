import type { Nullable } from './generic';

export type ListItem = {
  id: string;
  text: string;
  checked: boolean;
};

export type ListContext = Nullable<{
  list: ListItem[];
  createListItem: (text: string) => void;
  getListItem: (id: string) => Nullable<ListItem>;
  updateListItem: (id: string, text: string) => Nullable<ListItem>;
  toggleListItem: (id: string) => Nullable<ListItem>;
  deleteListItem: (id: string) => void;
}>;
