//this method takes the user data we condense in OrganizeLogs and condenses it into the existing user objects
import users from '../Data/users.json';

const condenseUsersAndLogs = (logs) => {
    let len = users.length;
    for (let i=0; i<len; i++) {
        let userId = users[i].id;
        users[i]["impression"] = logs[userId]["impression"];
        users[i]["conversion"] = logs[userId]["conversion"];
        users[i]["revenue"] = logs[userId]["revenue"];
        users[i]["logs"] = logs[userId]["logs"];
    }
    return users;
}

export default condenseUsersAndLogs;