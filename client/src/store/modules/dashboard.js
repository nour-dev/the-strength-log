import dashboardMachine from "../fsm/dashboardMachine";
import transition from "../transition";

import router from "../../router";

const state = {
	currentState: dashboardMachine.initialState
};
const mutations = {
	updateDashboardState(state, nextState) {
		state.currentState = nextState;
	}
};
const actions = {
	DASHBOARD_TRANSITION: (context, event) => {
		transition(dashboardMachine, context, event);
	},
	ROUTE_DASHBOARD: () => {
		router.push("/dashboard");
	},
	ROUTE_SESSION: (_, { params }) => {
		if (router.currentRoute.path !== "/session/" + params.sessionData._id) {
			router.push("/session/" + params.sessionData._id);
		}
	},
	ROUTE_NEW_SESSION: () => {
		router.push("/session");
	},
	ROUTE_SEARCH: () => {
		router.push("/search-results");
	},
	ROUTE_AUTH: () => {
		router.push("/");
	}
};

export default {
	state,
	mutations,
	actions
};
