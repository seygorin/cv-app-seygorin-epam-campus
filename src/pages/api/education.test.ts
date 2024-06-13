import { NextApiRequest, NextApiResponse } from 'next';
import handler from './education';
import fs from 'fs';

jest.mock('fs');

const mockData = [
  {
    id: 1,
    title: 'Education 1',
    date: '2022',
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Education 2',
    date: '2023',
    description: 'Description 2',
  },
];

const mockReadFileSync = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('API handler', () => {
  it('should return education data on GET request', async () => {
    const req = ({ method: 'GET' } as unknown) as NextApiRequest;
    const res = ({
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown) as NextApiResponse;

    fs.readFileSync = mockReadFileSync.mockReturnValue(JSON.stringify(mockData));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('should return 405 error for non-GET request', async () => {
    const req = ({ method: 'POST' } as unknown) as NextApiRequest;
    const res = ({
      setHeader: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    } as unknown) as NextApiResponse;

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalledWith(`Method ${req.method} Not Allowed`);
    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
  });
});
