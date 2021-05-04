export const taskStatuses = ['OPEN', 'IN_PROGRESS', 'DONE'] as const;
export type TaskStatus = typeof taskStatuses[number];