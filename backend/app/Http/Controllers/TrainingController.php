<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrainingCollection;
use App\Http\Resources\TrainingResource;
use App\Models\Training;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Builder\Trait_;

class TrainingController extends Controller
{
    public function index()
    {
      $logged_user = auth()->user();
      if($logged_user->user_role != null){
        $trainings =Training::all();
        return response()->json($trainings);
      }
      
      return response()->json('You do not have permission for that action!');
    }

    /*
    public function store(Request $request)
    {
        /*
        $logged_user = auth()->user();
        $user_role=UserRole::find($logged_user->id_role);
// OVA DVA VRATI KAD BUDES NAPRAVILA LOGIN
        if($user_role->role_name != 'user') {
            return response()->json(['You do not have premission for that action!']);
        }

      
        
        $validator = Validator::make($request->all(), [
            'name' => 'require',
            'training_room' => 'required',
            'capacity'=>'required',
            'time'=>'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $training = Training::create([
            'name'=>$request->name,
            'training_room'=>$request->training_room,
            'capacity'=>$request->capacity,
            'time'=>$request->date
        ]);

        //return response()->json(['success' => true, 'message' => 'Book saved!', new TrainingResource($training)]);

        return response()->json($training);
    }
*/


//ovo je funkcija sa snimka

public function store(Request $request)
{
    //i ovi dodatni uslovi rade, nzm sto facades nece da radi
    $logged_user = auth()->user();
      if($logged_user->user_role == 'admin'){
    $request->validate([
        'name'=>'required|string|max:50',
        'training_room'=> 'required|string|max:50',
        'capacity' => 'required',
        'time' => 'required'
    ]);

    $training = Training::create([
        'name'=> $request->name,
        'training_room'=> $request->training_room,
        'capacity'=> $request->capacity,
        'time'=> $request->time

    ]);

    return response()->json($training);
   }
   return response()->json('You do not have permission for that action!');
}

public function update(Request $request, Training $training)
{
    $logged_user = auth()->user();
      if($logged_user->user_role == 'admin'){
    $request->validate([
        'name'=>'required|string|max:50',
        'training_room'=> 'required|string|max:50',
        'capacity' => 'required',
        'time' => 'required'
    ]);

    $training->update([
        'name'=> $request->name,
        'training_room'=> $request->training_room,
        'capacity'=> $request->capacity,
        'time'=> $request->time

    ]);

    return response()->json($training);
}
return response()->json('You do not have permission for that action!');
}

/*
    public function update($id, Request $request)
    {
        $logged_user = auth()->user();
        $user_role=UserRole::find($logged_user->id_role);

        if($user_role->role_name != 'user') {
            return response()->json(['You do not have premission fro that action!']);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'training_room' => 'required|string|max:20',
            'capacity'=>'required|integer',
            'time'=>'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        } 

        $training = Training::find($id);

        $training->name = $request->name;
        $training->training_room = $request->training_room;
        $training->capacity = $request->capacity;
        $training->time = $request->time;

        $training->save();

        return response()->json(['success' => true, 'message' => 'Book updated.', new TrainingResource($training)]);


    }

*/

public function destroy(Training $training)
{

    $logged_user = auth()->user();
      if($logged_user->user_role == 'admin'){
    $training -> delete();
    return response()->json();
      }

      return response()->json('You do not have permission for that action!');

}
/*
    public function destroy($id)
    {
        $logged_user = auth()->user();
        $user_role=UserRole::find($logged_user->id_role);

        if($user_role->role_name!='user') {
            return response()->json(['You do not have premission for that action!']);
        }

        $training = Training::find($id);

        $training->delete();

        return response()->json(['Training deleted!']);

    }
*/

 public function show(int $id)
    {
        $training = Training::find($id);
        return new TrainingResource($training);
    }
/*
    public function makeReservation($id)
    {

        $training = Training::find($id);
        $stanje_pre = $training->capacity;

        $training->update([
            'name'=> $training->name,
            'training_room'=> $training->training_room,
            'capacity'=> $training->capacity - 1,
            'time'=> $training->time
    
        ]);

/*
         $training1 = Training::find($training->id);

         $training1->update([
            'name'=> $training->name,
            'training_room'=> $training->training_room,
            'capacity'=> $training->capacity - 1,
            'time'=> $training->time
    
        ]);

        if($stanje_pre > $training->capacity){
            return response()->json(['success'=>'true', 'new_capacity'=>$training->capacity, 'stanje_pre'=> $stanje_pre]);

        }else{
            return response()->json(['success'=>'false', 'new_capacity'=>$training->capacity, 'stanje_pre'=> $stanje_pre]);
        }



    }

   */

}
