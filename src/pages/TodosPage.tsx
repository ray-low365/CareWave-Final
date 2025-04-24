import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoService } from '@/services/api';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckSquare, Plus, Loader2, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Todo {
  id: string;
  title: string;
  content?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

function TodosPage() {
  const [newTodo, setNewTodo] = useState<string>('');
  const queryClient = useQueryClient();

  // Fetch todos
  const {
    data: todos = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['todos'],
    queryFn: TodoService.getAll,
  });

  // Add todo mutation
  const addTodoMutation = useMutation({
    mutationFn: (title: string) => TodoService.create({ title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodo('');
      toast.success('Todo added successfully');
    },
    onError: (error: any) => {
      console.error('Error adding todo:', error);
      toast.error('Failed to add todo');
    }
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => TodoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  });

  // Toggle complete mutation
  const toggleCompleteMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string, completed: boolean }) =>
      TodoService.update(id, { completed: !completed }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success(`Todo marked as ${!variables.completed ? 'completed' : 'incomplete'}`);
    },
    onError: (error: any) => {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  });

  // Handle form submission
  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodoMutation.mutate(newTodo.trim());
  }

  // Handle delete todo
  function handleDeleteTodo(id: string) {
    deleteTodoMutation.mutate(id);
  }

  // Handle toggle complete
  function handleToggleComplete(id: string, completed: boolean) {
    toggleCompleteMutation.mutate({ id, completed });
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Todos</h1>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              Todo List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                disabled={addTodoMutation.isPending}
                className="flex-1"
              />
              <Button type="submit" disabled={addTodoMutation.isPending || !newTodo.trim()}>
                {addTodoMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus size={16} />}
                Add
              </Button>
            </form>

            {isLoading && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded mb-4">
                <p>Error: {(error as Error).message}</p>
              </div>
            )}

            {!isLoading && !error && todos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckSquare className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No todos found. Create your first todo!</p>
              </div>
            )}

            {todos.length > 0 && (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`border p-3 rounded flex items-center justify-between hover:shadow-md transition-shadow ${todo.completed ? 'bg-muted/50' : ''}`}
                  >
                    <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
                      {todo.title}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleComplete(todo.id, todo.completed)}
                        title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                        disabled={toggleCompleteMutation.isPending}
                      >
                        <Check className={`h-4 w-4 ${todo.completed ? 'text-primary' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTodo(todo.id)}
                        title="Delete todo"
                        disabled={deleteTodoMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default TodosPage;
