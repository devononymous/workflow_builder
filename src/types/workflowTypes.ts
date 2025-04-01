export interface WorkflowStats {
    passed: number;
    failed: number;
    lastExecuted?: string;
  }
  
  export interface Workflow {
    id: string;
    name: string;
    description: string;
    stats: WorkflowStats;
  }