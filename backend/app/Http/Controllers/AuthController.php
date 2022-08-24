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
       
         return response()->json(['data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer', 'message'=>'Uspesna registracija!']);
        }

    public function login(Request $request) {

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['success'=>'false']);



        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['success'=>true, 'access_token'=>$token, 'token_type'=>'Bearer', 'user_role'=> $user->user_role, 'name_and_surname'=>$user->name_and_surname]);

    }

    public function logout() {
        auth()->user()->tokens()->delete();
        //return response()->json(['message' => 'Successfully logged out', 'success' => true]);

        return ['message'=>'You logged out successfully!'];
    }
}
