<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $logged_user = auth()->user();
        if($logged_user->user_role == 'admin'){
       $users = User::all();
      

       return response()->json($users);
       }
      // return response()->json('You do not have permission for that action!');
    }



    public function update(Request $request, User $user){

        $logged_user = auth()->user();
        if($logged_user->user_role == 'admin'){
    
       $request->validate([
        'name_and_surname'=>'required|string|max:50',
        'email'=> 'required|string|max:50',
       ]);

       $user->update([
        'name_and_surname'=> $request->name_and_surname,
        'email'=>$request->email

       ]);
       return response()->json($user);
    }
    return response()->json('You do not have permission for that action!');
       
}



    public function destroy(User $user) {
   
        $logged_user = auth()->user();
        if($logged_user->user_role == 'admin'){
        $user->delete();
        return response()->json('User deleted!');
        } 
        return response()->json('You do not have permission for that action!');
    }
}
