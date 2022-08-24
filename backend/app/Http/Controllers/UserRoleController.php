<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserRoleCollection;
use App\Http\Resources\UserRoleResource;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRoleController extends Controller
{
    public function index()
    {
        $id = auth()->user()->id;

        $user = User::find($id);
        if($user->user_name == 'admin'){
            return new UserRoleCollection(UserRole::all());
        }
        return response()->json(['You do not have permission for that action']);
    }

    public function store(Request $request)
    {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->id_role->role_name == 'admin') {

            $validator = Validator::make($request->all(), [
                'role_name' => 'required|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            $userRole = UserRole::create([
                'role_name' => $request->role_name
            ]);

            return response()->json(['User role saved.', new UserRoleResource($userRole)]);
        }

        return response()->json(['You do not have permission for that action!']);

    }

    public function destroy(UserRole $userRole)
    {
        $id = auth()->user()->id;

        $user = User::find($id);
        if ($user->role_id->role_name == 'admin') {
            $userRole->delete();
            return response()->json(['User role deleted!']);
        }

        return response()->json(['You do not have permission for that action!']);

    }
}
