cd wasm
$build_exist = Test-Path build
if (! $build_exist) {
    mkdir build
}
cd build
../emsdk/emsdk.ps1 activate latest
emcmake cmake .. -G Ninja
ninja
cd ../