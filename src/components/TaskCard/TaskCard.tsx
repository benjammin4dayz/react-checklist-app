import {
  CSSProperties,
  useEffect,
  FC,
  MouseEvent,
  useRef,
  useState,
} from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useListContext } from '../../ListProvider';
import { TaskStatusIcon } from './TaskStatusIcon';
import { ActionsGrid } from './ActionsGrid';

type TaskCardProps = {
  id: string;
  sortableId: string;
  checked: boolean;
  value: string;
} & JSX.IntrinsicElements['div'];

export const TaskCard: FC<TaskCardProps> = ({
  id,
  sortableId,
  checked,
  value,
}) => {
  const { toggleListItem } = useListContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sortableId });

  const [cardElevation, setCardElevation] = useState<number>(7);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const textRef = useRef<HTMLDivElement>(null);
  const [isTextOverflowing, setIsTextOverflowing] = useState<boolean>(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTextOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [textRef]);

  const draggableStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const draggableListeners: SyntheticListenerMap = {
    ...listeners,
    onMouseDown: () => {
      // immediately close the expando before applying any draggable transforms
      setIsExpanded(false);
    },
  };

  const cardListeners = {
    onMouseOver: () => {
      setCardElevation(10);
    },
    onMouseLeave: () => {
      setCardElevation(7);
      setIsExpanded(false);
    },
    onClick: () => {
      setIsExpanded(true);
    },
  };

  const handleTaskStatusChange = (e: MouseEvent<HTMLDivElement>) => {
    // don't open the expando when toggling a task
    e.stopPropagation();
    toggleListItem(id);
  };

  return (
    <Card
      {...cardListeners}
      component={'li'}
      elevation={cardElevation}
      ref={setNodeRef}
      style={{ ...draggableStyle }}
      sx={{ cursor: isExpanded ? 'default' : 'pointer' }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <TaskStatusIcon
          checked={checked}
          onClick={handleTaskStatusChange}
          style={{ cursor: 'pointer' }}
          title={`Mark task as ${checked ? 'incomplete' : 'complete'}`}
        />
        <Typography
          ref={textRef}
          sx={{
            flex: '1',
            whiteSpace: isExpanded ? 'normal' : 'nowrap',
            textOverflow: 'ellipsis',
            overflowWrap: 'break-word',
            overflow: 'hidden',
            textDecoration: checked && !isExpanded ? 'line-through' : 'none',
          }}
          title={isExpanded ? value : 'Click to expand'}
          variant={isTextOverflowing ? (isExpanded ? 'body1' : 'h6') : 'h6'}
        >
          {value}
        </Typography>
        {isExpanded && <ActionsGrid id={id} />}
        <DragIndicatorIcon
          {...attributes}
          {...draggableListeners}
          sx={{
            cursor: 'grab',
            ':focus': { outline: 'none' },
            ':active': { cursor: 'grabbing' },
            touchAction: 'none',
          }}
        />
      </CardContent>
    </Card>
  );
};
