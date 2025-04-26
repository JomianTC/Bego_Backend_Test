import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

@Schema()
export class Order {

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	user: ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Truck" })
	truck: ObjectId;

	@Prop({ enum: ['created', 'in transit', 'completed'], default: 'created' })
	status: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
	pickup: ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Location" })
	dropoff: ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);