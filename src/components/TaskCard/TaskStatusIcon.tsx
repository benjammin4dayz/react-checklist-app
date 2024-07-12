import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type FC,
} from 'react';
import { Avatar } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

type TaskStatusIconProps = {
  checked: boolean;
  colorChangeCooldown?: number;
} & ComponentPropsWithoutRef<typeof Avatar>;

export const TaskStatusIcon: FC<TaskStatusIconProps> = ({
  checked,
  colorChangeCooldown = 1000,
  ...restProps
}) => {
  const [iconColor, setIconColor] = useState<
    'gray' | 'warning.main' | 'primary.main' | 'success.main'
  >('gray');
  const [isHot, setIsHot] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);
  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setIsHovered(false);

  useEffect(() => {
    setIsHot(true);

    const timeout = setTimeout(() => {
      setIsHot(false);
    }, colorChangeCooldown);

    return () => {
      clearTimeout(timeout);
    };
  }, [checked, colorChangeCooldown]);

  useEffect(() => {
    if (checked && isHovered && !isHot) {
      setIconColor('warning.main');
    } else if (isHovered && !isHot) {
      setIconColor('primary.main');
    } else if (checked) {
      setIconColor('success.main');
    } else {
      setIconColor('gray');
    }
  }, [checked, isHovered, isHot]);

  return (
    <Avatar
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        backgroundColor: iconColor,
        opacity: checked ? 1 : 0.7,
        transition: `background-color ${colorChangeCooldown / 2}ms ease`,
      }}
      {...restProps}
    >
      <CheckCircle sx={{ color: 'text.primary' }} />
    </Avatar>
  );
};
