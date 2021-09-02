import { Store } from "pullstate";

const UserStore = new Store({ user: null, needsUpdate: true });

export default UserStore;
