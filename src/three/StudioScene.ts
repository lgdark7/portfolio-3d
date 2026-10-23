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

  // Mobile Touch Gestures & Momentum Tracking
  private isTouching: boolean = false;
  private isTouchDrag: boolean = false;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchLastY: number = 0;
  private touchStartTime: number = 0;
  private touchProgressStart: number = 0;
  private touchVelocityY: number = 0;
  private lastTouchMoveTime: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene
    this.scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Renderer with high-performance settings (Initialized FIRST before projection update)
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

    // 3. Camera with responsive FOV (portrait phones need wider vertical FOV)
    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 40);
    this.updateCameraProjection(width, height);

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

  private updateCameraProjection(width: number, height: number) {
    if (!this.camera) return;
    const aspect = width / height;
    this.camera.aspect = aspect;

    // Mobile Responsive FOV:
    // On vertical smartphone screens (aspect 0.45 - 0.65), a 44° FOV cuts off the sides of the room.
    // Dynamically expand FOV so the room, character, desk, and lighting are completely visible.
    if (aspect < 0.6) {
      this.camera.fov = 68; // Vertical phone portrait (e.g. iPhone, Android)
    } else if (aspect < 0.85) {
      this.camera.fov = 58; // Tablet / Foldable portrait
    } else if (aspect < 1.1) {
      this.camera.fov = 50; // Square / small landscape
    } else {
      this.camera.fov = 44; // Standard desktop widescreen
    }

    this.camera.updateProjectionMatrix();
    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }

  private bindEvents() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('click', this.onClick);
    window.addEventListener('wheel', this.onWheel, { passive: false });

    // Touch event listeners for mobile devices
    this.container.addEventListener('touchstart', this.onTouchStart, { passive: false });
    window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    window.addEventListener('touchend', this.onTouchEnd, { passive: false });
    window.addEventListener('touchcancel', this.onTouchCancel, { passive: false });
  }

  private onResize = () => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.updateCameraProjection(width, height);
  };

  private onTouchStart = (e: TouchEvent) => {
    // If a modal is open, let the user scroll modal text naturally
    if (usePortfolioStore.getState().activeModal) return;
    if (e.touches.length !== 1) return;

    const touch = e.touches[0];
    this.isTouching = true;
    this.isTouchDrag = false;
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.touchLastY = touch.clientY;
    this.touchStartTime = performance.now();
    this.lastTouchMoveTime = this.touchStartTime;
    this.touchVelocityY = 0;
    this.touchProgressStart = usePortfolioStore.getState().scrollProgress;

    // Update pointer coordinates immediately so tap raycasting knows the exact position
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
  };

  private onTouchMove = (e: TouchEvent) => {
    if (usePortfolioStore.getState().activeModal) return;
    if (!this.isTouching || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = this.touchStartY - touch.clientY; // swipe up = positive = move forward
    const dist = Math.hypot(deltaX, touch.clientY - this.touchStartY);

    if (dist > 8) {
      this.isTouchDrag = true;
    }

    if (this.isTouchDrag) {
      // Prevent browser default pull-to-refresh and window bouncing
      if (e.cancelable) e.preventDefault();

      const now = performance.now();
      const dt = Math.max(1, now - this.lastTouchMoveTime);
      this.touchVelocityY = (this.touchLastY - touch.clientY) / dt;
      this.lastTouchMoveTime = now;
      this.touchLastY = touch.clientY;

      // Sensitivity: 240px vertical drag advances 1 full station smoothly
      const progressDelta = deltaY / 240;
      const target = Math.max(0, Math.min(5, this.touchProgressStart + progressDelta));
      usePortfolioStore.getState().setScrollProgress(target);

      // Subtle parallax on mobile drag
      this.mouseOffset.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouseOffset.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  };

  private onTouchEnd = (_e: TouchEvent) => {
    if (usePortfolioStore.getState().activeModal) {
      this.isTouching = false;
      return;
    }
    if (!this.isTouching) return;
    this.isTouching = false;

    const now = performance.now();
    const touchDuration = now - this.touchStartTime;

    if (!this.isTouchDrag && touchDuration < 350) {
      // Clean tap! Trigger 3D raycast interaction at tapped coordinate
      this.triggerInteractionAt(this.pointer);
    } else if (this.isTouchDrag) {
      // Swipe with velocity: check if user flicked up or down
      const current = usePortfolioStore.getState().scrollProgress;
      if (this.touchVelocityY > 0.45) {
        // Flicked UP -> advance to next station
        const nextStation = Math.min(5, Math.floor(current + 1));
        usePortfolioStore.getState().setScrollProgress(nextStation);
      } else if (this.touchVelocityY < -0.45) {
        // Flicked DOWN -> back to previous station
        const prevStation = Math.max(0, Math.ceil(current - 1));
        usePortfolioStore.getState().setScrollProgress(prevStation);
      } else {
        // Snap gently to nearest station if close
        const nearest = Math.round(current);
        if (Math.abs(current - nearest) < 0.28) {
          usePortfolioStore.getState().setScrollProgress(nearest);
        }
      }
    }
  };

  private onTouchCancel = () => {
    this.isTouching = false;
    this.isTouchDrag = false;
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

  private triggerInteractionAt(coords: THREE.Vector2) {
    if (usePortfolioStore.getState().activeModal) return;

    this.raycaster.setFromCamera(coords, this.camera);

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
  }

  private onClick = (_e: MouseEvent) => {
    this.triggerInteractionAt(this.pointer);
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

    this.container.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchcancel', this.onTouchCancel);

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
