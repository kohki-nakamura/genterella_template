@extends('admin.layouts.app')

{{-- @section('title')
    @if (!empty($company))
        {{$company->name}}の編集
    @else
        ユーザ新規作成
    @endif
@endsection --}}

@section('action')
    @if (!empty($company))
    <div class="form-group pull-right">
    {{ Form::open(['route' => ['admin.companies.destroy', $company->id], 'method' => 'delete', 'class'=>'form-horizontal form-label-left',
                   'onsubmit' => 'if (confirm("このユーザを削除します。よろしいですか？")) { return true; } else { return false; }']) }}
        <button type="submit" class="btn btn-danger">
            <i class="fa fa-trash"></i> 削除
        </button>
    {{ Form::close() }}
    </div>
    @endif
@endsection

@section('breadcrumbs')
  @if (!empty($company))
    {!!  Breadcrumbs::render('companies.edit', $company)  !!}
  @else
    {!!  Breadcrumbs::render('companies.create')  !!}
  @endif
@endsection

@section('content')
    <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
            @if (!empty($company))
            {{ Form::open(['route'=>['admin.companies.update', $company->id],'method' => 'patch','class'=>'form-horizontal form-label-left']) }}
            @else
            {{ Form::open(['route'=>['admin.companies.store'],'method' => 'post','class'=>'form-horizontal form-label-left']) }}
            @endif


            @if (!empty($company))
                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="id" >
                        ID<span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input id="id" type="text" class="form-control col-md-7 col-xs-12 @if($errors->has('id')) parsley-error @endif"
                               name="id" disabled="disabled" required>
                        @if($errors->has('id'))
                            <ul class="parsley-errors-list filled">
                                @foreach($errors->get('id') as $error)
                                        <li class="parsley-required">{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </div>
            @endif

                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name" >
                        会社名
                        <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input id="name" type="text" class="form-control col-md-7 col-xs-12 @if($errors->has('name')) parsley-error @endif"
                               name="name" maxlength='50' required>
                        @if ($errors->has('name'))
                            <ul class="parsley-errors-list filled">
                                @foreach ($errors->get('name') as $error)
                                        <li class="parsley-required">{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif
                        <p class="help-block">※最大50文字</p>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="name_kana">
                        会社名カナ
                        <span class="required">*</span>
                    </label>
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <input id="name_kana" type="name_kana" class="form-control col-md-7 col-xs-12 @if($errors->has('name_kana')) parsley-error @endif"
                               name="name_kana" maxlength='100' required>
                        @if ($errors->has('name_kana'))
                            <ul class="parsley-errors-list filled">
                                @foreach ($errors->get('name_kana') as $error)
                                    <li class="parsley-required">{{ $error }}</li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                        <a class="btn btn-primary" href="{{ URL::previous() }}">キャンセル</a>
                        <button type="submit" class="btn btn-success">保存</button>
                    </div>
                </div>
            {{ Form::close() }}
        </div>
    </div>
@endsection

@section('styles')
    @parent
    {{-- {{ Html::style(mix('assets/admin/css/companies/edit.css')) }} --}}
@endsection

@section('scripts')
    @parent
    {{-- {{ Html::script(mix('assets/admin/js/companies/edit.js')) }} --}}
@endsection
