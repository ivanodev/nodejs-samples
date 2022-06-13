import SearchParameters from "@common/infra/database/FilterParameters";
import Company from '@modules/actor/model/Company';
import CreateCompanyService from '@modules/actor/services/Company/CreateCompanyService';
import DeleteCompanyService from '@modules/actor/services/Company/DeleteCompanyService';
import LoadCompanyService from '@modules/actor/services/Company/LoadCompanyService';
import UpdateCompanyService from '@modules/actor/services/Company/UpdateCompanyService';
import { Request, Response } from 'express';
import { container } from "tsyringe";

class CompanyController {

	public async create(request: Request, response: Response): Promise<Response> {

		const company = request.body as Company;

		const createCompany = container.resolve(CreateCompanyService);
		const companyCreated = await createCompany.execute(company);

		return response.json(companyCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const company = request.body as Company;

		const updateCompany = container.resolve(UpdateCompanyService);
		const companyUpdated = await updateCompany.execute(company);

		return response.json(companyUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadCompany = container.resolve(LoadCompanyService);
		const companys = await loadCompany.find();

		return response.json(companys);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { companyId } = request.params;

		const loadCompany = container.resolve(LoadCompanyService);
		const company = await loadCompany.findById(companyId);

		return response.json(company);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const companySearchParams = request.query as SearchParameters;

		const loadCompany = container.resolve(LoadCompanyService);
		const permssions = await loadCompany.filter(companySearchParams);

		return response.json(permssions);
	}


	public async delete(request: Request, response: Response): Promise<Response> {

		const { companyId } = request.params;

		const deleteCompany = container.resolve(DeleteCompanyService);
		const deleteResult = await deleteCompany.execute(companyId);

		return response.json(deleteResult);
	}

}

export default CompanyController;