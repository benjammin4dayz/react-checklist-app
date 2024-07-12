import { useEffect, useState, type FC } from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useListContext } from '../../ListProvider';

export const ActionsGrid: FC<{ id: string }> = ({ id }) => {
  const { deleteListItem } = useListContext();

  const [color, setColor] = useState('pallette.primary.main');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (isHovered) {
      setColor('error.main');
    } else {
      setColor('gray');
    }
  }, [isHovered]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <IconButton
        sx={{ color }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => deleteListItem(id)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
