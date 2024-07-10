import { useEffect, useState, type FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useListContext } from '../../ListProvider';
import { HamburgerDropdown } from './HamburgerDropdown';
import { TaskStatusIcon } from './TaskStatusIcon';

type TaskCardProps = {
  id: string;
  checked: boolean;
  value: string;
} & JSX.IntrinsicElements['div'];

export const TaskCard: FC<TaskCardProps> = ({ id, checked, value }) => {
  const { toggleListItem } = useListContext();

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
      component={'div'}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
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
        <HamburgerDropdown id={id} />
      </CardContent>
    </Card>
  );
};
