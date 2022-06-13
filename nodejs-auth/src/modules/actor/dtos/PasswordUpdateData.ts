class PasswordUpdateDataDTO {
	userId: string;
	password?: string;
	randomPassword?: string;
	randomPasswordExpiresAt?: Date;
}

export default PasswordUpdateDataDTO;