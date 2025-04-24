import { supabase } from '../config/database';
import { Todo, TodoInsert, TodoUpdate } from '../models/types';

export const TodoService = {
  /**
   * Get all todos
   */
  getAll: async (): Promise<Todo[]> => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(`Error fetching todos: ${error.message}`);
    }
    
    return data || [];
  },
  
  /**
   * Get a todo by ID
   */
  getById: async (id: string): Promise<Todo> => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(`Error fetching todo: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Todo not found');
    }
    
    return data;
  },
  
  /**
   * Create a new todo
   */
  create: async (todo: TodoInsert): Promise<Todo> => {
    const { data, error } = await supabase
      .from('todos')
      .insert(todo)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error creating todo: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Failed to create todo');
    }
    
    return data;
  },
  
  /**
   * Update a todo
   */
  update: async (id: string, todo: TodoUpdate): Promise<Todo> => {
    const { data, error } = await supabase
      .from('todos')
      .update(todo)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('Todo not found');
    }
    
    return data;
  },
  
  /**
   * Delete a todo
   */
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  }
};
