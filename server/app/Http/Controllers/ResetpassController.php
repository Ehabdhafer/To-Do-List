<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetpassRequest;
use App\Models\User;
use Ichtrojan\Otp\Otp;
use Illuminate\Support\Facades\Hash;

class ResetpassController extends Controller
{
    private $otp;

    function __construct()
    {
        $this->otp = new Otp;
    }

    function passwordReset(ResetpassRequest $req)
    {
        $otp2 = $this->otp->validate($req->email, $req->otp);
        if (!$otp2->status) {
            return response()->json(['error' => $otp2], 401);
        }
        $user = User::where('email', $req->email)->first();
        $user->update(['password' => Hash::make($req->password)]);
        $success['success'] = true;

        return response()->json($success, 200);
    }
}
