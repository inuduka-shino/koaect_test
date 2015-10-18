# koaect_test

koa + etc サンプル

## エントリポイント

+ ルートコンテンツ + ECTレンダリング  
  (http://localhost:3001/)
+ 単純レスポンス  
  (http://localhost:3001/hello)
+ オーバライド  
  (http://localhost:3001/hello/world)  
  `/hello` で、`yield next;`しないと流れてこない。
+ `koa-static`  
  (http://localhost:3001/static/test.html)
+ staticエントリのオーバライド  
  (http://localhost:3001/static/hello)
  `koa-static` も後ろに流してくれる。

## エラートラップ

+ Not Found (http://localhost:3001/no_contents)
+ exception (http://localhost:3001/error_test)

注意：statusも404/500になる。コンテンツはECTで作成。
