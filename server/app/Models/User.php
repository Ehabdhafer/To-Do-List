<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
    use SoftDeletes;

    protected static function register($name, $email, $password)
    {
        try {
            return self::create([
                'name' => $name, 'email' => $email, 'password' => $password
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function checkemail($email)
    {
        try {
            return self::where('email', $email)
                ->first();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function checkpass($password, $hashedpass)
    {
        try {
            return Hash::check($password, $hashedpass);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getalluser()
    {
        try {
            return self::get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deleteuser($id)
    {
        try {
            return self::findorfail($id)
                ->delete();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getuser($id)
    {
        try {
            return self::select(['id', 'name', 'email', 'created_at', 'updated_at'])
                ->findorfail($id);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function updateuser($id, $data)
    {
        try {
            return self::findorfail($id)
                ->update($data);
        } catch (Exception $e) {
            throw $e;
        }
    }


    public function receivesBroadcastNotificationsOn()
    {
        return 'App.Models.User.' . $this->id;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
