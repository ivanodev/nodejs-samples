import SearchParameters from "@common/infra/database/FilterParameters";
import Contact from '@modules/actor/model/Contact';
import CreateContactService from '@modules/actor/services/Contact/CreateContactService';
import DeleteContactService from '@modules/actor/services/Contact/DeleteContactService';
import LoadContactService from '@modules/actor/services/Contact/LoadContactService';
import UpdateContactService from '@modules/actor/services/Contact/UpdateContactService';
import { Request, Response } from 'express';
import { container } from "tsyringe";

class ContactController {

	public async create(request: Request, response: Response): Promise<Response> {

		const contact = request.body as Contact;

		const createContact = container.resolve(CreateContactService);
		const contactCreated = await createContact.execute(contact);

		return response.json(contactCreated);
	}

	public async update(request: Request, response: Response): Promise<Response> {

		const contact = request.body as Contact;

		const updateContact = container.resolve(UpdateContactService);
		const contactUpdated = await updateContact.execute(contact);

		return response.json(contactUpdated);
	}

	public async find(request: Request, response: Response): Promise<Response> {

		const loadContact = container.resolve(LoadContactService);
		const contacts = await loadContact.find();

		return response.json(contacts);
	}

	public async findById(request: Request, response: Response): Promise<Response> {

		const { contactId } = request.params;

		const loadContact = container.resolve(LoadContactService);
		const contact = await loadContact.findById(contactId);

		return response.json(contact);
	}

	public async filter(request: Request, response: Response): Promise<Response> {

		const contactSearchParams = request.query as SearchParameters;

		const loadContact = container.resolve(LoadContactService);
		const permssions = await loadContact.filter(contactSearchParams);

		return response.json(permssions);
	}


	public async delete(request: Request, response: Response): Promise<Response> {

		const { contactId } = request.params;

		const deleteContact = container.resolve(DeleteContactService);
		const deleteResult = await deleteContact.execute(contactId);

		return response.json(deleteResult);
	}

}

export default ContactController;