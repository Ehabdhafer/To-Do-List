<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;
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

            Task::addtask(
                $user->id,
                $req->title,
                $req->description,
                $req->priority,
                $req->due_date
            );

            return response()->json(['message' => 'Task added Successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function alltasks()
    {
        try {
            // return Cache::remember('all_tasks', 60 * 60, function () {
            $user = Auth::user();
            return Task::alltasks($user->id);
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
            Task::updatetask(
                $user->id,
                $req->id,
                $updated
            );

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
            Task::deletetask($user->id, $req->id);
            return response()->json(['message' => 'Task deleted successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
