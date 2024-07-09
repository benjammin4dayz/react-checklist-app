import {
  useState,
  type FC,
  type KeyboardEvent,
  type MouseEvent,
  type HTMLAttributes,
} from 'react';
import { useListContext } from '../ListProvider';
import { Modal } from './Modal';
import {
  TbCircleCheckFilled,
  TbCirclePlus,
  TbDotsVertical,
} from 'react-icons/tb';

const CheckmarkIcon: FC<{ checked: boolean }> = ({ checked, ...restProps }) => {
  return (
    <TbCircleCheckFilled color={checked ? 'green' : 'gray'} {...restProps} />
  );
};

const TaskLabel: FC<{ value: string }> = ({ value }) => {
  return <div>{value.slice(0, 25)}</div>;
};

const AddTask: FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [creatingText, setCreatingText] = useState('');

  const { createListItem } = useListContext();

  const handleClick = () => {
    setCreatingText('');
    setIsCreatingTask(true);
  };

  const handleSubmit = () => {
    if (creatingText) {
      createListItem(creatingText);
      setIsCreatingTask(false);
    }
  };

  const handleSubmitHotkey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Modal show={isCreatingTask} closeModal={() => setIsCreatingTask(false)}>
        <input
          type="text"
          placeholder="Task name"
          autoFocus
          value={creatingText}
          onChange={e => setCreatingText(e.target.value)}
          onKeyDown={handleSubmitHotkey}
        />
        <button onClick={() => setIsCreatingTask(false)}>Cancel</button>
        <button onClick={handleSubmit}>Add</button>
      </Modal>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ color: isHovered ? 'green' : 'gray', cursor: 'pointer' }}
        onClick={handleClick}
      >
        <TbCirclePlus />
        <span>Add task</span>
      </div>
    </>
  );
};

const Hamburger: FC<{ id: string }> = ({ id }) => {
  const { deleteListItem, getListItem, updateListItem } = useListContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState('');

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    setIsOpen(false);
    deleteListItem(id);
  };

  const handleStartEdit = () => {
    setIsOpen(false);
    setIsEditing(true);
    setEditingText(getListItem(id)?.text ?? '');
  };

  const handleCompleteEdit = () => {
    setIsEditing(false);
    updateListItem(id, editingText);
    setEditingText('');
  };

  const handleCompleteEditHotkey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCompleteEdit();
    }
  };

  return (
    <>
      <Modal show={isEditing} closeModal={() => setIsEditing(false)}>
        <input
          type="text"
          value={editingText}
          onChange={e => setEditingText(e.target.value)}
          onKeyDown={handleCompleteEditHotkey}
        />
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={handleCompleteEdit}>Save</button>
      </Modal>
      <div
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={handleClick}
      >
        <TbDotsVertical />
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: 'white',
              border: '1px solid gray',
              display: 'flex',
              flexDirection: 'column',
              padding: '0.5rem',
              zIndex: 1,
            }}
          >
            <button onClick={() => handleStartEdit()}>Edit</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        )}
      </div>
    </>
  );
};

export const Card: FC<
  {
    id?: string;
    checked?: boolean;
    value?: string;
  } & HTMLAttributes<HTMLDivElement>
> = ({ id, checked, value, ...restProps }) => {
  return (
    <aside
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      {...restProps}
    >
      <div
        style={{
          display: 'grid',
          gap: '0.5rem',
          gridTemplateColumns: 'max-content 1fr max-content',
          alignItems: 'center',
          width: '400px',
        }}
      >
        {id && typeof value === 'string' && typeof checked === 'boolean' ? (
          <>
            <CheckmarkIcon checked={checked} />
            <TaskLabel value={value} />
            <div style={{ textAlign: 'right' }}>
              <Hamburger id={id} />
            </div>
          </>
        ) : (
          <AddTask />
        )}
      </div>
    </aside>
  );
};
