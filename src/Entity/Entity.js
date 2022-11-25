import { vec3 } from "../utils/math/index.js";

class Entity {
    constructor(hitboxes, {
        eyePos = [
            (hitboxes.min[0] + hitboxes.min[0]) / 2,
            (hitboxes.min[1] + hitboxes.min[1]) / 2,
            (hitboxes.min[2] + hitboxes.min[2]) / 2
        ],
        pitch = 0, yaw = 0,
        position = [0, 0, 0],
        world = null,
        controller = null,
        camera = null,
    } = {}) {
        this.moveSpeed = 0;
        this.gravityAcceleration = 0;
        this.position = vec3.create(...position);
        this.pitch = pitch; // 垂直角 始于xz平面 以y+为正方向 弧度制
        this.yaw = yaw;   // 水平角 始于z- 以x-为正方向 弧度制
        this.hitboxes = hitboxes;
        this.eyePos = vec3.create(...eyePos);
        this.forward = vec3.create();
        this.direction = vec3.create();
        this.model = null;
        this.setWorld(world);
        this.setCamera(camera);
        this.setController(controller);
    };
    getEyePosition() {
        return vec3.add(this.eyePos, this.position);
    };
    getGloBox() {
        return {
            min: vec3.add(this.hitboxes.min, this.position),
            max: vec3.add(this.hitboxes.max, this.position)
        };
    };
    getDirection(scale = 1) {
        return vec3(this.direction)
            .create(0, 0, -scale)
            .rotateX(this.pitch)
            .rotateY(this.yaw).res;
    };
    setCamera(camera = null) {
        if (camera === this.camera) return;
        if (this.camera) this.camera.bindEntity(null);
        this.camera = camera;
        if (camera) camera.bindEntity(this);
    };
    setController(controller = null) {
        if (controller === this.controller) return;
        if (this.controller) this.controller.setEntity(null);
        this.controller = controller;
        if (controller) controller.setEntity(this);
    };
    setWorld(world = null) {
        this.world = world;
    };
    update(dt) {};
};

export {
    Entity,
    Entity as default
};
