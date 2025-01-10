'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var useMotionValue = require('./use-motion-value-4144a8cf.js');
var React = require('react');
var popmotion = require('popmotion');
var three = require('three');
var mergeRefs = require('react-merge-refs');
var fiber = require('@react-three/fiber');
var heyListen = require('hey-listen');
require('framesync');
require('style-value-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultLegacy(mergeRefs);

function useHover(isStatic, _a, visualElement) {
    var whileHover = _a.whileHover, onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, onPointerOver = _a.onPointerOver, onPointerOut = _a.onPointerOut;
    var isHoverEnabled = whileHover || onHoverStart || onHoverEnd;
    if (isStatic || !visualElement || !isHoverEnabled)
        return {};
    return {
        onPointerOver: function (event) {
            var _a;
            (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(useMotionValue.AnimationType.Hover, true);
            onPointerOver === null || onPointerOver === void 0 ? void 0 : onPointerOver(event);
        },
        onPointerOut: function (event) {
            var _a;
            (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(useMotionValue.AnimationType.Hover, false);
            onPointerOut === null || onPointerOut === void 0 ? void 0 : onPointerOut(event);
        },
    };
}

function useTap(isStatic, _a, visualElement) {
    var whileTap = _a.whileTap, onTapStart = _a.onTapStart, onTap = _a.onTap, onTapCancel = _a.onTapCancel, onPointerDown = _a.onPointerDown;
    var isTapEnabled = onTap || onTapStart || onTapCancel || whileTap;
    var isPressing = React.useRef(false);
    var cancelPointerEndListeners = React.useRef(null);
    if (isStatic || !visualElement || !isTapEnabled)
        return {};
    function removePointerEndListener() {
        var _a;
        (_a = cancelPointerEndListeners.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEndListeners);
        cancelPointerEndListeners.current = null;
    }
    function checkPointerEnd() {
        var _a;
        removePointerEndListener();
        isPressing.current = false;
        (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(useMotionValue.AnimationType.Tap, false);
        return !useMotionValue.isDragActive();
    }
    function onPointerUp(event, info) {
        if (!checkPointerEnd())
            return;
        /**
         * We only count this as a tap gesture if the event.target is the same
         * as, or a child of, this component's element
         */
        onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
    }
    function onPointerCancel(event, info) {
        if (!checkPointerEnd())
            return;
        onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
    }
    return {
        onPointerDown: useMotionValue.wrapHandler(function (event, info) {
            var _a;
            removePointerEndListener();
            if (isPressing.current)
                return;
            isPressing.current = true;
            cancelPointerEndListeners.current = popmotion.pipe(useMotionValue.addPointerEvent(window, "pointerup", onPointerUp), useMotionValue.addPointerEvent(window, "pointercancel", onPointerCancel));
            (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(useMotionValue.AnimationType.Tap, true);
            onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown(event);
            onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
        }, true),
    };
}

var useRender = function (Component, props, _projectionId, ref, _state, isStatic, visualElement) {
    return React.createElement(Component, tslib.__assign(tslib.__assign(tslib.__assign(tslib.__assign({ ref: ref }, useMotionValue.filterProps(props, false, false)), { onUpdate: props.onInstanceUpdate }), useHover(isStatic, props, visualElement)), useTap(isStatic, props, visualElement)));
};

var setVector = function (name, defaultValue) {
    return function (i) {
        return function (instance, value) {
            var _a;
            (_a = instance[name]) !== null && _a !== void 0 ? _a : (instance[name] = new three.Vector3(defaultValue));
            var vector = instance[name];
            vector.setComponent(i, value);
        };
    };
};
var setEuler = function (name, defaultValue) {
    return function (axis) {
        return function (instance, value) {
            var _a;
            (_a = instance[name]) !== null && _a !== void 0 ? _a : (instance[name] = new three.Euler(defaultValue));
            var euler = instance[name];
            euler[axis] = value;
        };
    };
};
var setColor = function (name) { return function (instance, value) {
    var _a;
    (_a = instance[name]) !== null && _a !== void 0 ? _a : (instance[name] = new three.Color(value));
    instance[name].set(value);
}; };
var setScale = setVector("scale", 1);
var setPosition = setVector("position", 0);
var setRotation = setEuler("rotation", 0);
var setters = {
    x: setPosition(0),
    y: setPosition(1),
    z: setPosition(2),
    scale: function (instance, value) {
        var _a;
        (_a = instance.scale) !== null && _a !== void 0 ? _a : (instance.scale = new three.Vector3(1));
        var scale = instance.scale;
        scale.set(value, value, value);
    },
    scaleX: setScale(0),
    scaleY: setScale(1),
    scaleZ: setScale(2),
    rotateX: setRotation("x"),
    rotateY: setRotation("y"),
    rotateZ: setRotation("z"),
    color: setColor("color"),
    specular: setColor("specular"),
};
function setThreeValue(instance, key, values) {
    if (setters[key]) {
        setters[key](instance, values[key]);
    }
    else {
        instance[key] = values[key];
    }
}

var readVector = function (name, defaultValue) {
    return function (axis) {
        return function (instance) {
            var value = instance[name];
            return value ? value[axis] : defaultValue;
        };
    };
};
var readPosition = readVector("position", 0);
var readScale = readVector("scale", 1);
var readRotation = readVector("rotation", 0);
var readers = {
    x: readPosition("x"),
    y: readPosition("y"),
    z: readPosition("z"),
    scale: readScale("x"),
    scaleX: readScale("x"),
    scaleY: readScale("y"),
    scaleZ: readScale("z"),
    rotateX: readRotation("x"),
    rotateY: readRotation("y"),
    rotateZ: readRotation("z"),
};
function readAnimatableValue(value) {
    if (value === undefined) {
        return;
    }
    else if (value instanceof three.Color) {
        return value.getStyle();
    }
    else {
        return value;
    }
}
function readThreeValue(instance, name) {
    var _a;
    return readers[name]
        ? readers[name](instance)
        : (_a = readAnimatableValue(instance[name])) !== null && _a !== void 0 ? _a : 0;
}

var axes = ["x", "y", "z"];
var valueMap = {
    "position-x": "x",
    "position-y": "y",
    "position-z": "z",
    "rotation-x": "rotateX",
    "rotation-y": "rotateY",
    "rotation-z": "rotateZ",
    "scale-x": "scaleX",
    "scale-y": "scaleY",
    "scale-z": "scaleZ",
};
var scrapeMotionValuesFromProps = function (props) {
    var motionValues = {};
    for (var key in props) {
        var prop = props[key];
        if (useMotionValue.isMotionValue(prop)) {
            motionValues[valueMap[key] || key] = prop;
        }
        else if (Array.isArray(prop)) {
            for (var i = 0; i < prop.length; i++) {
                var value = prop[i];
                if (useMotionValue.isMotionValue(value)) {
                    var name_1 = valueMap[key + "-" + axes[i]];
                    motionValues[name_1] = value;
                }
            }
        }
    }
    return motionValues;
};

var createRenderState = function () { return ({}); };
var threeVisualElement = useMotionValue.visualElement({
    treeType: "three",
    readValueFromInstance: readThreeValue,
    getBaseTarget: function () {
        return undefined;
    },
    sortNodePosition: function (a, b) {
        return a.id - b.id;
    },
    makeTargetAnimatable: function (element, _a) {
        _a.transition; var target = tslib.__rest(_a, ["transition"]);
        useMotionValue.checkTargetForNewValues(element, target, {});
        return target;
    },
    restoreTransform: function () { },
    resetTransform: function () { },
    removeValueFromRenderState: function (_key, _renderState) { },
    measureViewportBox: useMotionValue.createBox,
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
    build: function (_element, state, latestValues) {
        for (var key in latestValues) {
            state[key] = latestValues[key];
        }
    },
    render: function (instance, renderState) {
        for (var key in renderState) {
            setThreeValue(instance, key, renderState);
        }
    },
});
var createVisualElement = function (_, options) {
    return threeVisualElement(options);
};

var useVisualState = useMotionValue.makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps,
    createRenderState: createRenderState,
});
var preloadedFeatures = tslib.__assign({}, useMotionValue.animations);
function custom(Component) {
    return useMotionValue.createMotionComponent({
        Component: Component,
        preloadedFeatures: preloadedFeatures,
        useRender: useRender,
        useVisualState: useVisualState,
        createVisualElement: createVisualElement,
    });
}
var componentCache = new Map();
var motion = new Proxy(custom, {
    get: function (_, key) {
        !componentCache.has(key) && componentCache.set(key, custom(key));
        return componentCache.get(key);
    },
});

var MotionCanvasContext = React.createContext(undefined);

var devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1;
var calculateDpr = function (dpr) {
    return Array.isArray(dpr)
        ? popmotion.clamp(dpr[0], dpr[1], devicePixelRatio)
        : dpr || devicePixelRatio;
};
/**
 * This file contains a version of R3F's Canvas component that uses our projection
 * system for layout measurements instead of use-react-measure so we can keep the
 * projection and cameras in sync.
 *
 * https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/web/Canvas.tsx
 */
function Block(_a) {
    var set = _a.set;
    useMotionValue.useIsomorphicLayoutEffect(function () {
        set(new Promise(function () { return null; }));
        return function () { return set(false); };
    }, []);
    return null;
}
var ErrorBoundary = /** @class */ (function (_super) {
    tslib.__extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { error: false };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error) {
        this.props.set(error);
    };
    ErrorBoundary.prototype.render = function () {
        return this.state.error ? null : this.props.children;
    };
    ErrorBoundary.getDerivedStateFromError = function () { return ({ error: true }); };
    return ErrorBoundary;
}(React__namespace.Component));
function CanvasComponent(_a, forwardedRef) {
    var children = _a.children, fallback = _a.fallback, tabIndex = _a.tabIndex, id = _a.id, style = _a.style, className = _a.className, events = _a.events, props = tslib.__rest(_a, ["children", "fallback", "tabIndex", "id", "style", "className", "events"]);
    /**
     * Import existing contexts to pass through variants and MotionConfig from
     * the DOM to the 3D tree. Shared variants aren't officially supported yet
     * because the parent DOM tree fires effects before the 3D tree, whereas
     * variants are expected to run from bottom-up in useEffect.
     */
    var motionContext = React.useContext(useMotionValue.MotionContext);
    var configContext = React.useContext(useMotionValue.MotionConfigContext);
    var _b = tslib.__read(useMotionValue.useForceUpdate(), 1), forceRender = _b[0];
    var layoutCamera = React.useRef(null);
    var dimensions = React.useRef({
        size: { width: 0, height: 0 },
    });
    var _c = dimensions.current, size = _c.size, dpr = _c.dpr;
    var containerRef = React.useRef(null);
    var handleResize = function () {
        var container = containerRef.current;
        dimensions.current = {
            size: {
                width: container.offsetWidth,
                height: container.offsetHeight,
            },
        };
        forceRender();
    };
    // Set canvas size on mount
    React.useLayoutEffect(handleResize, []);
    var canvasRef = React__namespace.useRef(null);
    var _d = tslib.__read(React__namespace.useState(false), 2), block = _d[0], setBlock = _d[1];
    var _e = tslib.__read(React__namespace.useState(false), 2), error = _e[0], setError = _e[1];
    // Suspend this component if block is a promise (2nd run)
    if (block)
        throw block;
    // Throw exception outwards if anything within canvas throws
    if (error)
        throw error;
    // Only render the R3F tree once we have recorded dimensions for the canvas.
    if (size.width > 0 && size.height > 0) {
        fiber.render(React__namespace.createElement(ErrorBoundary, { set: setError },
            React__namespace.createElement(React__namespace.Suspense, { fallback: React__namespace.createElement(Block, { set: setBlock }) },
                React__namespace.createElement(MotionCanvasContext.Provider, { value: {
                        dimensions: dimensions,
                        layoutCamera: layoutCamera,
                        requestedDpr: calculateDpr(props.dpr),
                    } },
                    React__namespace.createElement(useMotionValue.MotionConfigContext.Provider, { value: configContext },
                        React__namespace.createElement(useMotionValue.MotionContext.Provider, { value: motionContext }, children))))), canvasRef.current, tslib.__assign(tslib.__assign({}, props), { dpr: dpr || props.dpr, size: size, events: events || fiber.events }));
    }
    useMotionValue.useIsomorphicLayoutEffect(function () {
        var container = canvasRef.current;
        return function () { return fiber.unmountComponentAtNode(container); };
    }, []);
    return (React__namespace.createElement("div", { ref: containerRef, id: id, className: className, tabIndex: tabIndex, style: tslib.__assign({ position: "relative", width: "100%", height: "100%", overflow: "hidden" }, style) },
        React__namespace.createElement("canvas", { ref: mergeRefs__default["default"]([canvasRef, forwardedRef]), style: { display: "block" } }, fallback)));
}
var MotionCanvas = React.forwardRef(CanvasComponent);

var calcBoxSize = function (_a) {
    var x = _a.x, y = _a.y;
    return ({
        width: useMotionValue.calcLength(x),
        height: useMotionValue.calcLength(y),
    });
};
function useLayoutCamera(_a, updateCamera) {
    var _b = _a.makeDefault, makeDefault = _b === void 0 ? true : _b;
    var context = React.useContext(MotionCanvasContext);
    heyListen.invariant(Boolean(context), "No MotionCanvas detected. Replace Canvas from @react-three/fiber with MotionCanvas from framer-motion.");
    var _c = context, dimensions = _c.dimensions, layoutCamera = _c.layoutCamera, requestedDpr = _c.requestedDpr;
    var advance = fiber.useThree(function (three) { return three.advance; });
    var set = fiber.useThree(function (three) { return three.set; });
    var camera = fiber.useThree(function (three) { return three.camera; });
    var size = fiber.useThree(function (three) { return three.size; });
    var gl = fiber.useThree(function (three) { return three.gl; });
    var parentVisualElement = useMotionValue.useVisualElementContext();
    var measuredLayoutSize = React.useRef();
    React.useLayoutEffect(function () {
        measuredLayoutSize.current = size;
        updateCamera(size);
        advance(performance.now());
        var projection = parentVisualElement === null || parentVisualElement === void 0 ? void 0 : parentVisualElement.projection;
        if (!projection)
            return;
        /**
         * When the projection of an element changes we want to update the camera
         * with the projected dimensions.
         */
        var removeProjectionUpdateListener = projection.addEventListener("projectionUpdate", function (newProjection) { return updateCamera(calcBoxSize(newProjection)); });
        /**
         * When the layout of an element changes we want to update the renderer
         * output to match the layout dimensions.
         */
        var removeLayoutMeasureListener = projection.addEventListener("measure", function (newLayout) {
            var newSize = calcBoxSize(newLayout);
            var dpr = requestedDpr;
            var _a = dimensions.current.size, width = _a.width, height = _a.height;
            var xScale = width / newSize.width;
            var yScale = height / newSize.height;
            var maxScale = Math.max(xScale, yScale);
            dpr = popmotion.clamp(0.75, 4, maxScale);
            dimensions.current = {
                size: { width: newSize.width, height: newSize.height },
                dpr: dpr,
            };
            gl.setSize(newSize.width, newSize.height);
            gl.setPixelRatio(dpr);
        });
        /**
         * When a projection animation completes we want to update the camera to
         * match the recorded layout of the element.
         */
        var removeAnimationCompleteListener = projection.addEventListener("animationComplete", function () {
            var actual = (projection.layout || {}).actual;
            if (actual) {
                setTimeout(function () {
                    var newSize = calcBoxSize(actual);
                    updateCamera(newSize);
                    dimensions.current = { size: newSize };
                    gl.setSize(newSize.width, newSize.height);
                    gl.setPixelRatio(requestedDpr);
                }, 50);
            }
        });
        return function () {
            removeProjectionUpdateListener();
            removeLayoutMeasureListener();
            removeAnimationCompleteListener();
        };
    }, []);
    React.useLayoutEffect(function () {
        var cam = layoutCamera.current;
        if (makeDefault && cam) {
            var oldCam_1 = camera;
            set(function () { return ({ camera: cam }); });
            return function () { return set(function () { return ({ camera: oldCam_1 }); }); };
        }
    }, [camera, layoutCamera, makeDefault, set]);
    return { size: size, camera: camera, cameraRef: layoutCamera };
}

/**
 * Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
 */
var LayoutCamera = React__namespace.forwardRef(function (props, ref) {
    var cameraRef = useLayoutCamera(props, function (size) {
        var cam = cameraRef.current;
        if (cam && !props.manual) {
            cam.aspect = size.width / size.height;
            cam.updateProjectionMatrix();
        }
    }).cameraRef;
    return (React__namespace.createElement(motion.perspectiveCamera, tslib.__assign({ ref: mergeRefs__default["default"]([cameraRef, ref]) }, props)));
});

var LayoutOrthographicCamera = React__namespace.forwardRef(function (props, ref) {
    var _a = useLayoutCamera(props, function (newSize) {
        var cam = cameraRef.current;
        if (cam) {
            cam.left = newSize.width / -2;
            cam.right = newSize.width / 2;
            cam.top = newSize.height / 2;
            cam.bottom = newSize.height / -2;
            cam.updateProjectionMatrix();
        }
    }), size = _a.size, cameraRef = _a.cameraRef;
    return (React__namespace.createElement(motion.orthographicCamera, tslib.__assign({ left: size.width / -2, right: size.width / 2, top: size.height / 2, bottom: size.height / -2, ref: mergeRefs__default["default"]([cameraRef, ref]) }, props)));
});

function useTime() {
    var time = useMotionValue.useMotionValue(0);
    fiber.useFrame(function (state) { return time.set(state.clock.getElapsedTime()); });
    return time;
}

exports.LayoutCamera = LayoutCamera;
exports.LayoutOrthographicCamera = LayoutOrthographicCamera;
exports.MotionCanvas = MotionCanvas;
exports.motion = motion;
exports.useTime = useTime;
