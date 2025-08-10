import {
  VillageState,
  runRobot,
  routeRobot,
  goalOrientedRobot,
  findRoute,
  roadGraph,
} from "./07_robot.js";

export function runRobotCount(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(
      `Turn ${turn}: at ${state.place}, heading to ${
        action.direction
      }, memory = ${JSON.stringify(memory)}`
    );
    console.log(`Moved to ${action.direction}`);
  }
}

// 7.1 - Measuring a Robot
function compareRobots(robot1, memory1, robot2, memory2, trials = 100) {
  // Generate 100 tasks
  let tasks = [];
  for (let i = 0; i < trials; i++) {
    tasks.push(VillageState.random());
  }
  // Measure the performance of robot1 in turns over the 100 tasks
  let robot1Turns = 0,
    robot2Turns = 0;
  for (let task of tasks) {
    let robot1Turn = runRobotCount(task, robot1, memory1);
    robot1Turns += robot1Turn;
    let robot2Turn = runRobotCount(task, robot2, memory2);
    robot2Turns += robot2Turn;
  }
  const robot1Average = robot1Turns / trials;
  const robot2Average = robot2Turns / trials;
  //   console.log("test", robot1Average);
  console.log("test", robot1Average, robot2Average);
  return robot1Average < robot2Average ? robot1 : robot2;
}

// const efficientRobot = compareRobots(
//   routeRobot,
//   [],
//   goalOrientedRobot,
//   [],
//   500
// );
// console.log("efficientRobot", efficientRobot);

// 7.2 - Robot Efficiency

export function moreEfficientRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[pickParcel(place, parcels)];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function pickParcel(place, parcels) {
  let shortestParcelIndex = 0,
    shortestParcelLength = Infinity;
  for (let i = 0; i < parcels.length; i++) {
    // Use findRoute to calculate the distance
    let parcel = parcels[i];
    // DEBUG
    console.log("parcelTest", parcel);
    let route = findRoute(roadGraph, place, parcel.address);
    const currentRoute = findRoute(
      roadGraph,
      parcels[shortestParcelIndex].place,
      parcels[shortestParcelIndex].address
    );
    if (route.length < shortestParcelLength) {
      shortestParcelLength = route.length;
      shortestParcelIndex = i;
    }
  }
  return shortestParcelIndex;
}

// const efficienterRobot = compareRobots(
//   moreEfficientRobot,
//   [],
//   goalOrientedRobot,
//   [],
//   100
// );
// console.log("efficienterRobot", efficienterRobot);

function pickupFirstParcel(place, parcels) {
  let shortestParcelIndex = 0,
    shortestParcelLength = Infinity;
  // DEBUG
  //   console.log('parcelo',parcels, place);
  const parcelsHere = parcels
    .map((p, index) => ({ ...p, index }))
    .filter((p) => p.place === place);
  if (parcelsHere.length > 0) {
    let best = parcelsHere[0],
      bestLen = Infinity;
    for (const p of parcelsHere) {
      const len = findRoute(roadGraph, place, p.address).length;
      if (len < bestLen) {
        best = p;
        bestLen = len;
      }
    }
    return best.index;
  }
  for (let i = 0; i < parcels.length; i++) {
    // Use findRoute to calculate the distance
    let parcel = parcels[i];
    // DEBUG
    let route = findRoute(roadGraph, place, parcel.address);
    // let route = findRoute(roadGraph, place, parcel.place);
    const currentRoute = findRoute(
      roadGraph,
      parcels[shortestParcelIndex].place,
      parcels[shortestParcelIndex].address
    );
    if (route.length < shortestParcelLength) {
      shortestParcelLength = route.length;
      shortestParcelIndex = i;
    }
  }
  return shortestParcelIndex;
}

export function pickupFirstRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[pickupFirstParcel(place, parcels)];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

const pickupRobot = compareRobots(
  moreEfficientRobot,
  [],
  pickupFirstRobot,
  [],
  100
);
console.log("efficienterRobot", pickupRobot);

// 7.3 - Persistent Group


