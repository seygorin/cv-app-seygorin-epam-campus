import {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'
import path from 'path'
import {FeedbackData} from '../../components/Feedback/index'

const feedbackDataPath = path.resolve(
  process.cwd(),
  'src',
  'mockData',
  'feedback.json'
)

const readFeedback = (): FeedbackData[] => {
  const jsonData = fs.readFileSync(feedbackDataPath, 'utf-8')
  return JSON.parse(jsonData)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const feedback = readFeedback()
      res.status(200).json(feedback)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}
