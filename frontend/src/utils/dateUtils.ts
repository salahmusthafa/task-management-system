export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const getStatusColor = (status: 'To Do' | 'In Progress' | 'Done') => {
  const colors = {
    'To Do': { bg: '#e0e0e0', text: '#222' },
    'In Progress': { bg: '#ffe082', text: '#b26a00' },
    'Done': { bg: '#b9f6ca', text: '#00695c' }
  };
  return colors[status];
};

export const validateTask = (task: { title: string; description: string; dueDate: string }) => {
  const errors: string[] = [];
  
  if (!task.title.trim()) {
    errors.push('Title is required');
  }
  
  if (!task.description.trim()) {
    errors.push('Description is required');
  }
  
  if (!task.dueDate) {
    errors.push('Due date is required');
  } else {
    const dueDate = new Date(task.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.push('Invalid due date format');
    }
  }
  
  return errors;
}; 