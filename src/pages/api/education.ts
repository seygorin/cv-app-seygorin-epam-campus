import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { TimeLineData } from '../../components/TimeLine/index'

const mockDataPath = path.resolve(process.cwd(), 'src', 'mockData', 'education.json');

const readEducation = (): TimeLineData[] => {
  const jsonData = fs.readFileSync(mockDataPath, 'utf-8');
  return JSON.parse(jsonData);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const education = readEducation();
      res.status(200).json(education);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
