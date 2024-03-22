<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;
    protected $table = 'tasks';
    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'due_date',
        'user_id',
    ];

    protected static function addtask(
        $user_id,
        $title,
        $description,
        $priority,
        $due_date,
    ) {
        try {
            return self::create([
                'user_id' => $user_id,
                'title' => $title,
                'description' => $description,
                'priority' => $priority,
                'due_date' => $due_date,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function adminaddtask(
        $user_id,
        $title,
        $description,
        $priority,
        $due_date,
    ) {
        try {
            return self::create([
                'user_id' => $user_id,
                'title' => $title,
                'description' => $description,
                'priority' => $priority,
                'due_date' => $due_date,
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function alltasks($user_id)
    {
        try {
            return self::where('user_id', $user_id)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function adminalltask()
    {
        try {
            return self::get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function taskcount($user_id)
    {
        try {
            return self::where('user_id', $user_id)
                ->count();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function todaytasks($user_id)
    {
        try {
            return self::where('user_id', $user_id)
                ->where('due_date', now()->toDateString())
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function todaytaskcount($user_id)
    {
        try {
            return self::where('user_id', $user_id)
                ->where('due_date', now()->toDateString())
                ->count();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function taskid($user_id, $id)
    {
        try {
            return self::where('user_id', $user_id)
                ->findorfail($id);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function updatetask(
        $user_id,
        $id,
        $data
    ) {
        try {
            $task = self::where('user_id', $user_id)
                ->findorfail($id);
            $task->update($data);
            return $task;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deletetask($user_id, $id)
    {
        try {
            $task = self::where('user_id', $user_id)
                ->findorfail($id);
            $task->delete();
            return $task;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deletetaskadmin($id)
    {
        try {
            $task = self::findorfail($id);
            $task->delete();
            return $task;
        } catch (Exception $e) {
            throw $e;
        }
    }
}
