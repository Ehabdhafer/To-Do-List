<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


Route::middleware(['auth:sanctum', 'role:1'])->group(function () {
    Route::get('/getalluser', [UserController::class, 'getalluser']);
    Route::delete('/deleteuser', [UserController::class, 'deleteuser']);
});
