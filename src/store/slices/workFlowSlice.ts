import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Types
interface WorkflowStats {
  passed: number;
  failed: number;
  lastExecuted?: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  stats: WorkflowStats;
}
 
interface WorkflowApiResponse {
  workflows: Workflow[];
  totalPassed: number;
  totalFailed: number;
}

interface WorkflowState {
  workflows: Workflow[];
  stats: {
    totalPassed: number;
    totalFailed: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: WorkflowState = {
  workflows: [],
  stats: {
    totalPassed: 0,
    totalFailed: 0
  },
  status: 'idle',
  error: null,
};

// Beeceptor API endpoint
const API_URL = 'https://your-beeceptor-endpoint.free.beeceptor.com/workflows';

// Async Thunks
export const fetchWorkflows = createAsyncThunk(
  'workflows/fetchWorkflows',
  async () => {
    const response = await axios.get<WorkflowApiResponse>(API_URL);
    return response.data;
  }
);

export const updateWorkflow = createAsyncThunk(
  'workflows/updateWorkflow',
  async ({ id, updates }: { id: string; updates: Partial<Workflow> }) => {
    const response = await axios.put<Workflow>(`${API_URL}/${id}`, updates);
    return response.data;
  }
);

export const deleteWorkflow = createAsyncThunk(
  'workflows/deleteWorkflow',
  async (workflowId: string) => {
    await axios.delete(`${API_URL}/${workflowId}`);
    return workflowId;
  }
);

// Slice
const workflowSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Workflows
      .addCase(fetchWorkflows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkflows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workflows = action.payload.workflows;
        state.stats = {
          totalPassed: action.payload.totalPassed,
          totalFailed: action.payload.totalFailed
        };
      })
      .addCase(fetchWorkflows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch workflows';
      })

      // Update Workflow
      .addCase(updateWorkflow.fulfilled, (state, action) => {
        const index = state.workflows.findIndex(w => w.id === action.payload.id);
        if (index !== -1) {
          // Update workflow and recalculate totals
          const oldStats = state.workflows[index].stats;
          const newStats = action.payload.stats;
          
          state.stats.totalPassed += (newStats.passed - oldStats.passed);
          state.stats.totalFailed += (newStats.failed - oldStats.failed);
          
          state.workflows[index] = action.payload;
        }
      })

      // Delete Workflow
      .addCase(deleteWorkflow.fulfilled, (state, action) => {
        const deletedWorkflow = state.workflows.find(w => w.id === action.payload);
        if (deletedWorkflow) {
          state.stats.totalPassed -= deletedWorkflow.stats.passed;
          state.stats.totalFailed -= deletedWorkflow.stats.failed;
        }
        state.workflows = state.workflows.filter(
          workflow => workflow.id !== action.payload
        );
      });
  },
});

export default workflowSlice.reducer;