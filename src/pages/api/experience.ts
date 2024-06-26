import {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'
import path from 'path'
import {ExperienceItem} from '../../store/experienceSlice'

const experienceDataPath = path.resolve(
  process.cwd(),
  'src',
  'mockData',
  'experience.json'
)

const readExperience = (): ExperienceItem[] => {
  const jsonData = fs.readFileSync(experienceDataPath, 'utf-8')
  return JSON.parse(jsonData)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const experience = readExperience()
      res.status(200).json(experience)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}
