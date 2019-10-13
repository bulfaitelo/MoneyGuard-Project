<?php

// Home
Breadcrumbs::for('home', function ($trail) {
    $trail->push('Home', route('home'));
});



// Home > Ativos dashborard
Breadcrumbs::for('ativos.dashboard.index', function ($trail) {
    $trail->parent('home');
    $trail->push('Ativos', route('ativos.dashboard.index'));
});

// Home > Ativos Analitico
Breadcrumbs::for('ativos.analitico.index', function ($trail) {   
    $trail->parent('ativos.dashboard.index');
    $trail->push('Analítico', route('ativos.analitico.index'));
});

// Home > Ativos Analitico / detalhes
Breadcrumbs::for('ativos.analitico.show', function ($trail) {
    $trail->parent('ativos.analitico.index');
    $trail->push('Detalhes');    
});

// Home > Ativos Analitico
Breadcrumbs::for('ativos.protocolos.index', function ($trail) {   
    $trail->parent('ativos.dashboard.index');
    $trail->push('Protocolos', route('ativos.analitico.index'));
});

// Home > Ativos Analitico / detalhes
Breadcrumbs::for('ativos.protocolos.show', function ($trail) {
    $trail->parent('ativos.protocolos.index');
    $trail->push('Detalhes');    
});

// Home > Ativos Analitico / Editar
Breadcrumbs::for('ativos.protocolos.edit', function ($trail) {
    $trail->parent('ativos.protocolos.index');
    $trail->push('Editar');    
});

// HOME > precos 
Breadcrumbs::for('ativos.precos.index', function ($trail) {
    $trail->parent('ativos.dashboard.index');
    $trail->push('Preços', route('ativos.precos.index'));
});


// HOME > precos > detalhes
Breadcrumbs::for('ativos.precos.show', function ($trail) {
    $trail->parent('ativos.dashboard.index');
    $trail->push('Detalhes');
});








// Home > Parametros
Breadcrumbs::for('titulo.index', function ($trail) {
    $trail->parent('home');
    $trail->push('Titulos', route('titulo.index'));
});
// 
Breadcrumbs::for('titulo.edit', function ($trail) {
    $trail->parent('home');
    $trail->push('Titulos', route('titulo.index'));
    $trail->push('Editar');
});


// Home > LOGS
Breadcrumbs::for('logs.import', function ($trail) {
    $trail->parent('home');
    $trail->push('Logs', route('logs.import'));
});

