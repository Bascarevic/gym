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
       /*
       $logged_user = auth()->user();
       $user_role = UserRole::find($logged_user->id_role);
       if($user_role->role_name != 'admin'){
        return response()->json(['success'=>false, 'error'=>'You do not have permission for that action!']);
       }
       return response()->json(['succes'=>true, 'users'=>new UserCollection(($users))]);
       */

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


    //ako bude trebala ovu metodu ispravljas tako da primi id usera i po tome pretrazuje
    public function show(User $user) {
        $logged_user = auth()->user();
        $user_role = UserRole::find($logged_user->id_role);
        if ($user_role->role_name != 'admin' && $logged_user->id != $user->id) {
            return response()->json(['success' => false, 'error' => 'You do not have permission for that action!']);
        }
        return response()->json(['success' => true, 'user' => new UserResource($user)]);
    }



    public function destroy(User $user) {
        /*
        $logged_user = auth()->user();
        $user_role = UserRole::find($logged_user->role_id);
        if ($user_role->role_name != 'admin') {
            return response()->json(['success' => false, 'error' => 'You do not have permission for that action!']);
        }
        */
        $logged_user = auth()->user();
        if($logged_user->user_role == 'admin'){
        $user->delete();
        return response()->json('User deleted!');
        } //prepravi odg ako bude trebalo
        return response()->json('You do not have permission for that action!');
    }
}
