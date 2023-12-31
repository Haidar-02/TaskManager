<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskContoller extends Controller
{
    public function create(Request $request){
        try{
            if(!$request->title || !$request->description || !$request->due_date){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please fill in all fields',
                ]);
            }
            if(Auth::user()->role_id != 1){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ]);
            }
            $dueDate = Carbon::parse($request->due_date)->toDateString();

            if ($dueDate < now()->toDateString()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Due date must be on or after the current date',
                ]);
            }
            $task = Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'due_date' => $dueDate,
                'employer_id' => Auth::id(),
                'is_done' => false,
            ]);
            return response()->json([
                'status'=>"success", 
                "task"=>$task,
                'message'=>'Task created succesfully !'
            ]);
        }catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not create task. ' . $e->getMessage(),
            ], 500);
        }
    }
    
    public function tasks()
    {
        try {
            $tasks = Task::all()->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'description' => $task->description,
                    'due_date' => $task->due_date,
                    'is_done' => $task->is_done,
                    'state' => $task->state,
                ];
            });
    
            return response()->json([
                'status' => 'success',
                'tasks' => $tasks,
                'message' => 'All tasks retrieved successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not retrieve tasks, try again later.',
            ], 500);
        }
    }

    public function edit(Request $request, $taskId)
    {
        try {
            $task = Task::find($taskId);
            
            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found',
                ]);
            }

            if(!$request->title || !$request->description || !$request->due_date){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please fill in all fields',
                ]);
            }

            if($request->title==$task->title && $request->description==$task->description && $request->due_date == $task->due_date){
                return response()->json([
                    'status' => 'error',
                    'message' => 'No change to task occured.',
                ]);
            }

            $dueDate = Carbon::parse($request->due_date)->toDateString();

            if ($dueDate < now()->toDateString()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Due date must be on or after the current date',
                ]);
            }

            if (Auth::user()->role_id != 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ]);
            }

            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'due_date' => $request->due_date,
            ]);

            return response()->json([
                'status' => 'success',
                'task' => $task,
                'message' => 'Task updated successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not update task, try again later.',
            ], 500);
        }
    }

    public function delete($taskId)
    {
        try {
            $task = Task::find($taskId);

            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found',
                ]);
            }

            if (Auth::user()->role_id != 1) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized',
                ]);
            }

            $task->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not delete task, try again later.',
            ], 500);
        }
    }

    public function markAsDone(Request $request, $taskId)
    {
        try {
            $task = Task::find($taskId);

            if (!$task) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task not found',
                ]);
            }

            $task->update([
                'is_done' => !$task->is_done,
            ]);

            $statusMessage = $task->is_done ? 'Task marked as done' : 'Task marked as undone';

            return response()->json([
                'status' => 'success',
                'message' => $statusMessage,
                'task' => $task,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not update task status, try again later.',
            ], 500);
        }
    }
}
