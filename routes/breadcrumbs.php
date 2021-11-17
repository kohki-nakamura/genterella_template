<?php

// Home
Breadcrumbs::register('home', function ($breadcrumbs) {
    $breadcrumbs->push('Home', route('admin.dashboard'));
});

// Home > 会社管理
Breadcrumbs::register('companies', function ($breadcrumbs) {
    $breadcrumbs->parent('home');
    $breadcrumbs->push('会社管理', route('admin.companies.index'));
});
// Home > 会社管理 > [Company]の編集
Breadcrumbs::register('companies.edit', function ($breadcrumbs, $company) {
    $breadcrumbs->parent('companies');
    $breadcrumbs->push("[" . $company->display_name . "]の編集", route('admin.companies.edit', $company->id));
});
// Home > 会社管理 > 会社の追加
Breadcrumbs::register('companies.create', function ($breadcrumbs) {
    $breadcrumbs->parent('companies');
    $breadcrumbs->push("会社の追加", route('admin.companies.create'));
});