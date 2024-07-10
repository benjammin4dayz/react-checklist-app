import { useState, type FC } from 'react';
import { CheckCircle } from '@mui/icons-material';

type TaskStatusIconProps = {
  checked: boolean;
} & JSX.IntrinsicElements['div'];

export const TaskStatusIcon: FC<TaskStatusIconProps> = ({
  checked,
  ...restProps
}) => {
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
