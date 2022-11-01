import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'El id no es valido' });
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res);
    
    case 'GET':
      return getEntry( req, res );
  
    default:
      return res.status(400).json({ message: 'Método no existe' });
  }
}

const getEntry = async ( req: NextApiRequest, resp: NextApiResponse ) => {

  const { id } = req.query;

  await db.connect();

  const entryInDB = await Entry.findById(id);

  if (!entryInDB) {
    await db.disconnect();
    return resp.status(400).json({ message: 'No hay entrada con ese ID' });
  }

  return resp.status(200).json( entryInDB );

}

const updateEntry = async (req: NextApiRequest, resp: NextApiResponse) => {
    
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return resp.status(400).json({ message: 'No hay entrada con ese ID' });
  }
  
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true });
    await db.disconnect();
    resp.status(200).json(updatedEntry!)
  } catch (error: any) {
    await db.disconnect();
    resp.status(400).json({ message: error.errors.status.message });
  }



}