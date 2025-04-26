import { IsMongoId, IsString } from "class-validator";

export class CreateTruckDto {

	@IsString({ message: 'Id name must be a string' })
	@IsMongoId({ message: 'Id name must be a valid MongoDB ObjectId' })
	user: string;

	@IsString({ message: 'Year user must be a string' })
	year: string;

	@IsString({ message: 'Color must be a string' })
	color: string;

	@IsString({ message: 'Plates must be a string' })
	plates: string;
}
