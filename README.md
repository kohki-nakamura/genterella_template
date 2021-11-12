# バージョン
PHP 8.0.12 (cli) (built: Oct 22 2021 12:35:27) ( NTS )
Laravel Framework 8.69.0
Composer version 2.1.11 2021-11-02 12:10:25

# DockerでLravelを起動する

## Bashエイリアスを設定
```
echo "alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'" >>~/.bash_profile
source ~/.bash_profile
```
※ エイリアスを設定しない場合、以降のコマンドの`sail`を`vendor/bin/sail`に変更して実行してください。

## Dockerコンテナを起動
```
sail up
```
http://localhost:8000/ にアクセス

## Dockerコンテナをバックグラウンドで起動
```
sail up -d
```
http://localhost:8000/ にアクセス

## Dockerコンテナを停止
```
sail stop
```