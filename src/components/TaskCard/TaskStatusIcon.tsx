import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    if (checked) {
      setIconColor(isHovered && !isHot ? 'warning.main' : 'success.main');
    } else {
      setIconColor(isHovered && !isHot ? 'primary.main' : 'gray');
    }
  }, [checked, isHovered, isHot]);

  return (
    <Avatar
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      {...restProps}
      sx={{
        backgroundColor: iconColor,
        opacity: checked ? 1 : 0.7,
        transition: `background-color ${colorChangeCooldown / 2}ms ease`,
      }}
      variant={'rounded'}
    >
      <CheckCircleIcon sx={{ color: 'text.primary' }} />
    </Avatar>
  );
};
