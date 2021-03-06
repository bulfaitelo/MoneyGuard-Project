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


// Home > LOGS
Breadcrumbs::for('logs.import', function ($trail) {
    $trail->parent('home');
    $trail->push('Importação', route('logs.import'));
});

// HOME > LOGS > DETALHES
Breadcrumbs::for('logs.import.show', function ($trail) {
    $trail->parent('logs.import');
    $trail->push('Detalhes');
});

// Home > BACKUP
Breadcrumbs::for('logs.backup', function ($trail) {
    $trail->parent('home');
    $trail->push('Backup', route('logs.backup'));
});

// HOME > BACKUP > DETALHES
Breadcrumbs::for('logs.backup.show', function ($trail) {
    $trail->parent('logs.backup');
    $trail->push('Detalhes');
});

// Home > Schedule
Breadcrumbs::for('schedule.index', function ($trail) {
    $trail->parent('home');
    $trail->push('Backup', route('schedule.index'));
});

// Vue test
Breadcrumbs::for('vue', function ($trail) {
    $trail->push('VUE', route('vue'));
});



/****
 * 
 * CONFIG
 * 
 ****/

    // CONFIG > INDEX
    Breadcrumbs::for('config.index', function ($trail) {
        $trail->push('Configurações', route('config.index'));
    });

    // Home > Parametros
    Breadcrumbs::for('config.titulo.index', function ($trail) {
        $trail->parent('config.index');
        $trail->push('Titulos', route('config.titulo.index'));
    });

    // Home > Parametros
    Breadcrumbs::for('config.representante.index', function ($trail) {
        $trail->parent('config.index');
        $trail->push('Representantes', route('config.representante.index'));
    });

    // Home > Parametros > Titulo
    Breadcrumbs::for('config.titulo.edit', function ($trail) {
        $trail->parent('config.index');
        $trail->push('Titulos', route('config.titulo.index'));
        $trail->push('Editar');
    });

    // Home > Parametros > Representantes
    Breadcrumbs::for('config.representante.edit', function ($trail) {
        $trail->parent('config.index');
        $trail->push('Representantes', route('config.representante.index'));
        $trail->push('Editar');
    });


// =========================


Breadcrumbs::for('config.dashboard.index', function ($trail) {
    $trail->parent('home');
    $trail->push('Configurações / Dashboard', route('config.dashboard.index'));
});