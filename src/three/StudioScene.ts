import * as THREE from 'three';
import { StudioRoom } from './StudioRoom';
import { Avatar3D } from './Avatar3D';
import { SpatialCompass } from './SpatialCompass';
import { CameraRail } from './CameraRail';
import { LightingSystem } from './LightingSystem';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { soundFX } from '../audio/soundFX';

export class StudioScene {
  public container: HTMLElement;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  public room: StudioRoom;
  public avatar: Avatar3D;
  public compass: SpatialCompass;
  public cameraRail: CameraRail;
  public lighting: LightingSystem;

  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2;
  private mouseOffset: THREE.Vector2;
  private animFrameId: number = 0;
  private lastTime: number = 0;
  private isDestroyed: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 40);

    // 3. Renderer with high-performance settings
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    // 4. Build 3D Entities
    this.lighting = new LightingSystem(this.scene);
    this.room = new StudioRoom();
    this.scene.add(this.room.group);

    this.avatar = new Avatar3D();
    this.avatar.group.position.set(0, 0, 0.8);
    this.scene.add(this.avatar.group);

    this.compass = new SpatialCompass();
    this.scene.add(this.compass.group);

    this.cameraRail = new CameraRail();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(-1000, -1000);
    this.mouseOffset = new THREE.Vector2(0, 0);

    // 5. Event Listeners
    this.bindEvents();

    // 6. Start Loop
    this.lastTime = performance.now();
    this.animate();
  }

  private bindEvents() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('click', this.onClick);
    window.addEventListener('wheel', this.onWheel, { passive: false });
  }

  private onResize = () => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onPointerMove = (e: PointerEvent) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.mouseOffset.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseOffset.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.checkRaycastHover();
  };

  private checkRaycastHover() {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const interactiveList = [
      ...this.room.interactiveObjects,
      ...this.avatar.interactiveObjects,
      ...this.compass.interactiveObjects
    ];

    const intersects = this.raycaster.intersectObjects(interactiveList, true);

    if (intersects.length > 0) {
      let topHit: THREE.Object3D | null = intersects[0].object;
      while (topHit && !topHit.userData?.interactive) {
        topHit = topHit.parent;
      }

      if (topHit && topHit.userData?.interactive) {
        this.renderer.domElement.style.cursor = 'pointer';
        usePortfolioStore.getState().setHoveredObject(topHit.userData.label || topHit.name);
        return;
      }
    }

    this.renderer.domElement.style.cursor = 'default';
    usePortfolioStore.getState().setHoveredObject(null);
  }

  private onClick = (e: MouseEvent) => {
    // If a modal is open, let standard DOM events handle it
    if (usePortfolioStore.getState().activeModal) return;

    this.raycaster.setFromCamera(this.pointer, this.camera);

    const interactiveList = [
      ...this.room.interactiveObjects,
      ...this.avatar.interactiveObjects,
      ...this.compass.interactiveObjects
    ];

    const intersects = this.raycaster.intersectObjects(interactiveList, true);

    if (intersects.length > 0) {
      let topHit: THREE.Object3D | null = intersects[0].object;
      while (topHit && !topHit.userData?.interactive) {
        topHit = topHit.parent;
      }

      if (topHit && topHit.userData) {
        const id = topHit.userData.id;
        const store = usePortfolioStore.getState();

        if (id === 'lamp-toggle') {
          store.toggleLightingMode();
        } else if (id === 'hub') {
          soundFX.playUiBlip(720);
          store.openModal('hub');
        } else if (id === 'web') {
          soundFX.playUiBlip(600);
          store.openModal('web');
        } else if (id === 'art') {
          soundFX.playUiBlip(640);
          store.openModal('art');
        } else if (id === 'about') {
          soundFX.playDrawerSlide();
          store.openModal('about');
        } else if (id === 'thoughts') {
          soundFX.playUiBlip(560);
          store.openModal('thoughts');
        } else if (id === 'archive') {
          soundFX.playUiBlip(680);
          store.openModal('archive');
        } else if (id === 'cat') {
          soundFX.playCatPurr();
          this.room.drawMonitorScreen('PURRR! ^._.^', 'You petted the studio cat!');
        } else if (id === 'coffee') {
          soundFX.playUiBlip(680);
          this.room.drawMonitorScreen('HOT COFFEE ☕', 'Pour-over freshly brewed.');
        } else if (typeof topHit.userData.stationIndex === 'number') {
          // Direct compass node navigation
          soundFX.playCameraWhoosh();
          store.setScrollProgress(topHit.userData.stationIndex);
        }
      }
    }
  };

  private onWheel = (e: WheelEvent) => {
    // If modal is open, allow modal content to scroll without shifting 3D scene
    if (usePortfolioStore.getState().activeModal) return;

    e.preventDefault();
    const delta = e.deltaY * 0.0022;
    const current = usePortfolioStore.getState().scrollProgress;
    const target = current + delta;
    usePortfolioStore.getState().setScrollProgress(target);
  };

  private animate = () => {
    if (this.isDestroyed) return;

    this.animFrameId = requestAnimationFrame(this.animate);

    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;
    const totalTime = currentTime * 0.001;

    const store = usePortfolioStore.getState();
    const progress = store.scrollProgress;

    // Update Lighting
    this.lighting.setMode(store.lightingMode);
    this.lighting.update(this.scene, this.room.lampLight, this.room.lampBulbMesh, deltaTime);

    // Update 3D Camera Rail
    this.cameraRail.update(this.camera, progress, this.mouseOffset, deltaTime);

    // Update Avatar Breathing and Head Cursor Tracking
    this.avatar.update(totalTime, this.mouseOffset);

    // Update Studio Room details (cat tail, steam particles)
    this.room.update(totalTime);

    // Update 3D Spatial Compass
    this.compass.update(progress, totalTime);

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  };

  public dispose() {
    this.isDestroyed = true;
    cancelAnimationFrame(this.animFrameId);

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('wheel', this.onWheel);

    // Traverse and dispose geometries and materials
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
      }
    });

    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
