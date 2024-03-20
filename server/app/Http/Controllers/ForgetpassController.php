<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\forgetpassword;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ForgetpassController extends Controller
{
    function forgotpassword(Request $req)
    {
        try {
            $user = User::where('email', $req->email)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            $user->notify(new forgetpassword());
            $success['success'] = true;
            return response()->json($success, 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
