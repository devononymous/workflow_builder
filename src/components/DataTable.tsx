import React, { useState, useEffect, useMemo, useCallback } from "react";
import { TiPinOutline } from "react-icons/ti";
import { IoEllipsisVertical } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";
import { RiArrowDownLine } from "react-icons/ri";
import { FaArrowUp } from "react-icons/fa";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { RiPictureInPictureExitFill } from "react-icons/ri";
import Button from "./Button";
import ConfirmationModal from './ConfirmationModal';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Pagination,
  Box,
  InputBase,
  useMediaQuery,
  Stack,
  Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { theme } from "../../src/theme";
import { useNavigate } from 'react-router-dom';

interface Workflow {
  id: number;
  workflowName: string;
  lastEditedOn: string;
  description: string;
}

interface DataTableProps {
  onDeleteWorkflow: (workflow: Workflow) => void;
}

// Dummy data with 25 items for pagination testing
const initialWorkflows: Workflow[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  workflowName: `Workflow ${i + 1}`,
  lastEditedOn: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  description: `Description for workflow ${i + 1} covering various business processes`,
}));

const DataTable: React.FC<DataTableProps> = ({ onDeleteWorkflow }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const rowsPerPage = isSmallScreen ? 3 : 5;
  const navigate = useNavigate();

  const handleOpenDeleteModal = (workflow: Workflow) => {
    setWorkflowToDelete(workflow);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (workflowToDelete) {
      onDeleteWorkflow(workflowToDelete);
      setDeleteModalOpen(false);
      setWorkflowToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setWorkflowToDelete(null);
  };

  // Debounce search term to avoid filtering on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize filtered workflows to avoid recalculating on every render
  const filteredWorkflows = useMemo(() => {
    if (!debouncedSearchTerm) return initialWorkflows;
    
    const term = debouncedSearchTerm.toLowerCase();
    return initialWorkflows.filter(
      (workflow) =>
        workflow.workflowName.toLowerCase().includes(term) ||
        workflow.id.toString().includes(term) ||
        workflow.description.toLowerCase().includes(term)
    );
  }, [debouncedSearchTerm]);

  // Memoize paginated data
  const paginatedWorkflows = useMemo(() => {
    return filteredWorkflows.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
  }, [filteredWorkflows, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredWorkflows.length / rowsPerPage);

  // Reset to first page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setIsLoading(true);
    },
    []
  );

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchTerm]);

  const handleDownloadClick = useCallback((id: number) => {
    setExpandedRow(prev => prev === id ? null : id);
  }, []);

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  return (
    <Paper sx={{ p: 2, overflow: "hidden" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2, alignItems: { xs: "stretch", sm: "center" } }}
      >
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <InputBase
            sx={{
              flex: 1,
              fontSize: theme.typography.small,
              fontWeight: 700,
              border: "1px solid #E0E0E0",
              borderRadius: "5px",
              p: 1,
              width: "100%",
              maxWidth: { xs: "100%", sm: "250px" },
            }}
            placeholder="Search By WorkFlow Name/ID"
            inputProps={{ "aria-label": "Search By WorkFlow Name/ID" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            {isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
          </IconButton>
        </Box>

        <Button onClick={() => navigate('/workflow/{id}')}  // Corrected line
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            borderRadius: "5px",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          + Create New Process
        </Button>
      </Stack>

      <TableContainer 
        sx={{ 
          overflowX: "auto",
          maxHeight: isSmallScreen ? "60vh" : "70vh",
          overflowY: "auto"
        }}
      >
        <Table 
          size={isSmallScreen ? "small" : "medium"}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Workflow Name</TableCell>
              {!isSmallScreen && (
                <>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Last Edited On</TableCell>
                  {!isMediumScreen && (
                    <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                  )}
                </>
              )}
              <TableCell sx={{ fontWeight: 700 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkflows.length > 0 ? (
              paginatedWorkflows.map((workflow) => (
                <WorkflowRow 
                  key={workflow.id}
                  workflow={workflow}
                  isSmallScreen={isSmallScreen}
                  isMediumScreen={isMediumScreen}
                  expandedRow={expandedRow}
                  onDownloadClick={handleDownloadClick}
                  onDeleteClick={handleOpenDeleteModal} navigate={navigate}                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isSmallScreen ? 2 : isMediumScreen ? 4 : 5}>
                  <Typography align="center" sx={{ py: 2 }}>
                    No workflows found matching your search criteria
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredWorkflows.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isSmallScreen ? "small" : "medium"}
            showFirstButton
            showLastButton
          />
        </Box>
      )}

<ConfirmationModal
  open={deleteModalOpen}
  title={`Are you sure you want to Delete ${workflowToDelete?.workflowName}?`}  // Corrected line
  onClose={handleCloseDeleteModal}
  onConfirm={handleConfirmDelete}
  warningText="You cannot undo this step"
/>

    </Paper>
  );
};

interface WorkflowRowProps {
  workflow: Workflow;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  expandedRow: number | null;
  onDownloadClick: (id: number) => void;
  onDeleteClick: (workflow: Workflow) => void;

}

const WorkflowRow = React.memo(({
  workflow,
  isSmallScreen,
  isMediumScreen,
  expandedRow,
  onDownloadClick,
  onDeleteClick,
  navigate
}: WorkflowRowProps & { navigate: (path: string) => void }) => {
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{workflow.workflowName}</TableCell>
        {!isSmallScreen && (
          <>
            <TableCell>{workflow.id}</TableCell>
            <TableCell>{workflow.lastEditedOn}</TableCell>
            {!isMediumScreen && (
              <TableCell>{workflow.description}</TableCell>
            )}
          </>
        )}
        <TableCell>
          <ActionButtons 
            workflow={workflow}
            isSmallScreen={isSmallScreen}
            onDownloadClick={onDownloadClick}
            expandedRow={expandedRow}
            onDeleteClick={onDeleteClick}
            navigate={navigate} 
          />
        </TableCell>
      </TableRow>
      {expandedRow === workflow.id && (
        <ExpandedRow 
          isSmallScreen={isSmallScreen}
          isMediumScreen={isMediumScreen}
        />
      )}
    </React.Fragment>
  );
});

interface ActionButtonsProps {
  workflow: Workflow;
  isSmallScreen: boolean;
  onDownloadClick: (id: number) => void;
  expandedRow: number | null;
  onDeleteClick: (workflow: Workflow) => void;
  navigate: (path: string) => void; 
 
}

const ActionButtons = React.memo(({
  workflow,
  isSmallScreen,
  onDownloadClick,
  expandedRow,
  onDeleteClick,
  navigate
}: ActionButtonsProps) => {
  const isExpanded = expandedRow === workflow.id;

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="flex-end"
    >
      <IconButton size="small" onClick={() => console.log("Pin clicked")}>
        <TiPinOutline />
      </IconButton>
      {!isSmallScreen && (
        <>
          <Button size="small" sx={{ minWidth: "auto" }}>
            Execute
          </Button>
          <Button
       onClick={() => navigate(`/workflow/${workflow.id}`)}
           size="small" sx={{ minWidth: "auto" }}>
            Edit
          </Button>
        </>
      )}
      <Tooltip
        arrow
        title="Delete"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: '#d6d6d6',
              color: theme.palette.error.main,
              fontFamily: '"Poppins", sans-serif',
              textDecoration: 'underline',
              letterSpacing: '0.5px',
            }
          }
        }}
      >
        <IconButton 
          size="small"
          onClick={() => onDeleteClick(workflow)}
          sx={{ color: "#ffff", cursor: "pointer" }}
        >
          <IoEllipsisVertical style={{
            color: theme.palette.text.secondary, 
            cursor: "pointer"
          }} />
        </IconButton>
      </Tooltip>
      <IconButton
        size="small"
        onClick={() => onDownloadClick(workflow.id)}
      >
        {isExpanded ? <FaArrowUp /> : <RiArrowDownLine />}
      </IconButton>
    </Stack>
  );
});

interface ExpandedRowProps {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
}

const ExpandedRow = React.memo(({
  isSmallScreen,
  isMediumScreen
}: ExpandedRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={isSmallScreen ? 2 : isMediumScreen ? 4 : 5}>
        <Accordion expanded>
          <AccordionSummary>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
                padding: '8px 0',
                fontSize: '0.875rem',
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={{ width: 2, height: 2 }} />
                  <TimelineConnector sx={{ height: 24 }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '2px', px: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    Code
                    <Stack direction="row" spacing={0.5} sx={{ ml: 'auto' }}>
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <RiPictureInPictureExitFill />
                      </IconButton>
                    </Stack>
                  </Stack>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot sx={{ 
                    width: 12, 
                    height: 12,
                    backgroundColor: 'red' 
                  }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '6px', px: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    Code
                    <Stack direction="row" spacing={0.5} sx={{ ml: 'auto' }}>
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <RiPictureInPictureExitFill />
                      </IconButton>
                    </Stack>
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Here you can add more details about the download or
              any other content.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TableCell>
    </TableRow>
  );
});

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default DataTable;