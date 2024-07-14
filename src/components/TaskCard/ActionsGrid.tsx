import { FC, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useListContext } from '../../ListProvider';

export const ActionsGrid: FC<{ id: string }> = ({ id }) => {
  const { deleteListItem } = useListContext();

  const [isHovered, setIsHovered] = useState<boolean>(false);

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
        sx={{ color: isHovered ? 'error.main' : 'gray' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => deleteListItem(id)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};
