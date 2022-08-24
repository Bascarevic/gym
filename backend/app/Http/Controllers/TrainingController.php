<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrainingCollection;
use App\Http\Resources\TrainingResource;
use App\Models\Reservation;
use App\Models\Training;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    
public function store(Request $request)
{
   
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



public function destroy(Training $training)
{

    $logged_user = auth()->user();
      if($logged_user->user_role == 'admin'){

        //Reservation::where('training_id', $training->id)->delete();
        DB::table('reservations')->where('id_training', '=', $training->id)->delete();

        $training -> delete();
        return response()->json();
      }

      return response()->json('You do not have permission for that action!');

}


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
