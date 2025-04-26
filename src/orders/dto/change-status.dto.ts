import { IsIn, IsString } from "class-validator";

export class ChangeStatusDto {

	@IsString()
	@IsIn(['created', 'in transit', 'completed'])
	status: string;
}