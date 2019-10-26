<?php

namespace App\Http\Controllers\User;


use App\Models\User\UserDashboardConfig;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class UserDashboardConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('config.index-dashboard');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function show(UserDashboardConfig $userDashboardConfig)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function edit(UserDashboardConfig $userDashboardConfig)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserDashboardConfig $userDashboardConfig)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User\UserDashboardConfig  $userDashboardConfig
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserDashboardConfig $userDashboardConfig)
    {
        //
    }
}
