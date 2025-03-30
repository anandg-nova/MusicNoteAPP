import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface SectionHeaderProps {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
  onToggleExpand: () => void;
  isExpanded: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onEdit,
  onDelete,
  onAdd,
  onToggleExpand,
  isExpanded,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Box>
        <Tooltip title="Edit Section">
          <IconButton
            onClick={onEdit}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Note">
          <IconButton
            onClick={onAdd}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Section">
          <IconButton
            onClick={onDelete}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={isExpanded ? "Collapse Section" : "Expand Section"}>
          <IconButton
            onClick={onToggleExpand}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SectionHeader; 