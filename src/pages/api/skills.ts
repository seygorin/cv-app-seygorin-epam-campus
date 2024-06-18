import {NextApiRequest, NextApiResponse} from 'next'
import {v4 as uuidv4} from 'uuid'
import connectToDatabase from '../../../lib/mongodb'
import Skill from '../../../models/Skill'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {method, body, query} = req

  await connectToDatabase()

  switch (method) {
    case 'GET':
      try {
        const skills = await Skill.find({})
        res.status(200).json(skills)
      } catch (error) {
        res.status(500).json({error: 'Failed to fetch skills'})
      }
      break

    case 'POST':
      try {
        const {name, range} = body
        if (!name || range === undefined) {
          return res.status(400).json({error: 'Missing required fields'})
        }

        const newSkill = new Skill({
          id: uuidv4(), 
          name,
          range,
        })
        await newSkill.save()
        res.status(201).json(newSkill)
      } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to add skill'})
      }
      break

    case 'PUT':
      try {
        const {id, name, range} = body
        if (!id) {
          return res.status(400).json({error: 'Missing skill ID'})
        }

        const updatedSkill = await Skill.findOneAndUpdate(
          {id},
          {name, range},
          {new: true}
        )
        if (!updatedSkill) {
          return res.status(404).json({error: 'Skill not found'})
        }

        res.status(200).json(updatedSkill)
      } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to update skill'})
      }
      break

    case 'DELETE':
      try {
        const {id} = query
        if (!id) {
          return res.status(400).json({error: 'Missing skill ID'})
        }

        const deletedSkill = await Skill.findOneAndDelete({id})
        if (!deletedSkill) {
          return res.status(404).json({error: 'Skill not found'})
        }

        res.status(200).json({message: 'Skill deleted'})
      } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to delete skill'})
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
