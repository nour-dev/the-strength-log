const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		sessionDate: {
			type: Date,
			required: true
		},
		exercises: [
			{
				id: {
					type: Number,
					required: true
				},
				movements: [
					{
						id: {
							type: Number,
							required: true
						},
						name: {
							type: String
						},
						sets: [
							{
								id: {
									type: Number,
									required: true
								},
								setQty: {
									type: Number
								},
								repsOrTime: {
									type: String
								},
								weight: {
									type: String
								}
							}
						]
					}
				]
			}
		],
		bodyweigth: {
			type: String
		},
		notes: {
			type: String
		},
		newSession: {
			type: Boolean
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Session", SessionSchema);
