import "dotenv/config";
import * as joi from "joi";

interface EnvVars {

	PORT: number;
	MONGO_URL: string;
	JWT_SECRET: string;
	GOOGLE_API_URL: string;
	GOOGLE_API_KEY: string;
}

const envsSchema = joi.object({

	PORT: joi.number().port().required().messages({
		"any.required": "PORT is required",
		"number.base": "PORT must be a number",
		"number.port": "PORT must be a valid port number",
	}),
	MONGO_URL: joi.string().uri().required().messages({
		"any.required": "MONGO_URL is required",
		"string.uri": "MONGO_URL must be a valid URI",
	}),
	JWT_SECRET: joi.string().required().messages({
		"any.required": "JWT_SECRET is required",
		"string.base": "JWT_SECRET must be a string",
	}),
	GOOGLE_API_URL: joi.string().uri().required().messages({
		"any.required": "GOOGLE_API_URL is required",
		"string.uri": "GOOGLE_API_URL must be a valid URI",
	}),
	GOOGLE_API_KEY: joi.string().required().messages({
		"any.required": "GOOGLE_API_KEY is required",
		"string.base": "GOOGLE_API_KEY must be a string",
	}),

}).unknown(true);

const { error, value } = envsSchema.validate({ ...process.env });

if (error)
	throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {

	port: envVars.PORT,
	mongoUrl: envVars.MONGO_URL,
	jwtSecret: envVars.JWT_SECRET,
	googleApiUrl: envVars.GOOGLE_API_URL,
	googleApiKey: envVars.GOOGLE_API_KEY,
};