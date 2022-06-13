import Session from "@common/infra/server/Session";
import SearchParameters from "@common/infra/database/FilterParameters";
import Employee from '@modules/actor/model/Employee';
import CreateEmployeeService from '@modules/actor/services/Employee/CreateEmployeeService';
import DeleteEmployeeService from '@modules/actor/services/Employee/DeleteEmployeeService';
import LoadEmployeeService from '@modules/actor/services/Employee/LoadEmployeeService';
import UpdateEmployeeService from '@modules/actor/services/Employee/UpdateEmployeeService';
import sessionsRouter from "@modules/session/adapter/router/sessions.routes";
import { Request, Response } from 'express';
import { container } from "tsyringe";

class EmployeeController {

	public async create(request: Request, response: Response): Promise<Response> {

		const employee = request.body as Employee;

		const createEmployee = container.resolve(CreateEmployeeService);
		const employeeCreated = await createEmployee.execute(employee);

		return response.json(employeeCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const employee = request.body as Employee;

		const updateEmployee = container.resolve(UpdateEmployeeService);
		const employeeUpdated = await updateEmployee.execute(employee);

		return response.json(employeeUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadEmployee = container.resolve(LoadEmployeeService);
		const employees = await loadEmployee.find();

		return response.json(employees);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { employeeId } = request.params;

		const loadEmployee = container.resolve(LoadEmployeeService);
		const employee = await loadEmployee.findById(employeeId);

		return response.json(employee);
	}

	public async findByCompany(request: Request, response: Response): Promise<Response> {
		
		const companyId = Session.company.id;

		const loadEmployee = container.resolve(LoadEmployeeService);
		const employees = await loadEmployee.findByCompany(companyId);

		return response.json(employees);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const employeeSearchParams = request.query as SearchParameters;

		const loadEmployee = container.resolve(LoadEmployeeService);
		const permssions = await loadEmployee.filter(employeeSearchParams);

		return response.json(permssions);
	}

	public async findByEmail(request: Request, response: Response): Promise<Response> {

		const { email } = request.params;

		const loadEmployee = container.resolve(LoadEmployeeService);
		const employee = await loadEmployee.findByEmail(email);

		return response.json(employee);
	}

	public async delete(request: Request, response: Response): Promise<Response> {

		const { employeeId } = request.params;

		const deleteEmployee = container.resolve(DeleteEmployeeService);
		const deleteResult = await deleteEmployee.execute(employeeId);

		return response.json(deleteResult);
	}

}

export default EmployeeController;