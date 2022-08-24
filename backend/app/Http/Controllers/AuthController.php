<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name_and_surname' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:5'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

      
        $user_role = 'user';
        
        $user = User::create([
            'name_and_surname' => $request->name_and_surname,
            'email' => $request->email,
            'user_role' => $user_role,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        /*
        return response()->json(['message' => 'New user successfully created.', 'data' => $user, 'access_token' => $token,
            'token_type' => 'Bearer', 'success' => true, 'user_type' => 'user', 'user_id' => $user->id]); //ovo ovde vidi malo izmeni tekst, da ide nekim malo boljim redom
   */
         return response()->json(['data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer', 'message'=>'Uspesna registracija!']);
        }

    public function login(Request $request) {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['success'=>'false']);


          //  return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
/*
        $userRole = DB::table('users')
            ->join('user_roles', 'users.id_role', '=', 'user_roles.id')
            ->select('user_roles.role_name')
            ->where('users.id', '=', $user->id)
            ->get();
            */
        $token = $user->createToken('auth_token')->plainTextToken;
/*
        return response()->json(['message' => 'Successfully logged in ' . $user->name_and_surname,
            'access_token' => $token, 'token_type' => 'Bearer', 'success' => true,
            'user_type' => $userRole, 'user_id' => $user->id]); //i ovo ovde malo izmeniti!!!
            */

            return response()->json(['success'=>true, 'access_token'=>$token, 'token_type'=>'Bearer', 'user_role'=> $user->user_role, 'name_and_surname'=>$user->name_and_surname]);

    }

    public function logout() {
        auth()->user()->tokens()->delete();
        //return response()->json(['message' => 'Successfully logged out', 'success' => true]);

        return ['message'=>'You logged out successfully!'];
    }
}
