import { useState, type FC } from 'react';
import { useListContext } from '../../ListProvider';
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem as BaseMenuItem,
} from '@mui/base';
import { menuItemClasses, styled } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

// Mm.. Food
type HamburgerToppings = {
  id: string;
} & JSX.IntrinsicElements['div'];

export const HamburgerDropdown: FC<HamburgerToppings> = ({
  id,
  ...restProps
}) => {
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
    <div
      {...restProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
