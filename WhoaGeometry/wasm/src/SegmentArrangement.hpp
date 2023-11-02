#pragma once

/**
 * @file SegmentArrangement.hpp
 * @author liuyulvv (liuyulvv@outlook.com)
 * @date 2023-10-31
 */

#include <CGAL/Arr_non_caching_segment_traits_2.h>
#include <CGAL/Arrangement_2.h>
#include <CGAL/Cartesian.h>
#include <emscripten/bind.h>

#include <iostream>
#include <vector>

using namespace emscripten;

using Number_type = double;
using Kernel = CGAL::Cartesian<Number_type>;
using Traits = CGAL::Arr_non_caching_segment_traits_2<Kernel>;
using Point = Traits::Point_2;
using Segment = Traits::X_monotone_curve_2;
using Arrangement = CGAL::Arrangement_2<Traits>;

void SegmentArrangement(std::vector<double> points) {
    auto size = points.size();
    if (points.empty() || size % 2) {
        return;
    }
    Arrangement arr;
    std::vector<Point> cgal_points;
    size_t index = 0;
    while (index < size - 1) {
        cgal_points.push_back(Point(points[index], points[index + 1]));
        index += 2;
    }
    index = 0;
    size = cgal_points.size();
    std::vector<Segment> cgal_segments;
    while (index < size - 1) {
        cgal_segments.push_back(Segment(cgal_points[index], cgal_points[index + 1]));
        index += 2;
    }
    CGAL::insert(arr, cgal_segments.begin(), cgal_segments.end());
    std::cout << arr << std::endl;
}
