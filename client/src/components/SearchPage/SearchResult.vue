<template>
	<div class="results">
		<ul>
			<li v-for="session in sessions" :key="session._id">
				<div class="session-info">
					<p class="session-info__date">{{ session.sessionDate }}</p>
					<p class="session-info__title">{{ session.title }}</p>
					<md-button
						class="app__btn info width-90"
						@click="onViewSession(session)"
					>
						View Session
					</md-button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	computed: {
		sessions() {
			return this.$searchMachine.context.sessions;
		}
	},
	methods: {
		onViewSession(session) {
			this.$sessionMachine.send({
				type: "DISPLAY",
				params: { sessionId: session._id }
			});
		}
	}
};
</script>

<style scoped>
.results ul {
	margin: 0;
	padding: 0;
	list-style-type: none;
}

.results ul li + li {
	margin-top: 1.5rem;
}

.session-info {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: bold;
	font-size: 1.5rem;
	background-color: var(--color-fg-light);
	box-shadow: var(--default-box-shadow);
	border-radius: var(--default-radius);
}

.session-info__title {
	margin: 0;
}

.width-90 {
	width: 90%;
}
</style>