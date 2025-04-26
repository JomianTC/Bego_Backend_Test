import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { User } from '../user/entities/user.entity';
import { Truck } from './entities/truck.entity';
import { handleErrors } from '../common';

@Injectable()
export class TrucksService {

	constructor(
		@InjectModel(Truck.name) private readonly truckModel: Model<Truck>,
	) { }

	async create(createTruckDto: CreateTruckDto) {

		const { plates } = createTruckDto;

		try {

			const truckFound = await this.truckModel.findOne({ plates }).exec();

			if (truckFound)
				throw new BadRequestException({ message: 'Plates already registered' });

			const truck = new this.truckModel(createTruckDto);

			await truck.save();

			return { message: 'Truck created successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	async findAll() {

		try {

			const trucks = await this.truckModel.find()
				.select('-__v').populate('user', 'email -_id').exec();

			if (!trucks.length) throw new BadRequestException({ message: 'No trucks found' });

			return trucks;

		} catch (error) { throw handleErrors(error); }
	}

	async findOne(id: string) {

		try {

			const truck = await this.truckModel.findById(id)
				.select('-__v').populate('user', 'email -_id').exec();

			if (!truck) throw new BadRequestException({ message: 'Truck not found' });

			return truck;

		} catch (error) { throw handleErrors(error); }
	}

	async findAllByUser(id: string) {

		try {

			const trucks = await this.truckModel.aggregate([
				{ $match: { user: new mongoose.Types.ObjectId(id), } },
				{
					$project: {
						_id: 1,
						year: 1,
						color: 1,
						plates: 1,
					},
				},
			]);


			if (!trucks.length) throw new BadRequestException({ message: 'No trucks found' });

			return trucks;

		} catch (error) { throw handleErrors(error); }
	}

	async update(id: string, updateTruckDto: UpdateTruckDto) {
		
		const { plates } = updateTruckDto;

		try {

			await this.findOne(id);

			if (plates) {

				const truckFoundByPlates = await this.truckModel.findOne({ plates });

				if (truckFoundByPlates)
					throw new BadRequestException({ message: 'Plates already registered' });
			}

			await this.truckModel.findByIdAndUpdate(id, { ...updateTruckDto }, { new: true });

			return { message: 'Truck updated successfully' };

		} catch (error) { throw handleErrors(error); }
	}

	async remove(id: string) {

		try {

			await this.findOne(id);
			await this.truckModel.findByIdAndDelete(id);

			return { message: 'Truck deleted successfully' };			

		} catch (error) { throw handleErrors(error); }
	}
}
