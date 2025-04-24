import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';

export const TodoController = {
  /**
   * Get all todos
   */
  getAllTodos: async (req: Request, res: Response) => {
    try {
      const todos = await TodoService.getAll();
      res.status(200).json(todos);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  },
  
  /**
   * Get a todo by ID
   */
  getTodoById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await TodoService.getById(id);
      res.status(200).json(todo);
    } catch (error: any) {
      res.status(error.message === 'Todo not found' ? 404 : 500).json({ 
        error: true, 
        message: error.message 
      });
    }
  },
  
  /**
   * Create a new todo
   */
  createTodo: async (req: Request, res: Response) => {
    try {
      const todo = await TodoService.create(req.body);
      res.status(201).json(todo);
    } catch (error: any) {
      res.status(500).json({ error: true, message: error.message });
    }
  },
  
  /**
   * Update a todo
   */
  updateTodo: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await TodoService.update(id, req.body);
      res.status(200).json(todo);
    } catch (error: any) {
      res.status(error.message === 'Todo not found' ? 404 : 500).json({ 
        error: true, 
        message: error.message 
      });
    }
  },
  
  /**
   * Delete a todo
   */
  deleteTodo: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await TodoService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.message === 'Todo not found' ? 404 : 500).json({ 
        error: true, 
        message: error.message 
      });
    }
  }
};
