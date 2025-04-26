import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { handleErrors } from 'src/common';

@Injectable()
export class OrdersService {

	constructor(
		@InjectModel(Order.name) private readonly orderModel: Model<Order>,
	) { }

	async create(createOrderDto: CreateOrderDto) {

		try {

			const newOrder = await this.orderModel.create(createOrderDto);

			await newOrder.save();

			return { message: 'Order created successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	async findAll() {

		try {

			const orders = await this.orderModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',

					},
				},
				{
					$unwind: '$user',
				},
				{
					$lookup: {
						from: 'trucks',
						localField: 'truck',
						foreignField: '_id',
						as: 'truck',

					},
				},
				{
					$unwind: '$truck',
				},
				{
					$lookup: {
						from: 'locations',
						localField: 'pickup',
						foreignField: '_id',
						as: 'pickup',

					},
				},
				{
					$unwind: '$pickup',
				},
				{
					$lookup: {
						from: 'locations',
						localField: 'dropoff',
						foreignField: '_id',
						as: 'dropoff',

					},
				},
				{
					$unwind: '$dropoff',
				},
				{
					$project: {
						_id: 1,
						user: {
							email: 1,
						},
						truck: {
							_id: 1,
							year: 1,
							color: 1,
							plates: 1,
						},
						status: 1,
						pickup: {
							address: 1,
							latitude: 1,
							longitude: 1,
						},
						dropoff: {
							address: 1,
							latitude: 1,
							longitude: 1,
						},
					},
				},
			]);

			if (!orders.length) throw new NotFoundException({ message: 'No orders found' });

			return orders;

		} catch (error) { throw handleErrors(error); }
	}

	async findOne(id: string) {

		try {

			const orderFound = await this.orderModel.findById(id)
				.populate({
					path: 'user',
					select: 'email',
				})
				.populate({
					path: 'truck',
					select: 'year color plates',
				})
				.populate({
					path: 'pickup',
					select: 'address latitude longitude',
				})
				.populate({
					path: 'dropoff',
					select: 'address latitude longitude',
				})
				.select('user truck status pickup dropoff');

			if (!orderFound) throw new NotFoundException({ message: 'Order not found' });

			return orderFound;

		} catch (error) { throw handleErrors(error); }
	}

	async update(id: string, updateOrderDto: UpdateOrderDto) {

		const { user, truck, pickup, dropoff } = updateOrderDto;

		try {

			if (!user && !truck && !pickup && !dropoff) 
				return { message: 'No fields to update' };

			await this.findOne(id);
			await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });

			return { message: 'Order updated successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	async remove(id: string) {

		try {

			await this.findOne(id);
			await this.orderModel.findByIdAndDelete(id);

			return { message: 'Order deleted successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	async changeStatus(id: string, changeStatusDto: ChangeStatusDto) {

		try {

			const orderFound = await this.findOne(id);

			if (orderFound.status === changeStatusDto.status)
				return { message: `Order status is already '${orderFound.status}'` };

			await this.orderModel.findByIdAndUpdate(id, changeStatusDto, { new: true });

			return { message: 'Order status updated successfully' };

		} catch (error) { throw handleErrors(error); }
	}
}
