// Define the type for a list item
type ListItem = {
  id: number;
  value: string;
  completed: boolean;
  dueDate: string;
};

// Define the type for the list
type List = {
  items: ListItem[];
};
