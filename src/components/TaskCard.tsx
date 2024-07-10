import { useEffect, useState, type FC } from 'react';
import { useListContext } from '../ListProvider';
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem as BaseMenuItem,
} from '@mui/base';
import {
  Card,
  CardContent,
  menuItemClasses,
  styled,
  Typography,
} from '@mui/material';
import { CheckCircle, Menu as MenuIcon } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

type TaskCard = {
  id: string;
  checked: boolean;
  value: string;
} & JSX.IntrinsicElements['div'];

export const TaskCard: FC<TaskCard> = ({ id, checked, value }) => {
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

  const TaskStatusIcon: FC<
    { checked: boolean } & JSX.IntrinsicElements['div']
  > = ({ checked, ...restProps }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    let iconColor = 'gray';

    if (isHovered && checked) {
      iconColor = 'warning.main';
    } else if (isHovered) {
      iconColor = 'primary.main';
    } else if (checked) {
      iconColor = 'success.main';
    }

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOut}
        {...restProps}
      >
        <CheckCircle
          sx={{
            color: iconColor,
            opacity: checked ? 1 : 0.7,
            transition: 'color 0.3s ease',
          }}
        />
      </div>
    );
  };

  const HamburgerDropdown: FC<{ id: string }> = ({ id }) => {
    const { deleteListItem } = useListContext();

    const handleEdit = () => alert('Not implemented yet!');
    const handleDelete = () => deleteListItem(id);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const Listbox = styled('ul')(
      ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        min-width: 100px;
        border-radius: 12px;
        overflow: auto;
        outline: 0px;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${
          theme.palette.mode === 'dark' ? grey[700] : grey[200]
        };
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        box-shadow: 0px 4px 30px ${
          theme.palette.mode === 'dark' ? grey[900] : grey[200]
        };
        z-index: 1;
      
        .closed & {
          opacity: 0;
          transform: scale(0.95, 0.8);
          transition: opacity 200ms ease-in, transform 200ms ease-in;
        }
        
        .open & {
          opacity: 1;
          transform: scale(1, 1);
          transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
        }
      
        .placement-top & {
          transform-origin: bottom;
        }
      
        .placement-bottom & {
          transform-origin: top;
        }
        `
    );

    const MenuItem = styled(BaseMenuItem)(
      ({ theme }) => `
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
        
      &:last-of-type {
        border-bottom: none;
      }
        
      &:focus:not(:disabled) {
        background-color: ${
          theme.palette.mode === 'dark' ? grey[800] : grey[100]
        };
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      }
        
      &.${menuItemClasses.disabled} {
        color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
      }
      `
    );

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Dropdown>
          <MenuButton slots={{ root: 'div' }}>
            <MenuIcon sx={{ color: isHovered ? 'primary.main' : 'gray' }} />
          </MenuButton>
          <Menu slots={{ listbox: Listbox }}>
            <MenuItem
              title="Edit this task (not implemented)"
              sx={{ cursor: 'not-allowed' }}
              onClick={handleEdit}
              disabled
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Dropdown>
      </div>
    );
  };

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
