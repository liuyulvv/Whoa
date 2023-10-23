import { Mesh as BabylonMesh, BoundingInfo, MeshBuilder, Scene, SceneLoader, Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';
import { GridMaterial } from '@babylonjs/materials';
import Mesh from './Mesh';

export default class MeshManager {
    private builder = MeshBuilder;
    private scene: Scene;
    private meshes: Map<string, Mesh>;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.meshes = new Map<string, Mesh>();
    }

    public destroyMeshByID(meshID: string): void {
        const mesh = this.meshes.get(meshID);
        if (mesh) {
            mesh.destroy();
            this.meshes.delete(meshID);
        }
    }

    public getMeshByID(meshID: string): Mesh | undefined {
        return this.meshes.get(meshID);
    }

    public createGround(): BabylonMesh {
        const meshID = 'ground';
        const babylonMesh = MeshBuilder.CreatePlane(meshID, { width: 100, height: 100 }, this.scene);
        babylonMesh.rotate(new Vector3(1, 0, 0), Math.PI);
        babylonMesh.isPickable = false;
        const babylonMaterial = new GridMaterial(meshID, this.scene);
        babylonMaterial.majorUnitFrequency = 5;
        babylonMaterial.minorUnitVisibility = 0.5;
        babylonMaterial.gridRatio = 1;
        babylonMaterial.useMaxLine = true;
        babylonMaterial.opacity = 0.99;
        babylonMesh.material = babylonMaterial;
        const mesh = new Mesh(meshID, babylonMesh);
        this.meshes.set(mesh.id, mesh);
        // const axes = new AxesViewer(this.scene);
        // axes.xAxis.parent = babylonMesh;
        // axes.xAxis.parent = babylonMesh;
        // axes.xAxis.parent = babylonMesh;
        return babylonMesh;
    }

    public createBox(meshID: string): Mesh {
        const babylonMesh = this.builder.CreateBox(meshID, {}, this.scene);
        const mesh = new Mesh(meshID, babylonMesh);
        this.meshes.set(mesh.id, mesh);
        return mesh;
    }

    public importMeshAsync(baseURL: string, meshName: string, entityID: string) {
        return SceneLoader.ImportMeshAsync('', baseURL, meshName, this.scene).then((result) => {
            const meshes: Mesh[] = [];
            result.meshes.forEach((mesh) => {
                mesh.id = entityID;
                const childMeshes = mesh.getChildMeshes();
                if (childMeshes.length > 0) {
                    let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
                    let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
                    for (let i = 0; i < childMeshes.length; i++) {
                        const meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
                        const meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
                        min = Vector3.Minimize(min, meshMin);
                        max = Vector3.Maximize(max, meshMax);
                    }
                    mesh.setBoundingInfo(new BoundingInfo(min, max));
                    meshes.push(new Mesh(entityID, mesh as BabylonMesh));
                }
            });
            return meshes;
        });
    }
}
