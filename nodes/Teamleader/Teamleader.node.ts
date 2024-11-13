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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['company'],
					},
				},
				options: [
					{
						name: 'Update',
						value: 'update',
						description: 'Update a company',
						action: 'Update a company',
						routing: {
							request: {
								method: 'POST',
								url: '/companies.update',
								body: {
									id: '={{ $parameter.id }}',
									website: '={{ $parameter.updateFields?.website }}',
								},
							},
							output: {
								postReceive: [
									{
										type: 'setKeyValue',
										properties: {
											id: '={{ $parameter.id }}',
											updated_fields: '={{ $parameter.updateFields }}',
										},
									},
								],
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a company',
						action: 'Get a company',
						routing: {
							request: {
								method: 'GET',
								url: '/companies.info',
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
				displayName: 'Company ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'The ID of the company to retrieve',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the company',
					},
					{
						displayName: 'Business Type',
						name: 'business_type',
						type: 'options',
						options: [
							{
								name: 'Customer',
								value: 'customer',
							},
							{
								name: 'Supplier',
								value: 'supplier',
							},
							{
								name: 'Both',
								value: 'both',
							},
						],
						default: 'customer',
						description: 'The type of business relationship',
					},
					{
						displayName: 'VAT Number',
						name: 'vat_number',
						type: 'string',
						default: '',
						description: 'The VAT number of the company',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						description: 'The email address of the company',
					},
					{
						displayName: 'Website',
						name: 'website',
						type: 'string',
						default: '',
						description: 'The website URL of the company',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: false,
						},
						default: {},
						options: [
							{
								name: 'value',
								displayName: 'Address',
								values: [
									{
										displayName: 'Line 1',
										name: 'line_1',
										type: 'string',
										default: '',
									},
									{
										displayName: 'Postal Code',
										name: 'postal_code',
										type: 'string',
										default: '',
									},
									{
										displayName: 'City',
										name: 'city',
										type: 'string',
										default: '',
									},
									{
										displayName: 'Country',
										name: 'country',
										type: 'string',
										default: '',
										description: 'The country code (ISO 3166-1 alpha-2)',
									},
								],
							},
						],
					},
				],
			},
		],
	};
} 