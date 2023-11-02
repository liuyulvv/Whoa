#include <emscripten/bind.h>

#include "SegmentArrangement.hpp"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(module) {
    function("SegmentArrangement", SegmentArrangement);
    register_vector<double>("VectorDouble");
}