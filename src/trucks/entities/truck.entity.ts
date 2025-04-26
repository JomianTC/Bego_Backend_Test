import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

@Schema()
export class Truck {

	@Prop({
		type: mongoose.Schema.Types.ObjectId, ref: "User",
		required: true,
	})
	user: ObjectId;

	@Prop()
	year: string;

	@Prop()
	color: string;

	@Prop({ unique: true })
	plates: string;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
