<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/addtask', [TaskController::class, 'addtask']);
    Route::get('/alltasks', [TaskController::class, 'alltasks']);
    Route::get('/todaytasks', [TaskController::class, 'todaytasks']);
    Route::get('/taskcount', [TaskController::class, 'taskcount']);
    Route::get('/todaytaskcount', [TaskController::class, 'todaytaskcount']);
    Route::get('/taskid', [TaskController::class, 'taskid']);
    Route::put('/updatetask', [TaskController::class, 'updatetask']);
    Route::delete('/deletetask', [TaskController::class, 'deletetask']);
});

Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::post('/adminaddtask', [TaskController::class, 'adminaddtask']);
});
