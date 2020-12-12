export const convertDronesData = (drones = []) => {
  return drones.map((drone) => {
    const { id, flightPaths, payloads } = drone;
    return { id, flightPaths, payloads };
  });
};
