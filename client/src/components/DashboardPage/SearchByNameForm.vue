<template>
	<form @submit.prevent="searchByName">
		<form-group
			type="search"
			name="sessionName"
			id="sessionName"
			v-model="sessionName"
			labelText="Session Name"
		></form-group>
		<md-button class="app__btn info-light width-90" type="submit"
			>Search</md-button
		>
	</form>
</template>

<script>
// Components
import FormGroup from "../utils/forms/FormGroup";

export default {
	components: {
		FormGroup
	},
	data() {
		return {
			sessionName: null,
			titleQuery: {
				query: `
					query searchByTitle($title: String!) {
						getSessionsByTitle(title: $title) {
							_id
							title
							sessionDate
						}
					}
				`
			}
		};
	},
	methods: {
		searchByName() {
			if (!this.sessionName) {
				return;
			}
			const query = this.titleQuery;
			query.variables = {
				title: this.sessionName
			};
			this.$searchMachine.send({
				type: "SEARCH",
				params: { query, queryName: "getSessionsByTitle" }
			});
		}
	}
};
</script>

<style scoped>
.width-90 {
	width: 90%;
}
</style>