<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    function register(Request $req)
    {
        try {
            if (User::checkemail($req->email)) {
                return response()->json(['message' => 'Email Already Exists'], 400);
            }
            $validate = [
                'name' => 'required|max:30',
                'email' => 'required|max:30',
                'password' => 'required|max:40',
            ];
            $req->validate($validate);

            $user = User::register($req->name, $req->email, $req->password);

            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;
            return response()->json(['message' => 'User added Successfully', 'token' => $token], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function login(Request $req)
    {
        try {
            $validate = [
                'email' => 'required|max:30',
                'password' => 'required|max:40',
            ];
            $req->validate($validate);
            $user = User::checkemail($req->email);
            if (!$user || !User::checkpass($req->password, $user->password)) {
                return response()->json(['message' => 'Invalid Email or Password'], 400);
            }
            $user->tokens->each->delete();

            $token = $user->createToken('token', ['*'], now()->addHours(6))->plainTextToken;
            return response()->json(['message' => 'Loggedin Successfully', 'token' => $token], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getalluser()
    {
        try {
            return User::getalluser();
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deleteuser(Request $req)
    {
        try {
            User::deleteuser($req->input('id'));
            return response()->json(['message' => 'User Deleted Successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
