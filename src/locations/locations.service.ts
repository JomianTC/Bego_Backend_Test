import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { GoogleLocation } from './interface/google-location.interface';
import { PlaceLocationDto } from './dto/place-location.dto';
import { Location } from './entities/location.entity';
import { handleErrors } from '../common';
import { envs } from '../config';

@Injectable()
export class LocationsService {

	private readonly googleMapsUrl: string = envs.googleApiUrl;
	private readonly googleApiKey: string = envs.googleApiKey;

	constructor(
		@InjectModel(Location.name) private readonly locationModel: Model<Location>,
	) { }

	async create(placeLocationDto: PlaceLocationDto) {

		try {

			const locationFound = await this.getLocationInfo(placeLocationDto.placeId);

			const locationFoundBD = await this.locationModel
				.findOne({ place_id: locationFound.place_id }).exec();

			if (locationFoundBD)
				throw new BadRequestException({ message: 'Location already registered' });

			const newLocation = await this.locationModel.create({ ...locationFound });
			await newLocation.save();

			return { message: 'Location created successfully' };

		} catch (error) { throw handleErrors(error) }
	}

	async findAll() {

		try { 
			
			const locations = await this.locationModel.find().select('-__v').exec();

			if (!locations.length) 
				throw new NotFoundException({ message: 'No locations found' });
			
			return locations;

		} catch (error) { throw handleErrors(error) }
	}

	async findOne(id: string) {
		
		try { 
			
			const location = await this.locationModel.findById(id).select('-__v').exec();

			if (!location)
				throw new NotFoundException({ message: 'Location not found' });
			
			return location;

		} catch (error) { handleErrors(error) }
	}

	async update(id: string, placeLocationDto: PlaceLocationDto) {

		try { 

			await this.findOne(id);
			
			const locationFound = await this.getLocationInfo(placeLocationDto.placeId);

			const locationFoundBD = await this.locationModel
				.findOne({ place_id: locationFound.place_id }).exec();

			if (locationFoundBD)
				throw new BadRequestException({ message: 'Location already registered' });

			await this.locationModel.findByIdAndUpdate(id, { ...locationFound }, { new: true });

			return { message: 'Location updated successfully' };

		} catch (error) { handleErrors(error) }
	}

	async remove(id: string) {

		try { 

			await this.findOne(id);
			await this.locationModel.findByIdAndDelete(id);

			return { message: 'Location deleted successfully' };

		} catch (error) { handleErrors(error) }
	}

	async getLocationInfo(placeId: string) {

		try {

			const instanceAxios = axios.create(
				{
					baseURL: this.googleMapsUrl,
					params: {
						"place_id": placeId,
						"key": this.googleApiKey,
					}
				}
			);

			const response = await instanceAxios.get('');

			if (response.data.error_message)
				throw new BadRequestException({ message: 'Invalid placeId' });

			const googleLocation: GoogleLocation = response.data.result;

			return {
				place_id: googleLocation.place_id,
				address: googleLocation.formatted_address,
				latitude: googleLocation.geometry.location.lat,
				longitude: googleLocation.geometry.location.lng
			};

		} catch (error) { throw handleErrors(error) }
	}

}
