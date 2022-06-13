import SearchParameters from "@common/infra/database/FilterParameters";
import ProfessionalProfile from '@modules/actor/model/ProfessionalProfile';
import CreateProfessionalProfileService from '@modules/actor/services/ProfessionalProfile/CreateProfessionalProfileService';
import DeleteProfessionalProfileService from '@modules/actor/services/ProfessionalProfile/DeleteProfessionalProfileService';
import LoadProfessionalProfileService from '@modules/actor/services/ProfessionalProfile/LoadProfessionalProfileService';
import UpdateProfessionalProfileService from '@modules/actor/services/ProfessionalProfile/UpdateProfessionalProfileService';
import { Request, Response } from 'express';
import { container } from "tsyringe";

class ProfessionalProfileController {

	public async create(request: Request, response: Response): Promise<Response> {

		const professionalprofile = request.body as ProfessionalProfile;

		const createProfessionalProfile = container.resolve(CreateProfessionalProfileService);

		const professionalprofileCreated = await createProfessionalProfile.execute(professionalprofile);

		return response.json(professionalprofileCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const professionalprofile = request.body as ProfessionalProfile;

		const updateProfessionalProfile = container.resolve(UpdateProfessionalProfileService);
		const professionalprofileUpdated = await updateProfessionalProfile.execute(professionalprofile);

		return response.json(professionalprofileUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadProfessionalProfile = container.resolve(LoadProfessionalProfileService);
		const professionalprofiles = await loadProfessionalProfile.find();

		return response.json(professionalprofiles);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { professionalProfileId } = request.params;

		const loadProfessionalProfile = container.resolve(LoadProfessionalProfileService);
		const professionalProfile = await loadProfessionalProfile.findById(professionalProfileId);

		return response.json(professionalProfile);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const professionalprofileSearchParams = request.query as SearchParameters;

		const loadProfessionalProfile = container.resolve(LoadProfessionalProfileService);
		const permssions = await loadProfessionalProfile.filter(professionalprofileSearchParams);

		return response.json(permssions);
	}


	public async delete(request: Request, response: Response): Promise<Response> {

		const { professionalProfileId } = request.params;

		const deleteProfessionalProfile = container.resolve(DeleteProfessionalProfileService);
		const deleteResult = await deleteProfessionalProfile.execute(professionalProfileId);

		return response.json(deleteResult);
	}

}

export default ProfessionalProfileController;