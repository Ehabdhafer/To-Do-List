<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Notifications\AddTask;
use App\Notifications\DeleteTask;
use App\Notifications\UpdateTask;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    function addtask(Request $req)
    {
        try {
            $user = Auth::user();
            $validate = [
                'title' => 'required|max:15',
                'description' => 'required|max:400',
                'priority' => 'required|max:10',
            ];
            $req->validate($validate);

            $task = Task::addtask(
                $user->id,
                $req->title,
                $req->description,
                $req->priority,
                $req->due_date
            );

            Notification::send($user, new AddTask($task));

            return response()->json(['message' => 'Task added Successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function adminaddtask(Request $req)
    {
        try {
            $task = Task::adminaddtask(
                $req->user_id,
                $req->title,
                $req->description,
                $req->priority,
                $req->due_date
            );

            $user = User::find($req->user_id);
            Notification::send($user, new AddTask($task));

            return response()->json(['message' => 'Task added Successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function alltasks()
    {
        try {
            $user = Auth::user();
            // $cacheKey = 'today_tasks_' . $user->id;
            // return Cache::remember($cacheKey, 60 * 60, function () use ($user)  {
            return Task::alltasks($user->id);
            // });
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function adminalltask()
    {
        try {
            return Task::adminalltask();
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function taskcount()
    {
        try {
            $user = Auth::user();
            return Task::taskcount($user->id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function todaytaskcount()
    {
        try {
            $user = Auth::user();
            return Task::todaytaskcount($user->id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function todaytasks()
    {
        try {
            $user = Auth::user();
            // $cacheKey = 'today_tasks_' . $user->id;
            // return Cache::remember($cacheKey, 60 * 60, function () use ($user)  {
            return Task::todaytasks($user->id);
            // });
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function taskid(Request $req)
    {
        try {
            $user = Auth::user();
            return Task::taskid($user->id, $req->id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function updatetask(Request $req)
    {
        try {
            $user = Auth::user();
            $updated = $req->only(['title', 'description', 'priority', 'due_date', 'status']);
            $task = Task::updatetask(
                $user->id,
                $req->id,
                $updated
            );

            Notification::send($user, new UpdateTask($task));


            return response()->json(['message' => 'Task updated successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deletetask(Request $req)
    {
        try {
            $user = Auth::user();
            $task = Task::deletetask($user->id, $req->id);

            Notification::send($user, new DeleteTask($task));

            return response()->json(['message' => 'Task deleted successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deletetaskadmin(Request $req)
    {
        try {
            $task = Task::deletetaskadmin($req->id);

            $user = User::find($task->user_id);
            Notification::send($user, new DeleteTask($task));
            return response()->json(['message' => 'Task deleted successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
