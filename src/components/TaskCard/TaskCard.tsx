import { useEffect, useState, type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isHovered, setIsHovered] = useState(false);
  const [cardElevation, setCardElevation] = useState(7);

  useEffect(() => {
    if (isHovered) {
      setCardElevation(10);
    } else {
      setCardElevation(7);
    }
  }, [isHovered]);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleCardClick = () => toggleListItem(id);

  return (
    <Card
      elevation={cardElevation}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      ref={setNodeRef}
      style={{ ...style }}
      {...attributes}
      {...listeners}
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
          onClick={handleCardClick}
          style={{ cursor: 'pointer' }}
          title={`Mark task as ${checked ? 'incomplete' : 'complete'}`}
        />
        <Typography
          variant={'h5'}
          component={'div'}
          sx={{
            flex: '1',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          title={value}
        >
          {value}
        </Typography>
        <ActionsGrid id={id} />
      </CardContent>
    </Card>
  );
};
