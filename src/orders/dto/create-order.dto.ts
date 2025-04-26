import { IsMongoId, IsString } from "class-validator";

export class CreateOrderDto {

	@IsString({message: 'User ID must be a string' })
	@IsMongoId({message: 'User ID must be a valid MongoDB ID' })
	user: string;

	@IsString({message: 'Truck ID must be a string' })
	@IsMongoId({message: 'Truck ID must be a valid MongoDB ID' })
	truck: string;

	@IsString({message: 'Pickup location must be a string' })
	@IsMongoId({message: 'Pickup location must be a valid MongoDB ID' })
	pickup: string;

	@IsString({message: 'Dropoff location must be a string' })
	@IsMongoId({message: 'Dropoff location must be a valid MongoDB ID' })
	dropoff: string;
}
