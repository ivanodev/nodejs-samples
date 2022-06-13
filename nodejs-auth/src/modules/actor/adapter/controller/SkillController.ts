import SearchParameters from "@common/infra/database/FilterParameters";
import Skill from '@modules/actor/model/Skill';
import CreateSkillService from '@modules/actor/services/Skill/CreateSkillService';
import DeleteSkillService from '@modules/actor/services/Skill/DeleteSkillService';
import LoadSkillService from '@modules/actor/services/Skill/LoadSkillService';
import UpdateSkillService from '@modules/actor/services/Skill/UpdateSkillService';
import { Request, Response } from 'express';
import { container } from "tsyringe";

class SkillController {

	public async create(request: Request, response: Response): Promise<Response> {

		const skill = request.body as Skill;

		const createSkill = container.resolve(CreateSkillService);
		const skillCreated = await createSkill.execute(skill);

		return response.json(skillCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const skill = request.body as Skill;

		const updateSkill = container.resolve(UpdateSkillService);
		const skillUpdated = await updateSkill.execute(skill);

		return response.json(skillUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadSkill = container.resolve(LoadSkillService);
		const skills = await loadSkill.find();

		return response.json(skills);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { skillId } = request.params;

		const loadSkill = container.resolve(LoadSkillService);
		const skill = await loadSkill.findById(skillId);

		return response.json(skill);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const skillSearchParams = request.query as SearchParameters;

		const loadSkill = container.resolve(LoadSkillService);
		const permssions = await loadSkill.filter(skillSearchParams);

		return response.json(permssions);
	}


	public async delete(request: Request, response: Response): Promise<Response> {

		const { skillId } = request.params;

		const deleteSkill = container.resolve(DeleteSkillService);
		const deleteResult = await deleteSkill.execute(skillId);

		return response.json(deleteResult);
	}

}

export default SkillController;