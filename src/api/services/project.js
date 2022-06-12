import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import projectPrismaAdapter from './projectPrismaAdapter.js';

config()

const prisma = new PrismaClient()

const findUniqueService = async (id, query)=>{
	return await prisma.project.findUnique({
		...query,
		where : {
			id : id
		}
	})
}

const findManyService = async (query)=>{
	return await prisma.project.findMany(query)
}

const createService = async(data)=>{
	data = projectPrismaAdapter(data);
	return await prisma.project.create({
		data,
	})
}

const updateService = async(id, data)=>{
	return await prisma.project.update({
		where : {
			id : id
		},
		data
	})
}

const deleteService = async(id, params)=>{
	const query = `delete from "project" where "id" = '${id}';`

	return await prisma.$queryRaw(query)
}


export const findUnique = findUniqueService
export const findMany = findManyService
export const create = createService
export const update = updateService
export const destroy = deleteService