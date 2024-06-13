import {NextApiRequest, NextApiResponse} from 'next'
import handler from './experience'
import fs from 'fs'

jest.mock('fs')

const mockData = [
  {
    id: 1,
    company: 'Company 1',
    job: 'Job 1',
    description: 'Description 1',
  },
  {
    id: 2,
    company: 'Company 2',
    job: 'Job 2',
    description: 'Description 2',
  },
]

const mockReadFileSync = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('API handler', () => {
  it('should return experience data on GET request', async () => {
    const req = {method: 'GET'} as NextApiRequest
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
      end: jest.fn(),
    } as unknown as NextApiResponse

    fs.readFileSync = mockReadFileSync.mockReturnValue(JSON.stringify(mockData))

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(mockData)
  })

  it('should return 405 error for non-GET request', async () => {
    const req = {method: 'POST'} as NextApiRequest
    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
      setHeader: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.end).toHaveBeenCalledWith(`Method ${req.method} Not Allowed`)
    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET'])
  })
})
