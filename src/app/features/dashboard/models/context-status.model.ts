export interface IContextStatus {
  contextId: number;
  statusId: any;
  createdAt?: string;
  updatedAt?: string | null;
  context?: string | null;
  status?: string | null;
}
