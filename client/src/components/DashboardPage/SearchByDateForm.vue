<template>
	<form @submit.prevent="searchByDate">
		<form-group
			type="date"
			labelText="On"
			name="date"
			id="date"
			v-model="date"
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
			date: null,
			dateQuery: {
				query: `
                    query searchByDate($date: Date!) {
                        getSessionsByDate(sessionDate: $date) {
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
		searchByDate() {
			console.log(this.date);
			const query = this.dateQuery;
			query.variables = {
				date: this.date
			};
			this.$searchMachine.send({
				type: "SEARCH",
				params: { query, queryName: "getSessionsByDate" }
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