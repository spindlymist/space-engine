import {Engine, Entity, Vector2, Sprite, Polygon, RigidBody} from './engine/Engine.js';

import ParallaxBackground from './behaviors/ParallaxBackground.js';
import Player from './behaviors/Player.js';
import PolygonTest from './behaviors/PolygonTest.js';
import CameraFollow from './behaviors/CameraFollow.js';
import ShipBuilder from './behaviors/ShipBuilder.js';

let background = new Entity(new Vector2(0, 0));
background.addBehavior(new ParallaxBackground('./img/stars.gif', 1));
background.addBehavior(new ParallaxBackground('./img/stars.gif', 3));
background.addBehavior(new ParallaxBackground('./img/stars.gif', 6));
Engine.addEntity(background);

let player = new Entity(new Vector2(0, 0));
player.addBehavior(new Sprite('./img/player-ship.png'));
player.addBehavior(new Player());
player.addBehavior(new RigidBody());
player.addBehavior(new CameraFollow(player));
Engine.addEntity(player);

let planet = new Entity(new Vector2(-4, -4), 0, new Vector2(1, 1));
planet.addBehavior(new Sprite('./img/planet.png'));
Engine.addEntity(planet);

// let polygonTester = new Entity();
// let polygonTest = new PolygonTest(
//     new Polygon([
//         new Vector2(100, 100),
//         new Vector2(150, 60),
//         new Vector2(200, 100),
//         new Vector2(200, 140),
//         new Vector2(150, 180),
//         new Vector2(100, 140)
//     ])
// );
// polygonTester.addBehavior(polygonTest);
// Engine.addEntity(polygonTester);

// const shipbuilder = new Entity(new Vector2(0, 0));
// shipbuilder.addBehavior(new ShipBuilder());
// Engine.addEntity(shipbuilder);

window.addEventListener('load', Engine.startGame, false);
