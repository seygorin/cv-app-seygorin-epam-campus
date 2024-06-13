import {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'
import path from 'path'
import {v4 as uuidv4} from 'uuid'
import {Skill} from '../../components/Skills/index'

const skillsDataPath = path.resolve(
  process.cwd(),
  'src',
  'mockData',
  'skills.json'
)

const readSkills = (): Skill[] => {
  const jsonData = fs.readFileSync(skillsDataPath, 'utf-8')
  return JSON.parse(jsonData)
}

const writeSkills = (data: Skill[]) => {
  fs.writeFileSync(skillsDataPath, JSON.stringify(data, null, 2))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method, body, query} = req

  switch (method) {
    case 'GET':
      const skills = readSkills()
      res.status(200).json(skills)
      break

    case 'POST':
      const newSkill: Skill = {...body, id: uuidv4()}
      const skillsData = readSkills()
      skillsData.push(newSkill)
      writeSkills(skillsData)
      res.status(201).json(newSkill)
      break

    case 'PUT':
      const updatedSkill: Skill = body
      const updatedSkills = readSkills().map((skill: Skill) =>
        skill.id === query.id ? updatedSkill : skill
      )
      writeSkills(updatedSkills)
      res.status(200).json(updatedSkill)
      break

    case 'DELETE':
      const remainingSkills = readSkills().filter(
        (skill: Skill) => skill.id !== query.id
      )
      writeSkills(remainingSkills)
      res.status(200).json({message: 'Skill deleted'})
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
