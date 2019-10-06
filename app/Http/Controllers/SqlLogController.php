<?php

namespace App\Http\Controllers;

use App\Models\SqlLog;
use Illuminate\Http\Request;
use App\Models\ImportLog;

class SqlLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function importLog()
    {
        $logs = ImportLog::orderBy('created_at', 'DESC')
            ->paginate(30);             
        return view('logs.index_import', compact('logs'));
    }

    public function ShowimportLog(Request $request)
    {
        $log = ImportLog::find($request->id);    
              
        return view('logs.show_import', compact('log'));
    }

    public function backupLog()
    {
        $logs = SqlLog::orderBy('created_at', 'DESC')
            ->paginate(30);             
        return view('logs.index_backup', compact('logs'));
    }

    public function ShowbackupLog(Request $request)
    {
        $log = SqlLog::find($request->id);
        return view('logs.show_backup', compact('log'));
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
     * @param  \App\SqlLog  $sqlLog
     * @return \Illuminate\Http\Response
     */
    public function show(SqlLog $sqlLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\SqlLog  $sqlLog
     * @return \Illuminate\Http\Response
     */
    public function edit(SqlLog $sqlLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SqlLog  $sqlLog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SqlLog $sqlLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SqlLog  $sqlLog
     * @return \Illuminate\Http\Response
     */
    public function destroy(SqlLog $sqlLog)
    {
        //
    }

    /**
     * lista dodos os itens de log do dia em questão
     *

     * @return \Illuminate\Http\Response
     */
    public static function SidebarLog()
    {
        $hoje = now()->format('Y-m-d');
        $sqlLog = SqlLog::take(2)
            ->orderBy('created_at', 'DESC')
            ->get(); 


        $log = ImportLog::whereDate('created_at', $hoje)
            ->orderBy('created_at', 'DESC')
            ->get();
        
        $merged = $sqlLog->merge($log);
        return $merged;
    }



}
