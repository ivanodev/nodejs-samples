interface roleRef {
  id: string;
}

class UserDTO {
	login: string;
	email: string;
	password: string;
	passwordMatch: string;
	randomPassword: string;
	randomPasswordExpiresAt: Date;
	token: string;
	confirmedUser: boolean;
	roles: roleRef[];
	activeUser: boolean;
}

export default UserDTO;