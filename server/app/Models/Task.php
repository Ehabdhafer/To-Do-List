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

    protected static function alltasks($user_id)
    {
        try {
            return self::where('user_id', $user_id)
                ->get();
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
            return self::where('user_id', $user_id)
                ->findorfail($id)
                ->update($data);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deletetask($user_id, $id)
    {
        try {
            return self::where('user_id', $user_id)
                ->findorfail($id)
                ->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
