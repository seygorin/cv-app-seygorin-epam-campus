import {NextApiRequest, NextApiResponse} from 'next'
import fs from 'fs'
import path from 'path'

const portfolioDataPath = path.resolve(
  process.cwd(),
  'src',
  'mockData',
  'portfolio.json'
)

const readPortfolioData = () => {
  const jsonData = fs.readFileSync(portfolioDataPath, 'utf-8')
  return JSON.parse(jsonData)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const portfolioData = readPortfolioData()
      res.status(200).json(portfolioData)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}
