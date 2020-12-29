import {getRole} from './info';

const role = {
    superadmin: 'SUPER_ADMIN',
    admin: 'ADMIN',
    manager: 'MANAGER',
    supervisor: 'SUPERVISOR',
    droneStaff: 'DRONE_STAFF',
    incidentStaff: 'INCIDENT_STAFF'
}

const CRUD_DRONE = [role.superadmin, role.admin, role.manager];
const DRONE_SEARCH = [...CRUD_DRONE, role.supervisor, role.droneStaff];
const DRONE_STATISTICS = DRONE_SEARCH;
const FLIGHT_PATH_MANAGEMENT = DRONE_SEARCH;
const DRONE_CONFIG = DRONE_SEARCH;
const DRONE_MAINTENANCE = DRONE_SEARCH;

const isAuthorised = (featureRoles) => {
    const userRole = getRole();
    return featureRoles.includes(userRole.toUpperCase());
}

export {
    CRUD_DRONE, DRONE_SEARCH, 
    DRONE_STATISTICS, FLIGHT_PATH_MANAGEMENT, 
    DRONE_CONFIG, DRONE_MAINTENANCE, 
    isAuthorised
}