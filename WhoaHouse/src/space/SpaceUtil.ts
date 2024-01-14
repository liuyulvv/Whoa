import SpaceManager from './SpaceManager';

export default abstract class SpaceUtil {
    public static GetSpace(points: WhoaGeometrySpace.vector_string) {
        const vector_space = WhoaGeometrySpace.get_spaces(points);
        SpaceManager.Get().Clear();
        for (let i = 0; i < vector_space.size(); i++) {
            const space = vector_space.get(i);
            const points = space.vertices();
            const positions: WhoaMath.Vector3[] = [];
            for (let j = 0; j < points.size(); j++) {
                positions.push(new WhoaMath.Vector3(points.get(j).x(), points.get(j).y(), 0));
            }
            SpaceManager.Get().Create(positions);
        }
    }
}
