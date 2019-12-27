import { Machine } from "xstate";

export const sessionMachine = Machine({
	id: "Session",
	initial: "idle",
	states: {
		idle: {
			entry: ["HIDE_LOADING"],
			on: {
				DISPLAY: {
					target: "displaying",
					actions: ["UPDATE_SESSION_DATA", "ROUTE_SESSION"]
				},
				EDIT: "editing",
				CREATE: "creating"
			},
			exit: ["SHOW_LOADING"]
		},
		creating: {
			entry: ["CREATE_SESSION"],
			on: {
				CREATED: {
					target: "editing",
					actions: ["ROUTE_NEW_SESSION"]
				},
				ERROR: "idle"
			}
		},
		displaying: {
			entry: ["HIDE_LOADING"],
			on: {
				EDIT: "editing",
				DELETE: "deleting",
				BACK_TO_DASHBOARD: {
					target: "idle",
					actions: ["CLEAR_SESSION_DATA", "ROUTE_DASHBOARD"]
				},
				BACK_TO_SEARCH: {
					target: "idle",
					actions: ["CLEAR_SESSION_DATA", "ROUTE_SEARCH"]
				}
			}
		},
		editing: {
			entry: ["EDIT_SESSION", "HIDE_LOADING"],
			on: {
				SAVE: "saving",
				DISPLAY: {
					target: "displaying",
					actions: ["UPDATE_SESSION_DATA", "ROUTE_SESSION"]
				},
				DISCARD: "deleting",
				BACK_TO_DASHBOARD: {
					actions: ["ROUTE_DASHBOARD"]
				}
			}
		},
		saving: {
			entry: ["SHOW_LOADING", "SAVE_SESSION"],
			on: {
				SUCCESS: {
					target: "displaying",
					actions: ["UPDATE_SESSION_DATA", "ROUTE_SESSION"]
				},
				ERROR: "editing"
			}
		},
		deleting: {
			entry: ["SHOW_LOADING", "DELETE_SESSION", "CLEAR_SESSION_DATA"],
			on: {
				SUCCESS: {
					target: "idle",
					actions: ["ROUTE_DASHBOARD"]
				},
				ERROR: "displaying"
			}
		}
	}
});

export default sessionMachine;
