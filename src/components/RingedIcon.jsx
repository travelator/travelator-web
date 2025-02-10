import { Box } from "@mui/material";
import PropTypes from 'prop-types';

const RingedIcon = ({ Icon, color }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,  // Set width and height to make it circular
        height: 50,
        borderRadius: "50%",
        border: `2px solid ${color}`,  // Ring color
        color: color,  // Icon color
      }}
    >
      <Icon fontSize="large" />
    </Box>
  );
};

RingedIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
};

export default RingedIcon;