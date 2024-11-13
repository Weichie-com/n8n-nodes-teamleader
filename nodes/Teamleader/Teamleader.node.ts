import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Teamleader implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Teamleader',
		name: 'teamleader',
		icon: 'file:teamleader.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Teamleader API',
		defaults: {
			name: 'Teamleader',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'teamleaderApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.teamleader.eu',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'contact',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a contact',
						action: 'Create a contact',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts.add',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a contact',
						action: 'Get a contact',
						routing: {
							request: {
								method: 'GET',
								url: '/contacts.info',
								qs: {
									id: '={{ $parameter.id }}',
								},
							},
						},
					},
				],
				default: 'create',
			},
			{
				displayName: 'Contact ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the contact to retrieve',
			},
			// Add more properties as needed
		],
	};
} 