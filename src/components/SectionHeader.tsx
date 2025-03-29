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
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
  expanded: boolean;
  onToggleExpand: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isEditing,
  onEdit,
  onDelete,
  onAdd,
  expanded,
  onToggleExpand,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        bgcolor: 'primary.main',
        color: 'white',
      }}
    >
      <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Add Line">
          <IconButton
            size="small"
            onClick={onAdd}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={isEditing ? "Save Changes" : "Edit Section"}>
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Section">
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={expanded ? "Collapse Section" : "Expand Section"}>
          <IconButton
            size="small"
            onClick={onToggleExpand}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}; 