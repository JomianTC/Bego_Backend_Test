import { IsString } from "class-validator";

export class PlaceLocationDto {

	@IsString({ message: 'placeId must be a valid string' })
	placeId: string;
}