<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Crud;

class DataController extends Controller
{
    public function storeData(Request $request)
    {
        $data = new Crud();
        $data->name = $request->name;
        $data->country= $request->country;
        $data->age = $request->age;
        $data->profession = $request->profession;
        $data->save();
        return $data;
    }
    public function showData() {
		$data = Crud::all ();
		return $data;
	}
	public function deleteData(Request $request) {
		$data = Crud::find ( $request->id )->delete ();
	}
	public function editData(Request $request, $id){
	
		$data =Crud::where('id', $id)->first();

        $data->name = $request->get('name');
		$data->age = $request->get('age');
		$data->country= $request->get('country');
		$data->profession = $request->get('profession');
		$data->save();
		return $data;
	}
}